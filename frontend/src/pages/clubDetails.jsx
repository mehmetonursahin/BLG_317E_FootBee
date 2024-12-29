import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/clubDetails.css";

function ClubDetailsPage() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchClubDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8080/clubs/${clubId}`);
        const data = await response.json();

        if (data.club) {
          setClub(data.club);
          setPlayers(data.players);
        } else {
          setError("Club not found");
        }
      } catch (err) {
        setError("Error fetching club details");
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubId]);

  const handleDeleteClub = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this club?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8080/clubs/${clubId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Club deleted successfully.");
        navigate("/clubs");
      } else {
        alert("Failed to delete club.");
      }
    } catch (error) {
      alert("An error occurred while deleting the club.");
    }
  };

  // Function to handle form submission (update club)
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8080/clubs/${clubId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(club),
      });

      if (response.ok) {
        alert("Club updated successfully!");
        navigate("/clubs"); // Redirect to clubs list
      } else {
        alert("Error updating club");
      }
    } catch (error) {
      console.error("Error updating club:", error);
      alert("Error updating club");
    }
  };

  const leagueNames = {
    L1: "Bundesliga 1",
    IT1: "Serie A",
    GB1: "English Premier League",
    TR1: "Turkish Super Lig",
    ES1: "La Liga",
    BE1: "Belgian Pro League",
    SC1: "Scottish Premiership",
    FR1: "Ligue 1",
    RU1: "Russian Premier League",
    GR1: "Super League Greece",
    NL1: "Eredivisie",
    DK1: "Danish Superliga",
    PO1: "Liga Portugal",
    UKR1: "Ukrainian Premier League",
  };

  const getLeagueName = (abbreviation) => leagueNames[abbreviation] || abbreviation;

  const groupPlayersByPosition = (players) => {
    const positions = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Forward: [],
      Other: [],
    };

    players.forEach((player) => {
      if (player.position.includes("Goalkeeper")) {
        positions.Goalkeeper.push(player);
      } else if (player.position.includes("Defender")) {
        positions.Defender.push(player);
      } else if (player.position.includes("Midfield")) {
        positions.Midfielder.push(player);
      } else if (player.position.includes("Attack")) {
        positions.Forward.push(player);
      } else {
        positions.Other.push(player);
      }
    });

    return positions;
  };

  const groupedPlayers = groupPlayersByPosition(players);

  if (loading) {
    return <div className="player-detail-container">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="club-detail-container">
      <h2>Club Detail</h2>

      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "edit-delete" ? "active" : ""}
          onClick={() => setActiveTab("edit-delete")}
        >
          Update/Delete
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="overview-tab">
          <div className="club-info">
            <h3>{club.name}</h3>
            <p><strong>League:</strong> {getLeagueName(club.domestic_competition) || "N/A"}</p>
            <p><strong>Total Market Value:</strong> {club.total_market_value || "N/A"}</p>
            <p><strong>Squad Size:</strong> {club.squad_size || "N/A"}</p>
            <p><strong>Average Age:</strong> {club.average_age || "N/A"}</p>
            <p><strong>Foreigners Number:</strong> {club.foreigners_number || "N/A"}</p>
            <p><strong>Foreigners Percentage:</strong> {club.foreigners_percent || "N/A"}</p>
            <p><strong>National Team Players:</strong> {club.national_team_players || "N/A"}</p>
            <p><strong>Stadium Name:</strong> {club.stadium_name || "N/A"}</p>
            <p><strong>Stadium Seats:</strong> {club.stadium_seats || "N/A"}</p>
            <p><strong>Net Transfer Record:</strong> {club.net_transfer_record || "N/A"}</p>
            <p><strong>Coach:</strong> {club.coach_name || "N/A"}</p>
            <p><strong>Website:</strong> <a href={club.club_url} target="_blank" rel="noopener noreferrer">{club.club_url}</a></p>
          </div>

          {/* Players Section */}
          <div className="players-section">
            <h3>Players</h3>

            {Object.keys(groupedPlayers).map((position) => (
              groupedPlayers[position].length > 0 && (
                <div key={position} className="players-position-group">
                  <h4>{position}</h4>
                  <div className="players-grid">
                    {groupedPlayers[position].map((player) => (
                      <div className="player-card" key={player.player_id}>
                        <img className="player-image" src={player.image_url} alt={`${player.first_name} ${player.last_name}`} />
                        <div className="player-info">
                          <strong>{player.first_name} {player.last_name}</strong> <br />
                          <span>{player.position}</span> <br />
                          <a className="player-profile-link" href={`http://localhost:3000/player/${player.player_id}`} target="_blank" rel="noopener noreferrer">
                            Player Profile
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}

            {players.length === 0 && <p>No players found for this club.</p>}
          </div>
        </div>
      )}

      {/* Edit/Delete Tab */}
      {activeTab === "edit-delete" && (
        <div className="edit-delete-tab">
            <form onSubmit={handleEdit} style={styles.form}>
            <input
              type="text"
              value={club.name}
              onChange={(e) => setClub({ ...club, name: e.target.value })}
              placeholder={club.name || "Club Name"}
              required
              style={styles.input}
            />
            <input
              type="text"
              value={club.domestic_competition}
              onChange={(e) => setClub({ ...club, domestic_competition: e.target.value })}
              placeholder={club.domestic_competition || "League"}
              required
              style={styles.input}
            />
            <input
              type="text"
              value={club.stadium_name}
              onChange={(e) => setClub({ ...club, stadium_name: e.target.value })}
              placeholder={club.stadium_name || "Stadium"}
              required
              style={styles.input}
            />
            <input
              type="text"
              value={club.total_market_value}
              onChange={(e) => setClub({ ...club, total_market_value: e.target.value })}
              placeholder={club.total_market_value || "Total Market Value"}
              style={styles.input}
            />
            <input
              type="number"
              value={club.squad_size}
              onChange={(e) => setClub({ ...club, squad_size: e.target.value })}
              placeholder={club.squad_size || "Squad Size"}
              style={styles.input}
            />
            <input
              type="number"
              value={club.average_age}
              onChange={(e) => setClub({ ...club, average_age: e.target.value })}
              placeholder={club.average_age || "Average Age"}
              style={styles.input}
            />
            <input
              type="number"
              value={club.foreigners_number}
              onChange={(e) => setClub({ ...club, foreigners_number: e.target.value })}
              placeholder={club.foreigners_number || "Number of Foreign Players"}
              style={styles.input}
            />
            <input
              type="number"
              value={club.foreigners_percent}
              onChange={(e) => setClub({ ...club, foreigners_percent: e.target.value })}
              placeholder={club.foreigners_percent || "Foreign Players Percentage"}
              style={styles.input}
            />
            <input
              type="number"
              value={club.national_team_players}
              onChange={(e) => setClub({ ...club, national_team_players: e.target.value })}
              placeholder={club.national_team_players || "National Team Players"}
              style={styles.input}
            />
            <input
              type="number"
              value={club.stadium_seats}
              onChange={(e) => setClub({ ...club, stadium_seats: e.target.value })}
              placeholder={club.stadium_seats || "Stadium Seats"}
              style={styles.input}
            />
            <input
              type="text"
              value={club.net_transfer_record}
              onChange={(e) => setClub({ ...club, net_transfer_record: e.target.value })}
              placeholder={club.net_transfer_record || "Net Transfer Record"}
              style={styles.input}
            />
            <input
              type="text"
              value={club.coach_name}
              onChange={(e) => setClub({ ...club, coach_name: e.target.value })}
              placeholder={club.coach_name || "Coach Name"}
              style={styles.input}
            />
            <input
              type="text"
              value={club.url}
              onChange={(e) => setClub({ ...club, url: e.target.value })}
              placeholder={club.url || "URL"}
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>Update Club</button>
          </form>
          <button onClick={handleDeleteClub} className="delete-button" style={styles.deleteButton}>Delete Club</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center", // Centers the heading
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    padding: "0.8rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "20px",
  },
};

export default ClubDetailsPage;
