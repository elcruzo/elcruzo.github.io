import React, { useState } from 'react';
import './App.css';

function Navbar() {
    // Define a state to manage the visibility of the navbar
    const [isActive, setIsActive] = useState(false);

    // Toggle function to handle click event
    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    // Define the JSX for the Navbar component
    return (
        <header>
            <a href="/" className="logo" title='elcruzo_logo'><span className='alt-color'>El</span>Cruzo</a>
            <nav className={`nav ${isActive ? '' : 'rotate180'}`}>
                <div className="hamburger" onClick={toggleNavbar}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                <div className='entire-bar'>
                    <ul>
                        <li className='navbar-list-item active'>
                            <a href="/aboutme">About Me</a>
                        </li>
                        <li className='navbar-list-item'>
                            <a href="https://docs.google.com/document/d/19xVMNChFc0ccuvewNZunGhgSB8Pooy_y7fTLMMFtXCo/edit?usp=sharing">Resume</a>
                        </li>
                        <li className='navbar-list-item'>
                            <a href="/projects">Projects</a>
                        </li>
                        <li className='navbar-list-item'>
                            <a href="http://www.linkedin.com/in/elcruzo/">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;

// import React from 'react';
// import './App.css';

// function Navbar() {
//     return (
//         <nav className='nav'>
//             <a href="/" className="logo" title='elcruzo_logo'><span className='alt-color'>El</span>Cruzo</a>
//             <div className="hamburger">
//                 <div className="line1"></div>
//                 <div className="line2"></div>
//                 <div className="line3"></div>
//             </div>
//             <div className='entire-bar'>
//                 <ul>
//                     <li className='navbar-list-item active'>
//                         <a href="/aboutme">About Me</a>
//                     </li>
//                     <li className='navbar-list-item'>
//                         <a href="https://docs.google.com/document/d/19xVMNChFc0ccuvewNZunGhgSB8Pooy_y7fTLMMFtXCo/edit?usp=sharing">Resume</a>
//                     </li>
//                     <li className='navbar-list-item'>
//                         <a href="/projects">Projects</a>
//                     </li>
//                     <li className='navbar-list-item'>
//                         <a href="http://www.linkedin.com/in/elcruzo/">Contact</a>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     )
// }

// export default Navbar