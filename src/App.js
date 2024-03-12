import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RoundRobinScheduler from './RoundRobinScheduler';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Opertaing System Project</h1>
        </header>

        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/RoundRobinScheduler" element={<RoundRobinScheduler />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
