import React from 'react';
import './index.css';
import Navbar from './Navbar';

function Home() {
    return (
        <>
            <Navbar />
            <br />
            <h2 className='greetings'>Hi there</h2>
        </>
    )
}

export default Home