import {React, useRef} from 'react';
import './App.css';
import {FaBars, FaTimes} from "react-icons/fa";

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive-nav");
    }

    return (
        <header className='header-nav'>
            <a href="/" className="logo" title='elcruzo_logo'><span className='alt-color'>El</span>Cruzo</a>
            <nav className='nav navbar navbar-expand-sm' ref={navRef}>
                <ul className='navbar-nav ml-auto'>
                    <li className="nav-item">
                        <a className="nav-link" href="/aboutme">About Me</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://docs.google.com/document/d/19xVMNChFc0ccuvewNZunGhgSB8Pooy_y7fTLMMFtXCo/edit?usp=sharing">Resume</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/projects">Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="http://www.linkedin.com/in/elcruzo/">Contact</a>
                    </li>
                </ul>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    )
}

export default Navbar