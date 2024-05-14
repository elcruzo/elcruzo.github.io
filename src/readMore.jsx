import React, { useState } from 'react';

const ReadMore = ({ text, maxLines, color }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getTruncatedText = () => {
    const lines = text.split('\n');
    if (lines.length <= maxLines) {
      return text;
    }

    if (expanded) {
      return text;
    } else {
      return lines.slice(0, maxLines).join('\n');
    }
  };

  const shouldShowToggle = text.split('\n').length > maxLines;

  return (
    <div>
      <span style={{ color }}>{renderTextContent(getTruncatedText(), color)}</span>
      {shouldShowToggle && (
        <button className="readmore-button" onClick={toggleExpanded}>
          {expanded ? 'See less' : '...Read more'}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
