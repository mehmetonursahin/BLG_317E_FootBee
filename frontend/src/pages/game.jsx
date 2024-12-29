import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/GamePage.css";
import GameEvents from "../components/GameEvents";
const GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [gameEvents, setGameEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    const fetchGameData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8080/games/${gameId}`);
        const data = await response.json();
        setGame(data.game);
        setGameEvents(data.game_events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  
  return (
    <div className="game-page">
      {game && (
        <div className="game-details">
          <h1>
            {game.home_club_name} <span>vs</span> {game.away_club_name}
          </h1>
          <p>
            <strong>Date:</strong> {new Date(game.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Score:</strong> {game.home_club_goals} -{" "}
            {game.away_club_goals}
          </p>
          <p>
            <strong>Venue:</strong> {game.stadium}
          </p>
          <p>
            <strong>Referee:</strong> {game.referee}
          </p>
        </div>
      )}
      <GameEvents events={gameEvents} game={game} ></GameEvents>

    </div>
  );
};

export default GamePage;