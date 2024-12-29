import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditClubPage() {
  const [club, setClub] = useState({
    name: "",
    domestic_competition: "",
    stadium_name: "",
    total_market_value: "",
    squad_size: "",
    average_age: "",
    foreigners_number: "",
    foreigners_percent: "",
    national_team_players: "",
    stadium_seats: "",
    net_transfer_record: "",
    coach_name: "",
    url: "",
  });

  const { clubId } = useParams(); // Get club_id from the URL
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch club data for editing
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/clubs/${clubId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch club data");
        }
        const data = await response.json();
        setClub(data["club"]); // Set club state with fetched data
      } catch (error) {
        console.error("Error fetching club:", error);
      }
    };
    fetchClub();
  }, [clubId]);

  // Function to handle form submission (update club)
  const handleSubmit = async (e) => {
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

  return (
    <div className="container" style={styles.container}>
      <h2 style={styles.heading}>Edit Club</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
          placeholder={club.domestic_competition || "Competition"}
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
    </div>
  );
}

// Add styles
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

export default EditClubPage;
