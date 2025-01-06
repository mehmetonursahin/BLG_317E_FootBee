import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addPlayer.css";

function AddPlayerPage() {
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState({
    player_id: "",
    first_name: "",
    last_name: "",
    player_code: "",
    country_of_birth: "",
    city_of_birth: "",
    country_of_citizenship: "",
    position: "",
    foot: "NotIndicated", // Varsayılan değer ENUM için
    image_url: "",
    url: "",
    // Opsiyonel alanlar
    date_of_birth: "",
    height_in_cm: "",
    contract_expiration_date: "",
    agent_name: "",
    sub_position: "",
    current_club_id: "",
    last_season: "",
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
      const payload = {
        ...playerData,
        player_id: Number(playerData.player_id), // Sayısal değerler için dönüşüm
        height_in_cm: playerData.height_in_cm ? Number(playerData.height_in_cm) : null,
        current_club_id: playerData.current_club_id
          ? Number(playerData.current_club_id)
          : null,
        last_season: playerData.last_season ? Number(playerData.last_season) : null,
      };

      const response = await fetch(`http://127.0.0.1:8080/players/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to add player");
      }
      alert("Player added successfully!");
      navigate("/"); // Başarılı eklemeden sonra ana sayfaya döndür
    } catch (err) {
      console.error(err);
      alert("Error adding player");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit} className="form-section">
        {/* Zorunlu Alanlar */}
        <div>
          <label>Player ID:</label>
          <input
            type="number"
            name="player_id"
            value={playerData.player_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={playerData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={playerData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Player Code:</label>
          <input
            type="text"
            name="player_code"
            value={playerData.player_code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country of Birth:</label>
          <input
            type="text"
            name="country_of_birth"
            value={playerData.country_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City of Birth:</label>
          <input
            type="text"
            name="city_of_birth"
            value={playerData.city_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country of Citizenship:</label>
          <input
            type="text"
            name="country_of_citizenship"
            value={playerData.country_of_citizenship}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={playerData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Foot:</label>
          <select name="foot" value={playerData.foot} onChange={handleChange} required>
            <option value="NotIndicated">Not Indicated</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={playerData.image_url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profile URL:</label>
          <input
            type="text"
            name="url"
            value={playerData.url}
            onChange={handleChange}
            required
          />
        </div>

        {/* Opsiyonel Alanlar */}
        <div>
          <label>Date Of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={playerData.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            name="height_in_cm"
            value={playerData.height_in_cm}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contract Expiration Date:</label>
          <input
            type="date"
            name="contract_expiration_date"
            value={playerData.contract_expiration_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Agent Name:</label>
          <input
            type="text"
            name="agent_name"
            value={playerData.agent_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sub Position:</label>
          <input
            type="text"
            name="sub_position"
            value={playerData.sub_position}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Current Club ID:</label>
          <input
            type="number"
            name="current_club_id"
            value={playerData.current_club_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Season:</label>
          <input
            type="number"
            name="last_season"
            value={playerData.last_season}
            onChange={handleChange}
          />
        </div>
       <button type="submit" style={{ marginTop: "1rem" }}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddPlayerPage;
