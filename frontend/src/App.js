import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ClubsPage from './pages/clubs';
import PlayersPage from './pages/players';
import GamesPage from './pages/games';
import CompetitionsPage from './pages/competitions';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
