import React from 'react';
import './App.css';

const Project = ({ image, description, githubLink, isReversed }) => {
  return (
    <div className="row justify-content-center my-4">
      <div className={`col-12 col-md-8 d-flex ${isReversed ? 'flex-row-reverse' : ''} flex-wrap`}>
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <img src={image} className="img-fluid" alt="Project" style={{ maxWidth: '100%' }} />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
          <p>{description}</p>
          <a className="btn btn-primary" href={githubLink} target="_blank" rel="noopener noreferrer">
            View on GitHub <i className="bi bi-box-arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Project;