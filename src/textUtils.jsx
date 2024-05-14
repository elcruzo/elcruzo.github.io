import React from "react";

const linkStyle = {
    color: '#007bff', // Adjust the link color as needed
    textDecoration: 'underline',
    fontWeight: 'bold',
  };


export const renderTextContent = (text) => {
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
                <a 
                key={i} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={linkStyle} 
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'none'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'underline'}
                >
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