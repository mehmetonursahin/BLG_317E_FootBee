import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addPlayer.css"; // Eğer yeni bir stil gerekiyorsa, aynı düzeni koruyabiliriz.

function AddPlayerPage() {
  const navigate = useNavigate();

  const [player, setPlayer] = useState({
    player_id: "",
    first_name: "",
    last_name: "",
    last_season: "",
    current_club_id: "",
    player_code: "",
    country_of_birth: "",
    city_of_birth: "",
    country_of_citizenship: "",
    date_of_birth: "",
    sub_position: "",
    position: "",
    foot: "NotIndicated",
    height_in_cm: "",
    contract_expiration_date: "",
    agent_name: "",
    image_url: "",
    url: "",
  });

  // Form gönderim işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8080/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });

      if (response.ok) {
        alert("Player added successfully!");
        navigate("/players"); // Oyuncu listesine geri dön
      } else {
        alert("Error adding player");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding player");
    }
  };

  return (
    <div className="add-player-container">
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit} className="add-player-form">
        {/* Sol Bölüm */}
        <div className="form-section">
          <h3>Personal Details</h3>
          <div className="input-group">
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={player.first_name}
                onChange={(e) => setPlayer({ ...player, first_name: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={player.last_name}
                onChange={(e) => setPlayer({ ...player, last_name: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Date of Birth</label>
              <input
                type="date"
                value={player.date_of_birth}
                onChange={(e) => setPlayer({ ...player, date_of_birth: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Country of Birth</label>
              <input
                type="text"
                placeholder="Country of Birth"
                value={player.country_of_birth}
                onChange={(e) => setPlayer({ ...player, country_of_birth: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>City of Birth</label>
              <input
                type="text"
                placeholder="City of Birth"
                value={player.city_of_birth}
                onChange={(e) => setPlayer({ ...player, city_of_birth: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Foot</label>
              <select
                value={player.foot}
                onChange={(e) => setPlayer({ ...player, foot: e.target.value })}
              >
                <option value="NotIndicated">Not Indicated</option>
                <option value="Left">Left</option>
                <option value="Right">Right</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sağ Bölüm */}
        <div className="form-section">
          <h3>Professional Details</h3>
          <div className="input-group">
            <div className="input-container">
              <label>Player Code</label>
              <input
                type="text"
                placeholder="Player Code"
                value={player.player_code}
                onChange={(e) => setPlayer({ ...player, player_code: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Current Club ID</label>
              <input
                type="text"
                placeholder="Current Club ID"
                value={player.current_club_id}
                onChange={(e) => setPlayer({ ...player, current_club_id: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Position</label>
              <input
                type="text"
                placeholder="Position"
                value={player.position}
                onChange={(e) => setPlayer({ ...player, position: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Sub Position</label>
              <input
                type="text"
                placeholder="Sub Position"
                value={player.sub_position}
                onChange={(e) => setPlayer({ ...player, sub_position: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="Image URL"
                value={player.image_url}
                onChange={(e) => setPlayer({ ...player, image_url: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Profile URL</label>
              <input
                type="text"
                placeholder="Profile URL"
                value={player.url}
                onChange={(e) => setPlayer({ ...player, url: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit">Add Player</button>
        </div>
      </form>
    </div>
  );
}

export default AddPlayerPage;
