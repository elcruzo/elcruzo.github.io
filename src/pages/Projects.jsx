import React from 'react';
import '../App.css';
import ProjectsGrid from '../ProjectsGrid';
import Navbar from '../Navbar';


function Projects() {
    return (
        <div className="App">
            <Navbar />
            
            <header className="App-header">
                <h1>My Portfolio</h1>
            </header>
            <main>
                <ProjectsGrid />
            </main>
        </div>
    )
}

export default Projects