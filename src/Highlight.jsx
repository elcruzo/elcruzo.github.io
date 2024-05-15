import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import jsonData from "./mock_data.json";
import { createLine, createPath } from "./geometryUtils";
import { renderTextContent } from "./textUtils";
import './App.css';

const TwoColumnGrid = () => {
  const [secondCellMarginTop, setSecondCellMarginTop] = useState('');
  const [gridRect, setGridRect] = useState([]);
  const [cellsRect, setCellsRect] = useState([]);
  const [expanded, setExpanded] = useState({}); // State to manage expanded text for each bullet point
  const gridRef = useRef(null);
  const smallScreen = window.innerWidth < 420;
  const bulletRefs = useRef([]); // Refs to track bullet points
  const lineHeights = useRef([]); // Refs to track line heights of bullet points

  const calculateRects = () => {
    requestAnimationFrame(() => {
      const newGridRect = gridRef.current?.getBoundingClientRect();
      setGridRect(newGridRect);

      const firstCellHeight = gridRef.current?.children[1]?.clientHeight;
      setSecondCellMarginTop(`${firstCellHeight / 2}px`);

      const rect = gridRef.current?.children
        ? Array.from(gridRef.current.children).map((child) =>
            child.getBoundingClientRect()
          )
        : [];
      setCellsRect(rect);
    });
  };

  useLayoutEffect(() => {
    calculateRects();
    window.addEventListener('resize', calculateRects);

    return () => {
      window.removeEventListener('resize', calculateRects);
    };
  }, [gridRef]);

  const lines = cellsRect.flatMap((_, index) => {
    if (index % 2 === 0 && index > 0 && index <= cellsRect.length - 1) {
      const startY =
        cellsRect[index].top +
        (cellsRect[index - 1].bottom - cellsRect[index].top) / 2 -
        gridRect.top;
      const endX = cellsRect[index].left - gridRect.left;
      return createLine(startY, endX);
    }
    return [];
  });
  
  const paths = cellsRect.flatMap((_, index) => {
    if (index % 2 === 0 && index > 0 && index < cellsRect.length - 2) {
      const startY =
        cellsRect[index].top +
        (cellsRect[index - 1].bottom - cellsRect[index].top) / 2 -
        gridRect.top;
      const midY =
        cellsRect[index - 1].bottom +
        (cellsRect[index + 1].top - cellsRect[index - 1].bottom) / 2 -
        gridRect.top;
      const endX = cellsRect[index].left - gridRect.left;
      return createPath(startY, midY, endX);
    }
    return [];
  });

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: smallScreen ? '1fr' : 'repeat(2, 1fr)',
    gridGap: '5rem', 
    position: 'relative',
    maxWidth: '50rem',
    margin: '0 auto',
  };

  const headerStyle = {
    fontSize: '1.45rem',
    marginBottom: '1.5rem',
    fontWeight: 'bolder',
  };

  const cellWhiteStyle = {
    backgroundColor: '#FFFFFF', // Solid white background
    color: '#635BE6', // Purple text color
    padding: '2.25rem',
    border: '0.1875rem solid #635BE6', // Thicker purple outline (3px)
    overflow: 'hidden',
    borderRadius: '1.5rem',
    margin: '0 auto',
  };

  const cellPurpleStyle = {
    backgroundColor: '#635BE6', // Purple background
    color: '#FFFFFF', // White text color
    padding: '2.25rem',
    border: '0.1875rem solid #635BE6', // Thicker purple outline (3px)
    overflow: 'hidden',
    borderRadius: '1.5rem',
    margin: '0 auto',
  };

  const listStyle = {
    listStyleType: 'disc',
    // overflow: 'visible',
    display: 'block',
  };

  // Function to handle toggling of expanded state for text
  const handleToggle = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  useEffect(() => {
    bulletRefs.current.forEach((ref, index) => {
      if (ref && ref.scrollHeight > ref.clientHeight) {
        setExpanded((prevState) => ({
          ...prevState,
          [index]: false,
        }));
        lineHeights.current[index] = getComputedStyle(ref).lineHeight;
      }
    });
  }, [jsonData]);

  // Function to render bullet points with 'Read more' functionality and alternating link colors
  const renderBulletPoints = (text, index, cellIndex) => {
    const isExpanded = expanded[index]; // Check if the current bullet point is expanded
    const color = cellIndex % 2 === 0 ? '#635BE6' : '#FFFFFF'; // Alternating text colors
    const lineHeight = lineHeights.current[index];
    const maxHeight = lineHeight ? parseFloat(lineHeight) * 3 : '3.6em';

    const bulletPointStyle = {
      overflow: 'hidden', // Always hide overflow
      maxHeight: isExpanded ? 'none' : maxHeight,
      textOverflow: 'ellipsis', // Add text overflow ellipsis
    };

    return (
      <div>
        <div
          style={bulletPointStyle} // Limit the height for truncation
          ref={(el) => (bulletRefs.current[index] = el)}
        >
          {renderTextContent(text, color)} {/* Pass color to renderTextContent */}
        </div>
        {bulletRefs.current[index] && bulletRefs.current[index].scrollHeight > maxHeight && ( // Show "Read more" button if text exceeds maxLines
          <button className="readmore-button" onClick={() => handleToggle(index)}>
            {isExpanded ? 'See less' : '...Read more'} {/* Toggle button text */}
          </button>
        )}
      </div>
    );
  };

  return (
    <div ref={gridRef} style={gridContainerStyle} className="container">
      <svg
        style={smallScreen ? {display : 'none'} : {
          position: 'absolute',
          zIndex: -1,
        }}
        width="100%"
        height="100%"
        fill="none"
      >
        {lines}
        {paths}
      </svg>
      {jsonData.map((item, cellIndex) => (
        <div
          key={cellIndex}
          style={{
            ...(cellIndex % 2 === 0 ? cellWhiteStyle : cellPurpleStyle),
            gridRow: smallScreen ? 'span 1' : (cellIndex === 0 ? 'span 1' : 'span 2'), // Adjust for mobile
            marginTop: smallScreen ? '1rem' : (cellIndex === 1 ? secondCellMarginTop : ''), // Adjust for mobile
          }}
          className="mb-4"
        >
          <h2 style={headerStyle}>{item.header}</h2>
          <p>{item.date}</p>
          <ul className='bulletpoints'>
            <li><span style={listStyle}>{renderBulletPoints(item.list1, cellIndex * 4, cellIndex)}</span></li>
            {item.list2 && (
            <li><span style={listStyle}>{renderBulletPoints(item.list2, cellIndex * 4 + 1, cellIndex)}</span></li>
            )}
            {item.list3 && (
            <li><span style={listStyle}>{renderBulletPoints(item.list3, cellIndex * 4 + 2, cellIndex)}</span></li>
            )}
            {item.list4 && (
            <li><span style={listStyle}>{renderBulletPoints(item.list4, cellIndex * 4 + 3, cellIndex)}</span></li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

function Highlight() {
  return (
    <div className="highlight-card">
      <TwoColumnGrid />
    </div>
  );
}

export default Highlight;
