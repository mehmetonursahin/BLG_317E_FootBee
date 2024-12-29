import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCompetitionPage() {
  const [competition, setCompetition] = useState({
    competition_id: "",
    competition_code: "",
    name: "",
    sub_type: "",
    type: "",
    country_name: "",
    domestic_league_code: "",
    confederation: "",
    url: "",
  });

  const navigate = useNavigate();

  // Function to handle form submission (add competition)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(competition);
      const response = await fetch("http://127.0.0.1:8080/competitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(competition),
      });

      if (response.ok) {
        alert("Competition added successfully!");
        navigate("/competitions"); // Redirect to the competitions list page
      } else {
        alert("Error adding competition");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding competition");
    }
  };

  return (
    <div className="container">
      <h2 style={styles.heading}>Add Competition</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label>Competition ID</label>
          <input
            type="text"
            placeholder="Competition ID"
            value={competition.competition_id}
            onChange={(e) => setCompetition({ ...competition, competition_id: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Competition Code</label>
          <input
            type="text"
            placeholder="Competition Code"
            value={competition.competition_code}
            onChange={(e) => setCompetition({ ...competition, competition_code: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Competition Name</label>
          <input
            type="text"
            placeholder="Competition Name"
            value={competition.name}
            onChange={(e) => setCompetition({ ...competition, name: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Sub Type</label>
          <input
            type="text"
            placeholder="Sub Type"
            value={competition.sub_type}
            onChange={(e) => setCompetition({ ...competition, sub_type: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Type</label>
          <input
            type="text"
            placeholder="Type"
            value={competition.type}
            onChange={(e) => setCompetition({ ...competition, type: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Country Name</label>
          <input
            type="text"
            placeholder="Country Name"
            value={competition.country_name}
            onChange={(e) => setCompetition({ ...competition, country_name: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Domestic League Code</label>
          <input
            type="text"
            placeholder="Domestic League Code"
            value={competition.domestic_league_code}
            onChange={(e) => setCompetition({ ...competition, domestic_league_code: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>Confederation</label>
          <input
            type="text"
            placeholder="Confederation"
            value={competition.confederation}
            onChange={(e) => setCompetition({ ...competition, confederation: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputContainer}>
          <label>URL</label>
          <input
            type="text"
            placeholder="Competition URL"
            value={competition.url}
            onChange={(e) => setCompetition({ ...competition, url: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Add Competition</button>
      </form>
    </div>
  );
}

const styles = {
  heading: {
    textAlign: "center",
    marginBottom: "20px",
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

export default AddCompetitionPage;
