import React from 'react';
import { Link } from 'react-router-dom'; 
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage-container"> 
      <ul className="navigation-links"> 
        <li><Link to="/RoundRobinScheduler"></Link></li> 
      </ul>
      <div className="btnn"> 
        <Link to="/RoundRobinScheduler"> 
          <button type="button">
            Round Robin Scheduler
          </button>
          <br />
          <button type="button">
            Banker’s algorithm for Deadlock
          </button>
          <br />
          <button type="button">
            SCAN disk scheduling algorithm
          </button>
          <br />
          <button type="button">
            Most recently used (MRU) page replacement algorithm
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
