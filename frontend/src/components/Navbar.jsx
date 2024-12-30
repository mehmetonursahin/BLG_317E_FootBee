import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/">
            <img src='./logo.png' alt="Logo" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <ul className="navbar-menu">
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
