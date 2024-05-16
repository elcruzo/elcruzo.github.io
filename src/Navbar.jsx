import React from 'react';
import './App.css';

function Navbar() {
    return (
        <nav className='nav'>
            <a href="/" className="logo" title='elcruzo_logo'><span className='alt-color'>El</span>Cruzo</a>
            <ul>
                <li>
                    <a href="/aboutme">About Me</a>
                </li>
                <li>
                    <a href="https://docs.google.com/document/d/19xVMNChFc0ccuvewNZunGhgSB8Pooy_y7fTLMMFtXCo/edit?usp=sharing">Resume</a>
                </li>
                <li>
                    <a href="/projects">Projects</a>
                </li>
                <li>
                    <a href="http://www.linkedin.com/in/elcruzo/">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar