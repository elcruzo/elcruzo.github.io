import {React, useRef} from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './App.css';

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive-nav");
    }

    return (
        <header className='header-nav'>
            <NavLink to="/" className="logo" title='elcruzo_logo'>
                <span className='alt-color'>El</span>Cruzo
            </NavLink>
            <nav className='nav navbar navbar-expand-sm' ref={navRef}>
                <ul className='navbar-nav ml-auto'>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" activeClassName="active">About Me</NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://docs.google.com/document/d/19xVMNChFc0ccuvewNZunGhgSB8Pooy_y7fTLMMFtXCo/edit?usp=sharing">Resume</a>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/projects" activeClassName="active">Projects</NavLink>
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