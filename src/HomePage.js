// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css'; // Import HomePage.css for styling

function HomePage() {
  return (
    <div className="homepage-container"> {/* Apply homepage-container class */}
      {/* <h2>Operating </h2> */}
      
      <ul className="navigation-links"> {/* Apply navigation-links class */}
        <li><Link to="/RoundRobinScheduler"></Link></li> {/* Link to RoundRobinScheduler.js */}
      </ul>
      <div className="btnn"> {/* Apply btn class */}
        <Link to="/RoundRobinScheduler"> {/* Link to RoundRobinScheduler.js */}
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
