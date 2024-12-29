import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  // const [appearances, setAppearances] = useState([]);
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
    <div>
      {game && (
        <div>
          <h1>{game.home_club_name} vs {game.away_club_name}</h1>
          <p><strong>Date:</strong> {new Date(game.date).toISOString().split("T")[0]}</p>
          <p><strong>Score:</strong> {game.home_club_goals} - {game.away_club_goals}</p>
          <p><strong>Venue:</strong> {game.stadium}</p>
          <p><strong>Referee:</strong> {game.referee}</p>
        </div>
      )}
      <div>
        <h2>Game Events</h2>
        {gameEvents.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Minute</th>
                <th>Type</th>
                <th>Description</th>
                <th>Player</th>
              </tr>
            </thead>
            <tbody>
              {gameEvents.map((event) => (
                <tr key={event.game_event_id}>
                  <td>{event.minute}</td>
                  <td>{event.type}</td>
                  <td>{event.description || '-'}</td>
                  <td>{event.player_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No game events data available.</p>
        )}
      </div>
    </div>
  );
};

export default GamePage;
