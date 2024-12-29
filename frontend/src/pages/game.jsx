import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/clubDetails.css";
import "../styles/GamePage.css";
import GameEvents from "../components/GameEvents";
const GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [gameEvents, setGameEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const fetchGameData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8080/games/${gameId}`);
      const data = await response.json();
      const game = data.game;
      game.date = new Date(game.date).toISOString().split("T")[0];
      setGame(game);
      setGameEvents(data.game_events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!gameId) return;

    fetchGameData();
  }, [gameId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleDeleteGame = async (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://127.0.0.1:8080/games/${gameId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Game deleted successfully.");
        navigate("/games");
      } else {
        alert("Failed to delete game.");
      }
    } catch (error) {
      alert("An error occurred while deleting the game.");
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8080/games/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });

      if (response.ok) {
        alert("Game updated successfully!");
        navigate("/games");
      } else {
        alert("Error updating game");
      }
    } catch (error) {
      console.error("Error updating game:", error);
      alert("Error updating game");
    }
  };
  return (
    <div className="container">
      <h1>Game Detail</h1>
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

      {activeTab === "overview" && game && (
        <div className="wrapper">
          <div className="game-details">
            <h1>
              {game.home_club_name} <span>vs</span> {game.away_club_name}
            </h1>
            <p>
              <strong>Competition:</strong> {game.competition_id} (
              {game.competition_type.trim()})
            </p>
            <p>
              <strong>Date:</strong> {game.date}
            </p>
            <p>
              <strong>Score:</strong> {game.home_club_goals} -{" "}
              {game.away_club_goals} (Aggregate: {game.aggregate})
            </p>
            <p>
              <strong>Attendance:</strong> {game.attendance}
            </p>
            <p>
              <strong>Venue:</strong> {game.stadium}
            </p>
            <p>
              <strong>Referee:</strong> {game.referee}
            </p>
            <p>
              <strong>Round:</strong> {game.round}
            </p>
            <p>
              <strong>Season:</strong> {game.season}
            </p>
            <h2>Home Club</h2>
            <p>
              <strong>Name:</strong> {game.home_club_name}
            </p>
            <p>
              <strong>Manager:</strong> {game.home_club_manager_name}
            </p>
            <p>
              <strong>Position:</strong> {game.home_club_position}
            </p>
            <h2>Away Club</h2>
            <p>
              <strong>Name:</strong> {game.away_club_name}
            </p>
            <p>
              <strong>Manager:</strong> {game.away_club_manager_name}
            </p>
            <p>
              <strong>Position:</strong> {game.away_club_position}
            </p>
            <p>
              <strong>Match Report:</strong>{" "}
              <a href={game.url} target="_blank" rel="noopener noreferrer">
                View Report
              </a>
            </p>
          </div>

          <GameEvents events={gameEvents} game={game}></GameEvents>
        </div>
      )}
      {/* Edit/Delete Tab */}
      {activeTab === "edit-delete" && (
        <div className="edit-delete-tab">
          <form onSubmit={handleEdit} style={styles.form}>
            <input
              type="text"
              value={game.aggregate}
              onChange={(e) => setGame({ ...game, aggregate: e.target.value })}
              placeholder={game.aggregate || "Aggregate"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.attendance}
              onChange={(e) => setGame({ ...game, attendance: e.target.value })}
              placeholder={game.attendance || "Attendance"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.away_club_goals}
              onChange={(e) =>
                setGame({ ...game, away_club_goals: e.target.value })
              }
              placeholder={game.away_club_goals || "Away club Goals"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.away_club_id}
              onChange={(e) =>
                setGame({ ...game, away_club_id: e.target.value })
              }
              placeholder={game.away_club_id || "Away club ID"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.away_club_manager_name}
              onChange={(e) =>
                setGame({ ...game, away_club_manager_name: e.target.value })
              }
              placeholder={
                game.away_club_manager_name || "Away club Manager Name"
              }
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.away_club_name}
              onChange={(e) =>
                setGame({ ...game, away_club_name: e.target.value })
              }
              placeholder={game.away_club_name || "Away club Name"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.away_club_position}
              onChange={(e) =>
                setGame({ ...game, away_club_position: e.target.value })
              }
              placeholder={game.away_club_position || "Away club Position"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.competition_id}
              onChange={(e) =>
                setGame({ ...game, competition_id: e.target.value })
              }
              placeholder={game.competition_id || "Competition ID"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.competition_type}
              onChange={(e) =>
                setGame({ ...game, competition_type: e.target.value })
              }
              placeholder={game.competition_type || "Competition Type"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.date}
              onChange={(e) => setGame({ ...game, date: e.target.value })}
              placeholder={game.date || "Date"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.game_id}
              onChange={(e) => setGame({ ...game, game_id: e.target.value })}
              placeholder={game.game_id || "Game ID"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.home_club_goals}
              onChange={(e) =>
                setGame({ ...game, home_club_goals: e.target.value })
              }
              placeholder={game.home_club_goals || "Home club Goals"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.home_club_id}
              onChange={(e) =>
                setGame({ ...game, home_club_id: e.target.value })
              }
              placeholder={game.home_club_id || "Home club ID"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.home_club_manager_name}
              onChange={(e) =>
                setGame({ ...game, home_club_manager_name: e.target.value })
              }
              placeholder={
                game.home_club_manager_name || "Home club Manager Name"
              }
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.home_club_name}
              onChange={(e) =>
                setGame({ ...game, home_club_name: e.target.value })
              }
              placeholder={game.home_club_name || "Home club Name"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.home_club_position}
              onChange={(e) =>
                setGame({ ...game, home_club_position: e.target.value })
              }
              placeholder={game.home_club_position || "Home club Position"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.referee}
              onChange={(e) => setGame({ ...game, referee: e.target.value })}
              placeholder={game.referee || "Referee"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.round}
              onChange={(e) => setGame({ ...game, round: e.target.value })}
              placeholder={game.round || "Round"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.season}
              onChange={(e) => setGame({ ...game, season: e.target.value })}
              placeholder={game.season || "Season"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.stadium}
              onChange={(e) => setGame({ ...game, stadium: e.target.value })}
              placeholder={game.stadium || "Stadium"}
              style={styles.input}
              required
            />

            <input
              type="text"
              value={game.url}
              onChange={(e) => setGame({ ...game, url: e.target.value })}
              placeholder={game.url || "URL"}
              style={styles.input}
              required
            />

            <button type="submit" style={styles.submitButton}>
              Update Game
            </button>
            <button onClick={handleDeleteGame} style={styles.cancelButton}>
              Delete Game
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
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
    flexWrap: "wrap",
    maxHeight: "800px",
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
  cancelButton: {
    padding: "0.8rem",
    backgroundColor: "#f22",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "20px",
  },
};
export default GamePage;
