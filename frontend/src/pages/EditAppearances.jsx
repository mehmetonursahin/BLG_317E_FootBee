import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/addAppearance.css"; // Aynı CSS dosyasını kullanıyoruz.

function EditAppearancePage() {
  const navigate = useNavigate();
  const { appearanceId, playerId } = useParams();

  const [appearance, setAppearance] = useState({
    game_id: "",
    competition_id: "",
    date: "",
    goals: 0,
    assists: 0,
    minutes_played: 0,
    yellow_cards: 0,
    red_cards: 0,
  });

  // Backend'den mevcut appearance'ı al
  useEffect(() => {
    const fetchAppearance = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/appearances/${appearanceId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch appearance");
        }
        const data = await response.json();
        setAppearance(data);
      } catch (error) {
        console.error("Error fetching appearance:", error);
        alert("Error fetching appearance details");
      }
    };

    fetchAppearance();
  }, [appearanceId]);

  // Form inputlarını güncelle
  const handleChange = (e) => {
    setAppearance({
      ...appearance,
      [e.target.name]: e.target.value,
    });
  };

  // Form gönderildiğinde backend'e PUT isteği yap
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8080/appearances/${appearanceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appearance),
      });

      if (response.ok) {
        alert("Appearance updated successfully!");
        navigate(`/players/${playerId}`); // Oyuncu detay sayfasına geri yönlendir
      } else {
        alert("Error updating appearance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating appearance");
    }
  };

  return (
    <div className="add-appearance-container">
      <h2>Edit Appearance</h2>
      <form onSubmit={handleSubmit} className="add-appearance-form">
        {/* Sol Bölüm */}
        <div className="form-section">
          <h3>Match Details</h3>
          <div className="input-group">
            <div className="input-container">
              <label>Game ID</label>
              <input
                type="text"
                name="game_id"
                placeholder="Game ID"
                value={appearance.game_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-container">
              <label>Competition ID</label>
              <input
                type="text"
                name="competition_id"
                placeholder="Competition ID"
                value={appearance.competition_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-container">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={appearance.date}
                onChange={handleChange}
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
              <label>Goals</label>
              <input
                type="number"
                name="goals"
                placeholder="Goals"
                value={appearance.goals}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label>Assists</label>
              <input
                type="number"
                name="assists"
                placeholder="Assists"
                value={appearance.assists}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label>Minutes Played</label>
              <input
                type="number"
                name="minutes_played"
                placeholder="Minutes Played"
                value={appearance.minutes_played}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label>Yellow Cards</label>
              <input
                type="number"
                name="yellow_cards"
                placeholder="Yellow Cards"
                value={appearance.yellow_cards}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label>Red Cards</label>
              <input
                type="number"
                name="red_cards"
                placeholder="Red Cards"
                value={appearance.red_cards}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit">Update Appearance</button>
        </div>
      </form>
    </div>
  );
}

export default EditAppearancePage;
