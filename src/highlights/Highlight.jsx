// import React from 'react';
// import '../App.css';
// import jsonData from "../mock_data.json";
// import data from '../data';

// const Highlight = () => {
//     return (
//         <div>
//             {jsonData.map((item) => (
//                 <div key={item.id}>
//                     <h4>{item.header}</h4>
//                     <h5>{item.date}</h5>
//                     <ul>
//                         {item.list1 && <li>{item.list1}</li>}
//                         {item.list2 && <li>{item.list2}</li>}
//                         {item.list3 && <li>{item.list3}</li>}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     )
// };

// export default Highlight


// import React, { useState, useRef, useEffect } from 'react';
// import jsonData from "../mock_data.json";
// import '../App.css';

// const TwoColumnGrid = () => {
//   const [secondCellMarginTop, setSecondCellMarginTop] = useState('');
//   const gridContainerStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)',
//     gridGap: '86px',
//   };

//   const cellStyle = {
//     backgroundColor: '#e0e0e0',
//     padding: '36px',
//     width: '300px',
//     border: '1px solid #ccc',
//     overflow: 'hidden',
//   };

//   const firstCellRef = useRef();

//   useEffect(() => {
//     const firstCellHeight = firstCellRef.current.clientHeight;
//     setSecondCellMarginTop(`${firstCellHeight / 2}px`);
//   }, []);

//   return (
//     <div style={gridContainerStyle}>
//       {jsonData.map((item, index) => (
//         <div
//           key={index}
//           ref={index === 0 ? firstCellRef : null}
//           style={{
//             ...cellStyle,
//             gridRow: index === 0 ? 'span 1' : 'span 2',
//             marginTop: index === 1 ? secondCellMarginTop : '',
//           }}
//         >
//           <h2>{item.header}</h2>
//           <p>{item.date}</p>
//           <ul>
//             <li>{item.list1}</li>
//             {item.list2 && <li>{item.list2}</li>}
//             {item.list3 && <li>{item.list3}</li>}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// function Highlight() {
//   return (
//     <div className='highlight'>
//       <TwoColumnGrid />
//     </div>
//   );
// }

// export default Highlight;

import React, { useState, useRef, useEffect } from 'react';
import jsonData from "../mock_data.json";
import '../App.css';

const TwoColumnGrid = () => {
  const [secondCellMarginTop, setSecondCellMarginTop] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '86px',
  };

  const cellStyle = {
    backgroundColor: '#e0e0e0',
    padding: '36px',
    width: '300px',
    border: '1px solid #ccc',
    overflow: 'hidden',
  };

  const firstCellRef = useRef();

  useEffect(() => {
    const firstCellHeight = firstCellRef.current.clientHeight;
    setSecondCellMarginTop(`${firstCellHeight / 2}px`);
  }, []);

  const handleSeeMoreClick = () => {
    setShowFullContent(true);
  };

  return (
    <div style={gridContainerStyle}>
      {jsonData.map((item, index) => (
        <div
          key={index}
          ref={index === 0 ? firstCellRef : null}
          style={{
            ...cellStyle,
            gridRow: index === 0 ? 'span 1' : 'span 2',
            marginTop: index === 1 ? secondCellMarginTop : '',
          }}
        >
          <h2>{item.header}</h2>
          <p>{item.date}</p>
          <ul>
            <li>{item.list1}</li>
            {item.list2 && (
              <li className={showFullContent ? 'show-full-content' : ''}>
                {item.list2}
                {item.list2.length > 80 && !showFullContent && (
                  <button onClick={handleSeeMoreClick}>See more</button>
                )}
              </li>
            )}
            {item.list3 && (
              <li className={showFullContent ? 'show-full-content' : ''}>
                {item.list3}
                {item.list3.length > 80 && !showFullContent && (
                  <button onClick={handleSeeMoreClick}>See more</button>
                )}
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

function Highlight() {
  return (
    <div className='App'>
      <TwoColumnGrid />
    </div>
  );
}

export default Highlight;
