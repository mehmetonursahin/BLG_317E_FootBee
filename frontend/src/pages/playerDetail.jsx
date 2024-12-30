import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/playerDetail.css';

function PlayerDetail() {
  const { playerId } = useParams(); // /player/:playerId
  const navigate = useNavigate();

  // Oyuncu verileri (join’lenmiş veriler de gelebilir).
  const [playerData, setPlayerData] = useState(null);

  // Aktif sekme "overview" veya "manage" olsun
  const [activeTab, setActiveTab] = useState("overview");

  // Update formu için state.
  // Tabloda geçen *tüm* alanlar burada bulunmalı.
  const [formData, setFormData] = useState({
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
    foot: "",
    height_in_cm: "",
    contract_expiration_date: "",
    agent_name: "",
    image_url: "",
    url: ""
  });

  // 1) Sayfa yüklendiğinde backend'den veriyi çek
  useEffect(() => {
    const fetchPlayer = async () => {

      try {
        const response = await fetch(`http://localhost:8080/players/${playerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }
        const data = await response.json();
        setPlayerData(data);

        // 2) Formu doldurmak için (örnek):
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  // Sekme değiştirme
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Form input değiştirme
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3) UPDATE butonuna basınca
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // PUT isteğinde, tablo alanlarının tamamını backend’in beklediği şekilde gönderiyoruz.
      // Ayrıca player_id’yi de göndereceğiz ancak backend bunu URL parametresinden alıyor.
      // Bazı backend kodlarında body’de `player_id` isteniyorsa, ekleyebilirsin.
      const payload = {
        ...formData
      };

      const response = await fetch(`http://localhost:8080/players/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update player");
      }
      alert("Player updated successfully!");

      // Gerekirse tekrar GET isteği atıp sayfayı yenileyebilirsin
      // veya anasayfaya yönlendirebilirsin:
      // navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error updating player");
    }
  };

  // 4) DELETE butonuna basınca
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this player?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/players/${playerId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete player");
      }
      alert("Player deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting player");
    }
  };


  // Yeni bir appearance formu açmak için state
  const [newAppearance, setNewAppearance] = useState(null);

  const handleEditAppearance = (appearance) => {
    setNewAppearance(appearance);
  };

  const handleDeleteAppearance = async (appearanceId) => {
    if (window.confirm("Are you sure you want to delete this appearance?")) {
      try {
        const response = await fetch(`http://localhost:8080/appearances/${appearanceId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete appearance");
        }
        alert("Appearance deleted successfully!");
        // Appearances listesini güncelle
        setPlayerData((prevData) => ({
          ...prevData,
          appearances: prevData.appearances.filter((a) => a.appearance_id !== appearanceId),
        }));
      } catch (error) {
        console.error(error);
        alert("Error deleting appearance");
      }
    }
  };

  const handleAddAppearance = () => {
    setNewAppearance({
      appearance_id: "",
      game_id: "",
      competition_id: "",
      date: "",
      goals: 0,
      assists: 0,
      minutes_played: 0,
      yellow_cards: 0,
      red_cards: 0,
    });
  };

  // Yeni veya düzenlenmiş appearance'ı kaydet
  const saveAppearance = async (appearance) => {
    const method = appearance.appearance_id ? "PUT" : "POST";
    const url = appearance.appearance_id
      ? `http://localhost:8080/appearances/${appearance.appearance_id}`
      : `http://localhost:8080/appearances`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appearance),
      });

      if (!response.ok) {
        throw new Error("Failed to save appearance");
      }

      alert("Appearance saved successfully!");
      setNewAppearance(null);

      // GET isteği ile güncellenmiş listeyi alabilirsiniz veya state'i manuel güncelleyebilirsiniz.
    } catch (error) {
      console.error(error);
      alert("Error saving appearance");
    }
  };


  // Henüz veri çekilmediyse
  if (!playerData) {
    return <div className="player-detail-container">Loading...</div>;
  }

  return (
    <div className="player-detail-container">
      <h2>Player Detail</h2>

      {/* Sekme Butonları */}
      <div className="tab-buttons">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => handleTabChange("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "manage" ? "active" : ""}
          onClick={() => handleTabChange("manage")}
        >
          Update / Delete
        </button>
      </div>

      {/* OVERVIEW SEKME */}
      {activeTab === "overview" && (
        <div className="overview-tab">
          <div className="image-container">
            <img
              src={playerData.image_url}
              alt="Player"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          <div className="player-info">
            <h3>Player Information</h3>
            <p><strong>ID:</strong> {playerData.player_id}</p>
            <p><strong>Name:</strong> {playerData.first_name} {playerData.last_name}</p>
            <p><strong>Position:</strong> {playerData.position}</p>
            <p><strong>Foot:</strong> {playerData.foot}</p>
            <p><strong>Country of Citizenship:</strong> {playerData.country_of_citizenship}</p>
            <p><strong>Date of Birth:</strong> {playerData.date_of_birth}</p>
            <p>
              <strong>Contract Expiration:</strong>{" "}
              {playerData.contract_expiration_date || "N/A"}
            </p>
          </div>

          {/* Join edilmiş kulüp bilgileri */}
          <div className="club-info">
            <h3>Club Information</h3>
            <p><strong>Club ID:</strong> {playerData.club_id}</p>
            <p><strong>Club Name:</strong> {playerData.name}</p>
            <p><strong>Domestic Competition:</strong> {playerData.domestic_competition}</p>
            <p><strong>Stadium Name:</strong> {playerData.stadium_name}</p>
            <p><strong>Coach Name:</strong> {playerData.coach_name}</p>
          </div>
          <div className="appearances-section">
  <h3>Appearances</h3>
  {playerData.appearances && playerData.appearances.length > 0 ? (
    playerData.appearances.map((appearance) => (
      <div key={appearance.appearance_id} className="appearance-card">
        <p><strong>Date:</strong> {new Date(appearance.date).toLocaleDateString()}</p>
        <p><strong>Competition:</strong> {appearance.competition_id}</p>
        <p><strong>Goals:</strong> {appearance.goals}</p>
        <p><strong>Assists:</strong> {appearance.assists}</p>
        <p><strong>Red Card:</strong> {appearance.red_cards}</p>
        <p><strong>Yellow Card:</strong> {appearance.yellow_cards}</p>
        <div>
          <button
            className="edit-button"
            onClick={() => handleEditAppearance(appearance)}
          >
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDeleteAppearance(appearance.appearance_id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No appearances available.</p>
  )}
  <button className="add-appearance-button" onClick={handleAddAppearance}>
    Add Appearance
  </button>
</div>

        </div>
      )}

      {/* MANAGE SEKME */}
      {activeTab === "manage" && (
        <div className="manage-tab">
          <form onSubmit={handleUpdate} className="update-form">
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Player Code</label>
              <input
                type="text"
                name="player_code"
                value={formData.player_code}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Foot:</label>
              <select
                name="foot"
                value={formData.foot}
                onChange={handleChange}
              >
                <option value="NotIndicated">NotIndicated</option>
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
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>
            {/* Diğer tüm alanlar (agent_name, last_season vb.) */}
            <div>
              <label>Last Season:</label>
              <input
                type="number"
                name="last_season"
                value={formData.last_season}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Birth Date</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Current Club (id)</label>
              <input
                type="text"
                name="current_club_id"
                value={formData.current_club_id}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Update</button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </form>


        </div>

      )}
    </div>
  );
}

export default PlayerDetail;
