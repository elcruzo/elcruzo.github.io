import React from 'react';
import './App.css';
import Home from './Home';
import Projects from './pages/Projects';
import Error from './pages/Error';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
	<>
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/projects" element={<Projects />} />

			<Route path="*" element={<Error />} />
		</Routes>
	</>
	
  )
}

export default App;
