import React from 'react';
import './index.css';
import Navbar from './Navbar';

function Home() {
    return (
        <>
            <Navbar />
            <div className='row'>
              <div className='col-md-6'>
                <h3 className='greetings'>Hi there&#44;</h3>
                <h2>I&#39;m Ayomide Adekoya</h2>
                <h2>Backend Developer&#46;</h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-2'>
                <hr className='header-hr'noshade/>
              </div>
            </div>
        </>
    )
}

export default Home