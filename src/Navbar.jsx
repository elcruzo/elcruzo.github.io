import React from 'react';
import './App.css';

function Navbar() {
    return (
        <nav className='nav'>
            <a href="/" className="logo" title='elcruzo_logo'>ElCruzo</a>
            <ul>
                <li>
                    <a href="/aboutme">About Me</a>
                </li>
                <li>
                    <a href="/resume">Resume</a>
                </li>
                <li>
                    <a href="/projects">Projects</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar