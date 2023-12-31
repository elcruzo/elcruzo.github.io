import React, { useState, useRef, useEffect } from 'react';


const ReadMoreText = ({ text, maxLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);
  
    const toggleTruncate = () => {
      setIsTruncated(!isTruncated);
    };
  
    const displayText = isTruncated ? text.slice(0, maxLength) : text;
  
    return (
      <div>
        <p>{displayText}</p>
        {text.length > maxLength && (
          <button onClick={toggleTruncate}>
            {isTruncated ? 'Read More' : 'Show Less'}
          </button>
        )}
      </div>
    );
  };