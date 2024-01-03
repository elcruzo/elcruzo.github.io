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

  const gridRef = useRef(null);
<<<<<<< HEAD
  const ref = useRef(null);
  const liRef = useRef([]);
=======
>>>>>>> parent of 80047ec (implementing useEffect)

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
    const calculateHeight = (index) => {
      if (liRef.current[index] && liRef.current[index].current) {
        console.log(liRef.current[index].current.scrollHeight, liRef.current[index].current.clientHeight);
        setShowReadMoreButton(liRef.current[index].current.scrollHeight > liRef.current[index].current.clientHeight);
      }
    };

    jsonData.forEach((item, cellIndex) => {
      calculateHeight(cellIndex);

      const handleResize = () => {
        calculateHeight(cellIndex);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

  }, [liRef]);

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
    gridGap: '5rem', // Convert to rem
    position: 'relative',
    maxWidth: '50rem', // Convert to rem, set your desired max-width
    margin: '0 auto', // Center the container
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
    fontSize: '2rem', // Adjust the font size as needed
    marginBottom: '1rem', // Adjust the margin as needed
  };

<<<<<<< HEAD

  const listStyle = {
    listStyleType: 'disc',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box',
  }
=======
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
>>>>>>> parent of 80047ec (implementing useEffect)

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
<<<<<<< HEAD
          {item.lists.map((list, listItemIndex) => (
              <li key={listItemIndex}>
                <span style={isOpenArrays[cellIndex]?.[listItemIndex] ? null : listStyle} ref={liRef.current[cellIndex]}>
                  {renderTextContent(list)}
                </span>
                {showReadMoreButton && (
                  <button onClick={() => toggleIsOpen(cellIndex, listItemIndex)} className='readmore-button'>
                    <strong>{isOpenArrays[cellIndex]?.[listItemIndex] ? 'Read Less' : 'Read More'}</strong>
                  </button>
                )}
              </li>
            ))}

            {item.list2 && (
            <>
            <li><span style={isOpenArrays[cellIndex]?.[1] ? null : listStyle} ref={ref}>{renderTextContent(item.list2)}</span></li>
            {showReadMoreButton && (
=======
            <li><span>{renderTextContent(item.list1)}</span></li>
            <button onClick={() => toggleIsOpen(cellIndex, 0)} className='readmore-button'>
                <strong>{isOpenArrays[cellIndex]?.[0] ? 'Read Less' : 'Read More'}</strong>
            </button>

            {item.list2 && (
            <>
            <li><span>{renderTextContent(item.list2)}</span></li>
>>>>>>> parent of 80047ec (implementing useEffect)
            <button onClick={() => toggleIsOpen(cellIndex, 1)} className='readmore-button'>
                <strong>{isOpenArrays[cellIndex]?.[1] ? 'Read Less' : 'Read More'}</strong>
            </button>
            </>)}

            {item.list3 && (
            <>
<<<<<<< HEAD
            <li><span style={isOpenArrays[cellIndex]?.[2] ? null : listStyle} ref={ref}>{renderTextContent(item.list3)}</span></li>
            {showReadMoreButton && (
=======
            <li><span>{renderTextContent(item.list3)}</span></li>
>>>>>>> parent of 80047ec (implementing useEffect)
            <button onClick={() => toggleIsOpen(cellIndex, 2)} className='readmore-button'>
                <strong>{isOpenArrays[cellIndex]?.[2] ? 'Read Less' : 'Read More'}</strong>
            </button>
            </>)}
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



// {
//     "id": 2,
//     "header": "Student Government",
//     "date": "2015 October",
//     "list1": "Elected Head Boy in Primary 6 (equivalent to 5th Grade).",
//     "list2": "Represented my school at the Annual Student Leadership Initiative Summit (SMI), winning first place in a mini-competition among 100+ schools.",
//     "list3": "<a href='http://google.com/'>ColorStack</a>. t the Annual Student Leadership Initiative Summit (SMI), winning first place in a mini-competition among 100+ scholculator in Python"
// },
