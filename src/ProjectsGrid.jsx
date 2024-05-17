import React from 'react';
import projectsData from './data/projectsData';
import Project from './Project';
import './App.css';

const ProjectsGrid = () => {
  return (
    <div className="container">
      {projectsData.map((project, index) => (
        <Project
          key={project.id}
          image={project.image}
          description={project.description}
          githubLink={project.githubLink}
          isReversed={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
