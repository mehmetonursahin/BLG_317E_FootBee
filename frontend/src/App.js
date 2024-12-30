import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ClubsPage from './pages/clubs';
import PlayersPage from './pages/players';
import GamesPage from './pages/games';
import GamePage from './pages/game';
import CompetitionsPage from './pages/competitions';
import AddGame from './pages/AddGame';
import PlayerDetail from './pages/playerDetail';
import AddPlayerPage from './pages/addPlayer'
import ClubDetailsPage from './pages/clubDetails';
import AddClubPage from './pages/addClub';
import EditClubPage from './pages/editClub';
import CompetitionDetailsPage from './pages/competitionDetails';
import AddCompetitionPage from './pages/addCompetition';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/clubs/:clubId" element={<ClubDetailsPage />} />
            <Route path="/clubs/add" element={<AddClubPage />} />
            <Route path="/clubs/edit/:clubId" element={<EditClubPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/add" element={<AddPlayerPage />} />
            <Route path="/player/:playerId" element={<PlayerDetail />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/add" element={<AddGame />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/competitions/:competitionId" element={<CompetitionDetailsPage />} />
            <Route path="/competitions/add" element={<AddCompetitionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
