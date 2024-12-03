import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/clubs">Clubs</Link></li>
          <li><Link to="/players">Players</Link></li>
          <li><Link to="/games">Games</Link></li>
          <li><Link to="/competitions">Competitions</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
