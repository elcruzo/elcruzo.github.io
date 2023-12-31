import React, { useState, useRef, useLayoutEffect } from 'react';
import jsonData from "../mock_data.json";
import '../App.css';

const TwoColumnGrid = () => {
  const [secondCellMarginTop, setSecondCellMarginTop] = useState('');
  const [gridRect, setGridRect] = useState([]);
  const [cellsRect, setCellsRect] = useState([]);

  const gridRef = useRef(null);

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

  const createLine = (startY, endX) => (
    <path
      d={`M${endX}, ${startY}H300`}
      key={`line${startY}`}
      stroke="#635BE6"
      strokeWidth="4"
      strokeDasharray="8 8"
    />
  );

  const createPath = (startY, midY, endX) => (
    <path
      d={`M${endX} ${midY}H150v50`}
      key={`path${startY}`}
      stroke="#635BE6"
      strokeWidth="4"
      strokeDasharray="8 8"
    />
  );

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
    gridGap: '86px',
    position: 'relative',
  };

  const cellStyle = {
    backgroundColor: '#e0e0e0',
    padding: '36px',
    width: '300px',
    border: '1px solid #ccc',
    overflow: 'hidden',
  };

  const linkStyle = {
    color: '#007bff', // Adjust the link color as needed
    textDecoration: 'underline',
  };
  
  const renderTextContent = (text) => {
    const linkRegex = /<a.*?href=['"](.*?)['"].*?>(.*?)<\/a>/g;
  
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {index > 0 && <br />}
        {line.match(linkRegex) ? (
          line.split(linkRegex).map((part, i) => (
            i % 3 === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              i % 3 === 1 ? (
                <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {line.split(linkRegex)[i + 1]}
                </a>
              ) : null
            )
          ))
        ) : (
          <span>{line}</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div ref={gridRef} style={gridContainerStyle}>
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
      {jsonData.map((item, index) => (
        <div
          key={index}
          style={{
            ...cellStyle,
            gridRow: index === 0 ? 'span 1' : 'span 2',
            marginTop: index === 1 ? secondCellMarginTop : '',
          }}
        >
          <h2>{item.header}</h2>
          <p>{item.date}</p>
          <ul>
            <li>{renderTextContent(item.list1)}</li>
            {item.list2 && <li>{renderTextContent(item.list2)}</li>}
            {item.list3 && <li>{renderTextContent(item.list3)}</li>}
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