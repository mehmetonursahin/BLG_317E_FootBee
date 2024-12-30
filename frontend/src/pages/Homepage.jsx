import { Link } from 'react-router-dom';
import '../styles/Homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="hero">
        <h1>Welcome to Footbee</h1>
        <p>The ultimate database application for football enthusiasts.</p>
        <img src='./logo.png' alt="Logo" className="logo" />
        <Link to="/clubs" className="explore-button">
          Explore Now
        </Link>
      </div>
      <footer>
        <p>© 2024 Footbee. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
