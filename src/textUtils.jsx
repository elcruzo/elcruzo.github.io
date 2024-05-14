import React from "react";

export const renderTextContent = (text, color) => {
    const linkStyle = {
        color: color,
        fontWeight: 'bold',
        textDecoration: 'underline',
    };

    const linkRegex = /<a.*?href=['"](.*?)['"].*?>(.*?)<\/a>/g;
  
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {index > 0 && <br />}
        {line.match(linkRegex) ? (
          line.split(linkRegex).map((part, i) => (
            i % 3 === 0 ? (
              <span key={i} style={{ color }}>{part}</span>
            ) : (
              i % 3 === 1 ? (
                <a 
                key={i} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ ...linkStyle, color }} 
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  {line.split(linkRegex)[i + 1]}
                </a>
              ) : null
            )
          ))
        ) : (
          <span style={{ color }}>{line}</span>
        )}
      </React.Fragment>
    ));
};