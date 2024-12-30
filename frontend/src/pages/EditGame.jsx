import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/shared.css';

const EditGame = () => {
  const { gameId } = useParams();
  const defaultGamePlaceholder = {
    aggregate: "",
    attendance: "",
    away_club_goals: "",
    away_club_id: "",
    away_club_manager_name: "",
    away_club_name: "",
    away_club_position: "",
    competition_id: "",
    competition_type: "",
    date: "",
    home_club_goals: "",
    home_club_id: "",
    home_club_manager_name: "",
    home_club_name: "",
    home_club_position: "",
    referee: "",
    round: "",
    season: "",
    stadium: "",
    url: "",
  };
  const [formData, setFormData] = useState(defaultGamePlaceholder);
  useEffect(() => {
    if (!gameId) return;
    const fetchGameData = async () => {
      const response = await fetch(`http://127.0.0.1:8080/games?game_id=${gameId}`);
      const data = await response.json();
      const game = data.games[0];
      game.date = new Date(game.date).toISOString().split('T')[0];
      setFormData(data.games[0]);
    };

    fetchGameData();
  }, [gameId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8080/games/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Game edited successfully!");
      } else {
        alert("Failed to edit game.");
      }
    } catch (error) {
      console.error("Error editing game:", error);
      alert("An error occurred while editing the game.");
    }
  };

  return (
    <div>
      <h1>Edit Game</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>
              {key.replace(/_/g, " ")}:
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditGame;
