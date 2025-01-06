import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/addAppearance.css";
import { v4 as uuidv4 } from "uuid";

function AddAppearancePage() {
  const navigate = useNavigate();
  const { playerId } = useParams();

  const [appearance, setAppearance] = useState({
    appearance_id: uuidv4(),
    game_id: "",
    competition_id: "",
    date: "",
    goals: 0,
    assists: 0,
    minutes_played: 0,
    yellow_cards: 0,
    red_cards: 0,
    player_id: Number(playerId), // Varsayılan olarak URL'den alınan playerId
  });

  // Formu gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8080/appearances/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appearance),
      });

      if (response.ok) {
        alert("Appearance added successfully!");
        navigate(`/players/${playerId}`); // Oyuncu detay sayfasına yönlendir
      } else {
        alert("Error adding appearance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding appearance");
      return "yarar"
    }
    
  };

  return (
    <div className="add-appearance-container">
      <h2>Add Appearance</h2>
      <form onSubmit={handleSubmit} className="add-appearance-form">
        {/* Sol Bölüm */}
        <div className="form-section">
          <h3>Match Details</h3>
          <div className="input-group">
            <div className="input-container">
              <label>Game ID</label>
              <input
                type="number"
                placeholder="Game ID"
                value={appearance.game_id}
                onChange={(e) =>
                  setAppearance({ ...appearance, game_id: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="input-container">
              <label>Competition ID</label>
              <input
                type="text"
                placeholder="Competition ID"
                value={appearance.competition_id}
                onChange={(e) =>
                  setAppearance({ ...appearance, competition_id: e.target.value })
                }
                required
              />
            </div>

            <div className="input-container">
              <label>Date</label>
              <input
                type="date"
                value={appearance.date}
                onChange={(e) =>
                  setAppearance({ ...appearance, date: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Sağ Bölüm */}
        <div className="form-section">
          <h3>Performance Details</h3>
          <div className="input-group">
            <div className="input-container">
              <label>Player ID</label>
              <input
                type="number"
                placeholder="Player ID"
                value={appearance.player_id}
                onChange={(e) =>
                  setAppearance({ ...appearance, player_id: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="input-container">
              <label>Player Club ID</label>
              <input
                type="number"
                placeholder="Player Club ID"
                value={appearance.player_club_id}
                onChange={(e) =>
                  setAppearance({ ...appearance, player_club_id: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="input-container">
              <label>Player Current Club ID</label>
              <input
                type="number"
                placeholder="Current Club ID"
                value={appearance.player_current_club_id}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    player_current_club_id: Number(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="input-container">
              <label>Goals</label>
              <input
                type="number"
                placeholder="0"
                value={appearance.goals}
                onChange={(e) =>
                  setAppearance({ ...appearance, goals: Number(e.target.value) })
                }
              />
            </div>

            <div className="input-container">
              <label>Assists</label>
              <input
                type="number"
                placeholder="0"
                value={appearance.assists}
                onChange={(e) =>
                  setAppearance({ ...appearance, assists: Number(e.target.value) })
                }
              />
            </div>

            <div className="input-container">
              <label>Minutes Played</label>
              <input
                type="number"
                placeholder="0"
                value={appearance.minutes_played}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    minutes_played: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="input-container">
              <label>Yellow Cards</label>
              <input
                type="number"
                placeholder="0"
                value={appearance.yellow_cards}
                onChange={(e) =>
                  setAppearance({ ...appearance, yellow_cards: Number(e.target.value) })
                }
              />
            </div>

            <div className="input-container">
              <label>Red Cards</label>
              <input
                type="number"
                placeholder="0"
                value={appearance.red_cards}
                onChange={(e) =>
                  setAppearance({ ...appearance, red_cards: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit">Add Appearance</button>
        </div>
      </form>
    </div>
  );
}

export default AddAppearancePage;
