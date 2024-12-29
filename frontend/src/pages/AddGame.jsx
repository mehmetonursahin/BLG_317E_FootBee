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
  const [game, setGame] = useState(defaultGamePlaceholder);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
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
    <div className="container">
      <h2> Create Game </h2>
      <div className="edit-delete-tab">
      <form onSubmit={handleSubmit} style={styles.form}>
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
          onChange={(e) => setGame({ ...game, away_club_id: e.target.value })}
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
          placeholder={game.away_club_manager_name || "Away club Manager Name"}
          style={styles.input}
          required
        />

        <input
          type="text"
          value={game.away_club_name}
          onChange={(e) => setGame({ ...game, away_club_name: e.target.value })}
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
          onChange={(e) => setGame({ ...game, competition_id: e.target.value })}
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
          onChange={(e) => setGame({ ...game, home_club_id: e.target.value })}
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
          placeholder={game.home_club_manager_name || "Home club Manager Name"}
          style={styles.input}
          required
        />

        <input
          type="text"
          value={game.home_club_name}
          onChange={(e) => setGame({ ...game, home_club_name: e.target.value })}
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
          Create Game
        </button>
      </form>
    </div>
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
export default AddGame;
