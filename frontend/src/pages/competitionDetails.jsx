import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function CompetitionDetailsPage() {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch competition details
  const fetchCompetition = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8080/competitions/${competitionId}`);
      const data = await response.json();
      setCompetition(data);
    } catch (error) {
      setError("Error fetching competition details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetition();
  }, [competitionId]);

  const handleDeleteCompetition = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this competition?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8080/competitions/${competitionId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Competition deleted successfully.");
        navigate("/competitions");
      } else {
        alert("Failed to delete competition.");
      }
    } catch (error) {
      alert("An error occurred while deleting the competition.");
    }
  };

  // Function to handle form submission (update competition)
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
        console.log(JSON.stringify(competition));
      const response = await fetch(`http://127.0.0.1:8080/competitions/${competitionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(competition),
      });

      if (response.ok) {
        alert("Competition updated successfully!");
        navigate("/competitions");
      } else {
        alert("Error updating competition");
      }
    } catch (error) {
      alert("Error updating competition");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { competition: competitionData, clubs } = competition;

  // Helper function to format the type by splitting and capitalizing
  const formatType = (type) => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to capitalize words and handle hyphen splitting for 'name'
  const capitalizeWords = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Filter out clubs with null or empty values
  const validClubs = clubs.filter(
    (club) => club.club_name != "null" && club.club_id && club.stadium_name
  );

  const handleInputChange = (field, value) => {
    setCompetition((prevCompetition) => ({
      ...prevCompetition,
      competition: {
        ...prevCompetition.competition,
        [field]: value,
      },
    }));
  };

  return (
    <section style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          {capitalizeWords(competitionData.name)}
        </h2>

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
            Edit/Delete
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div style={{ marginBottom: "2rem" }}>
            <h3>Competition Details</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "2rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <tbody>
                <tr>
                  <td style={tableCellStyle}>Competition ID:</td>
                  <td>{competitionData.competition_id}</td>
                </tr>
                <tr>
                  <td style={tableCellStyle}>Type:</td>
                  <td>{formatType(competitionData.type)}</td>
                </tr>
                <tr>
                  <td style={tableCellStyle}>Country:</td>
                  <td>{competitionData.country_name || "International"}</td>
                </tr>
                <tr>
                  <td style={tableCellStyle}>Confederation:</td>
                  <td>{competitionData.confederation.charAt(0).toUpperCase() + competitionData.confederation.slice(1).toLowerCase()}</td>
                </tr>
                <tr>
                  <td style={tableCellStyle}>URL:</td>
                  <td>
                    <a href={competitionData.url} target="_blank" rel="noopener noreferrer">
                      {competitionData.url}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Clubs Section */}
            {validClubs.length > 0 && (
              <div>
                <h3>Clubs in this Competition</h3>
                <div style={clubsContainerStyle}>
                  {validClubs.map((club, index) => (
                    <Link
                      key={index}
                      to={`/clubs/${club.club_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div style={clubCardStyle}>
                        <h4 style={clubNameStyle}>{club.club_name}</h4>
                        <p style={stadiumNameStyle}>Stadium: {club.stadium_name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit/Delete Tab */}
        {activeTab === "edit-delete" && (
          <div className="edit-delete-tab">
            <form onSubmit={handleEdit} style={styles.form}>
              <input
                type="text"
                value={competitionData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder={competitionData.name || "Competition Name"}
                style={styles.input}
              />
              <input
                type="text"
                value={competitionData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                placeholder={competitionData.type || "Type"}
                style={styles.input}
              />
              <input
                type="text"
                value={competitionData.country_name}
                onChange={(e) => handleInputChange("country_name", e.target.value)}
                placeholder={competitionData.country_name || "Country"}
                style={styles.input}
              />
              <input
                type="text"
                value={competitionData.confederation}
                onChange={(e) => handleInputChange("confederation", e.target.value)}
                placeholder={competitionData.confederation || "Confederation"}
                style={styles.input}
              />
              <input
                type="text"
                value={competitionData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                placeholder={competitionData.url || "URL"}
                style={styles.input}
              />

              <button type="submit" style={styles.submitButton}>
                Update Competition
              </button>
            </form>
            <button onClick={handleDeleteCompetition} className="delete-button" style={styles.deleteButton}>
              Delete Competition
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Styling for table cells and headers
const tableCellStyle = {
padding: "8px 12px",
border: "1px solid #ddd",
};

const tableHeaderStyle = {
padding: "12px 15px",
backgroundColor: "#f4f4f4",
border: "1px solid #ddd",
textAlign: "left",
};

// New styles for club cards with consistent sizes
const clubsContainerStyle = {
display: "grid",  // Using grid layout for better control over card placement
gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", // Responsive grid
gap: "1rem", // Spacing between cards
justifyItems: "center", // Center items in grid cells
};

const clubCardStyle = {
backgroundColor: "#fff",
boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
borderRadius: "8px",
padding: "1.5rem",  // Increase padding for better spacing
textAlign: "center",
transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
display: "flex",  // Use flexbox to ensure content is centered
flexDirection: "column",  // Stack elements vertically
justifyContent: "space-between",  // Distribute content evenly inside the card
height: "140px",  // Set a fixed height for all cards
width: "240px",
};

const clubCardHoverStyle = {
transform: "scale(1.05)", // Scale up the card slightly on hover
boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
};

const clubNameStyle = {
fontSize: "1.4rem",
fontWeight: "bold",
marginBottom: "0.5rem",
};

const stadiumNameStyle = {
fontSize: "1.1rem",
color: "#555",
};

// Hover effect styles
clubCardStyle[':hover'] = clubCardHoverStyle;


// Styles for the edit/delete form and buttons
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "10px 15px",
    backgroundColor: "#FF5722",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default CompetitionDetailsPage;
