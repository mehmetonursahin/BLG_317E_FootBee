import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddClubPage() {
  const [club, setClub] = useState({
    club_id: "",
    club_code: "",
    name: "",
    domestic_competition: "",
    total_market_value: "",
    squad_size: "",
    average_age: "",
    foreigners_number: "",
    foreigners_percent: "",
    national_team_players: "",
    stadium_name: "",
    stadium_seats: "",
    net_transfer_record: "",
    coach_name: "",
    url: "",
  });

  const navigate = useNavigate();

  // Function to handle form submission (add club)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(club);
      const response = await fetch("http://127.0.0.1:8080/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(club),
      });

      if (response.ok) {
        alert("Club added successfully!");
        navigate("/clubs"); // Redirect to the clubs list page
      } else {
        alert("Error adding club");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding club");
    }
  };

  return (
    <div className="container">
        <div>
      <h2 style={styles.heading}>Add Club</h2>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label>Club Name</label>
          <input
            type="text"
            placeholder="Club Name"
            value={club.name}
            onChange={(e) => setClub({ ...club, name: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Club Code</label>
          <input
            type="text"
            placeholder="Club Code"
            value={club.club_code}
            onChange={(e) => setClub({ ...club, club_code: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Competition</label>
          <input
            type="text"
            placeholder="Competition"
            value={club.domestic_competition}
            onChange={(e) => setClub({ ...club, domestic_competition: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Market Value</label>
          <input
            type="text"
            placeholder="Total Market Value"
            value={club.total_market_value}
            onChange={(e) => setClub({ ...club, total_market_value: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Squad Size</label>
          <input
            type="number"
            placeholder="Squad Size"
            value={club.squad_size}
            onChange={(e) => setClub({ ...club, squad_size: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Average Age</label>
          <input
            type="number"
            placeholder="Average Age"
            value={club.average_age}
            onChange={(e) => setClub({ ...club, average_age: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Number of Foreign Players</label>
          <input
            type="number"
            placeholder="Foreign Players"
            value={club.foreigners_number}
            onChange={(e) => setClub({ ...club, foreigners_number: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Foreigners Percent</label>
          <input
            type="number"
            placeholder="Foreigners Percent"
            value={club.foreigners_percent}
            onChange={(e) => setClub({ ...club, foreigners_percent: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>National Team Players</label>
          <input
            type="number"
            placeholder="National Team Players"
            value={club.national_team_players}
            onChange={(e) => setClub({ ...club, national_team_players: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Stadium Name</label>
          <input
            type="text"
            placeholder="Stadium Name"
            value={club.stadium_name}
            onChange={(e) => setClub({ ...club, stadium_name: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Stadium Seats</label>
          <input
            type="number"
            placeholder="Stadium Seats"
            value={club.stadium_seats}
            onChange={(e) => setClub({ ...club, stadium_seats: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Net Transfer Record</label>
          <input
            type="text"
            placeholder="Net Transfer Record"
            value={club.net_transfer_record}
            onChange={(e) => setClub({ ...club, net_transfer_record: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Coach Name</label>
          <input
            type="text"
            placeholder="Coach Name"
            value={club.coach_name}
            onChange={(e) => setClub({ ...club, coach_name: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>URL</label>
          <input
            type="text"
            placeholder="Club URL"
            value={club.url}
            onChange={(e) => setClub({ ...club, url: e.target.value })}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Add Club</button>
      </form>
    </div>
  );
}

const styles = {
    heading: {
        textAlign: "center", // This will center the text horizontally
        marginBottom: "20px", // Optional: To add some space below the heading
        },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f4f4f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
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
  },
};

export default AddClubPage;
