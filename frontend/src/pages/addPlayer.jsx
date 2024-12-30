// AddPlayerPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/addPlayer.css";

function AddPlayerPage() {
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState({
    player_id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    position: "",
    // vb. diğer alanlar
  });

  const handleChange = (e) => {
    setPlayerData({
      ...playerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8080/players/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      });
      if (!response.ok) {
        throw new Error("Failed to add player");
      }
      alert("Player added successfully!");
      navigate("/"); // Başarılı eklemeden sonra ana sayfaya döndür.
    } catch (err) {
      console.error(err);
      alert("Error adding player");
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit} className="form-section">
        <div>
          <label>Player ID: </label>
          <input
            type="text"
            name="player_id"
            value={playerData.player_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="first_name"
            value={playerData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="last_name"
            value={playerData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date Of Birth: </label>
          <input
            type="date"
            name="date_of_birth"
            value={playerData.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Position: </label>
          <input
            type="text"
            name="position"
            value={playerData.position}
            onChange={handleChange}
          />
        </div>
        {/* Buraya diğer alanları da ekleyebilirsin */}

        <button type="submit" style={{ marginTop: '1rem' }}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddPlayerPage;
