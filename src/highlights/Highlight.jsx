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

//   const gridContainerStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)',
//     gridGap: '86px',
//     position: 'relative',
//   };

    const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '5rem', // Convert to rem
    position: 'relative',
    maxWidth: '50rem', // Convert to rem, set your desired max-width
    margin: '0 auto', // Center the container
  };

//   const cellStyle = {
//     backgroundColor: '#e0e0e0',
//     padding: '2.25rem',
//     width: '18.75rem', 
//     border: '0.0625rem solid #ccc', 
//     overflow: 'hidden',
//     borderRadius: '1.5rem', 
//   };

    const cellStyle = {
    backgroundColor: '#e0e0e0',
    padding: '2.25rem',
    border: '0.0625rem solid #ccc',
    overflow: 'hidden',
    borderRadius: '1.5rem',
    margin: '0 auto', // Center the cell
  };
  
  const headerStyle = {
    fontSize: '2rem', // Adjust the font size as needed
    marginBottom: '1rem', // Adjust the margin as needed
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
      {jsonData.map((item, index) => (
        <div
          key={index}
          style={{
            ...cellStyle,
            gridRow: index === 0 ? 'span 1' : 'span 2',
            marginTop: index === 1 ? secondCellMarginTop : '',
          }}
          className="mb-4"
        >
          <h2 style={headerStyle}>{item.header}</h2>
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
