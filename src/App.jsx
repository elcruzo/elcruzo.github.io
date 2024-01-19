import React from 'react';
import './App.css';
import Home from './Home';
import Aboutme from './pages/Aboutme';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Error from './pages/Error';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
	<>
		<Routes>
			<Route path="/" element={<Home />} />

				<Route path="/aboutme" element={<Aboutme />} />

				<Route path="/resume" element={<Resume />} />

				<Route path="/projects" element={<Projects />} />

				<Route path="/contact" element={<Contact />} />

			<Route path="*" element={<Error />} />
		</Routes>
	</>
	
  )
}

export default App;
