import React from 'react';
import './App.css';
import Home from './Home';
import Aboutme from './pages/Aboutme';
import Projects from './pages/Projects';
import Error from './pages/Error';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
	<>
		<Routes>
			<Route path="/" element={<Home />} />

				<Route path="/aboutme" element={<Aboutme />} />

				<Route path="/projects" element={<Projects />} />

			<Route path="*" element={<Error />} />
		</Routes>
	</>
	
  )
}

export default App;
