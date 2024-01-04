import React, { useState, useRef, useLayoutEffect } from 'react';
import jsonData from "../mock_data.json";
import { createLine, createPath } from "../geometryUtils";
import { renderTextContent } from "../textUtils";
import '../App.css';

const TwoColumnGrid = () => {
  const [secondCellMarginTop, setSecondCellMarginTop] = useState('');
  const [gridRect, setGridRect] = useState([]);
  const [cellsRect, setCellsRect] = useState([]);
//   const [isOpenArray, setIsOpenArray] = useState(Array(jsonData.length).fill(false));
  const [isOpenArrays, setIsOpenArrays] = useState(Array(jsonData.length).fill([]));
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);

  const gridRef = useRef(null);
  const ref = useRef(null);
  const listRefs = Array.from({ length: jsonData.length }, () => useRef(null));

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

  calculateRects();

  useLayoutEffect(() => {
    calculateRects();
    window.addEventListener('resize', calculateRects);

    return () => {
      window.removeEventListener('resize', calculateRects);
    };
  }, [gridRef]);

  useLayoutEffect(() => {
    if (ref.current) {
      console.log('scrollHeight:', ref.current.scrollHeight);
      console.log('clientHeight:', ref.current.clientHeight);
      setShowReadMoreButton (ref.current.scrollHeight > ref.current.clientHeight)
    }
  }, [isOpenArrays]);

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
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '5rem', 
    position: 'relative',
    maxWidth: '50rem',
    margin: '0 auto',
  };

    const cellStyle = {
    backgroundColor: '#e0e0e0',
    padding: '2.25rem',
    border: '0.0625rem solid #ccc',
    overflow: 'hidden',
    borderRadius: '1.5rem',
    margin: '0 auto', // Center the cell
  };
  
  const headerStyle = {
    fontSize: '2rem', 
    marginBottom: '1rem', 
  };


  const listStyle = {
    listStyleType: 'disc',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box',
  }

  const toggleIsOpen = (cellIndex, listItemIndex) => {
    const newArrays = [...isOpenArrays];
    newArrays[cellIndex] = [...(newArrays[cellIndex] || [])];
    newArrays[cellIndex][listItemIndex] = !newArrays[cellIndex][listItemIndex];
    setIsOpenArrays(newArrays);
  };

  return (
    <div ref={gridRef} style={gridContainerStyle} className="container">
      <svg
        style={{
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
            ...cellStyle,
            gridRow: cellIndex === 0 ? 'span 1' : 'span 2',
            marginTop: cellIndex === 1 ? secondCellMarginTop : '',
          }}
          className="mb-4"
        >
          <h2 style={headerStyle}>{item.header}</h2>
          <p>{item.date}</p>
          <ul className='bulletpoints'>
            <li><span style={isOpenArrays[cellIndex]?.[0] ? null : listStyle} ref={listRefs[cellIndex]}>{renderTextContent(item.list1)}</span></li>
            {showReadMoreButton && (
            <button onClick={() => toggleIsOpen(cellIndex, 0)} className='readmore-button'>
                <strong>{isOpenArrays[cellIndex]?.[0] ? 'Read Less' : 'Read More'}</strong>
            </button>
            )}

            {item.list2 && (
            <>
            <li><span style={isOpenArrays[cellIndex]?.[1] ? null : listStyle} ref={listRefs[cellIndex + 1]}>{renderTextContent(item.list2)}</span></li>
            {showReadMoreButton && (
            <button onClick={() => toggleIsOpen(cellIndex, 1)} className='readmore-button'>
                <strong>{isOpenArrays[cellIndex]?.[1] ? 'Read Less' : 'Read More'}</strong>
            </button>
            )}
            </>)}

            {item.list3 && (
            <>
            <li><span style={isOpenArrays[cellIndex]?.[2] ? null : listStyle} ref={listRefs[cellIndex + 2]}>{renderTextContent(item.list3)}</span></li>
            {showReadMoreButton && (
            <button onClick={() => toggleIsOpen(cellIndex, 2)} className='readmore-button'>
                <strong>{isOpenArrays[cellIndex]?.[2] ? 'Read Less' : 'Read More'}</strong>
            </button>
            )}
            </>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

function Highlight() {
  return (
    <div className="App">
      <TwoColumnGrid />
    </div>
  );
}

export default Highlight;