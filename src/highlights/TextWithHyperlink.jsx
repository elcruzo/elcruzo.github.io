import React from 'react';

const TextWithHyperlink = ({ text, onLinkClick }) => {
  const linkRegex = /<a.*?href="(.*?)".*?>(.*?)<\/a>/g;

  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {index > 0 && <br />}
      {line.match(linkRegex) ? (
        line.split(linkRegex).map((part, i) => (
          i % 3 === 0 ? (
            <span key={i}>{part}</span>
          ) : (
            i % 3 === 1 ? (
              <a key={i} href="#" onClick={() => onLinkClick(line.match(linkRegex)[1])} style={{ color: '#007bff', textDecoration: 'underline' }}>
                {line.match(linkRegex)[2]}
              </a>
            ) : (
              <span key={i}>{part}</span>
            )
          )
        ))
      ) : (
        <span>{line}</span>
      )}
    </React.Fragment>
  ));
};

export default TextWithHyperlink;