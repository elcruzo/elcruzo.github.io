import React from 'react';
import '../App.css';
import jsonData from "../mock_data.json";
import data from '../data';

const Highlight = () => {
    return (
        <div>
            {jsonData.map((item) => (
                <div key={item.id}>
                    <h4>{item.header}</h4>
                    <h5>{item.date}</h5>
                    <ul>
                        {item.list1 && <li>{item.list1}</li>}
                        {item.list2 && <li>{item.list2}</li>}
                        {item.list3 && <li>{item.list3}</li>}
                    </ul>
                </div>
            ))}
        </div>
    )
};

export default Highlight