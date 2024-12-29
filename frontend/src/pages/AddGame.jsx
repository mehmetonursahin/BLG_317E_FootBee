import React, { useState } from "react";

const AddGame = () => {
  const defaultGamePlaceholder = {
    aggregate: "1:1",
    attendance: "123",
    away_club_goals: "2",
    away_club_id: "3",
    away_club_manager_name: "Manager1",
    away_club_name: "1.FC Köln",
    away_club_position: "2",
    competition_id: "BE1",
    competition_type: "first_tier",
    date: "20241229",
    game_id: "1234567",
    home_club_goals: "1",
    home_club_id: "4",
    home_club_manager_name: "Manager2",
    home_club_name: "AC Milan",
    home_club_position: "3",
    referee: "Maksim Layushkin",
    round: "6. Matchday",
    season: "2024",
    stadium: "Metallurg",
    url: "https://www.transfermarkt.co.uk/krylya-sovetov-samara_kuban-krasnodar-2018-/index/spielbericht/2222599",
  };
  const [formData, setFormData] = useState(defaultGamePlaceholder);

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
