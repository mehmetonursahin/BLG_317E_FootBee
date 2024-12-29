import React, { useState } from "react";

const AddGame = () => {
  const [formData, setFormData] = useState({
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
    game_id: "",
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Game added successfully!");
        setFormData({
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
          game_id: "",
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
        });
      } else {
        alert("Failed to add game.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
      alert("An error occurred while adding the game.");
    }
  };

  return (
    <div>
      <h1>Add Game</h1>
      <form onSubmit={handleSubmit}>
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

export default AddGame;
