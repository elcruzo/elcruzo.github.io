import React, { useState } from 'react';

const ReadMoreText = ({ text, maxLines }) => {
  const [showMore, setShowMore] = useState(false);

  const lines = text.split('\n');
  const isMultiline = lines.length > 1;

  const truncatedText = isMultiline ? lines.slice(0, maxLines).join('\n') : text;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      {isMultiline && (
        <div>
          <p
            style={{ margin: 0 }}
            dangerouslySetInnerHTML={{ __html: showMore ? text : truncatedText }}
          />
        </div>
      )}
      {!isMultiline && (
        <p
          style={{ margin: 0 }}
          dangerouslySetInnerHTML={{ __html: showMore ? text : truncatedText }}
        />
      )}
      {isMultiline && lines.length > maxLines && (
        <span
          style={{ cursor: 'pointer', color: '#635BE6', textDecoration: 'underline' }}
          onClick={toggleShowMore}
        >
          {showMore ? 'See Less' : 'Read More'}
        </span>
      )}
    </div>
  );
};

export default ReadMoreText;
