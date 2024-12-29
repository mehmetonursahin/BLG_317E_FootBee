// PlayersPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlayersPage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  // Fetch players data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/players?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlayers(data.players || []);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setPlayers([]);
      }
    };

    fetchPlayers();
  }, [currentPage]);


  // Filtered players based on input
  const filteredPlayers = players.filter(
    (player) =>
      (player.name || "").toLowerCase().includes(filter.toLowerCase()) ||
      (player.position || "").toLowerCase().includes(filter.toLowerCase()) ||
      (player.club || "").toLowerCase().includes(filter.toLowerCase()) ||
      (player.nationality || "").toLowerCase().includes(filter.toLowerCase())
  );

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "Null";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <section>
      <div className="container">
        <h2>Players</h2>

        <button
          onClick={() => navigate("/add")}
          style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
        >
          Add Player
        </button>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter players..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            display: "block",
          }}
        />

        {/* Players Table */}
        <table>
          <thead>
            <tr>
              <th>player_id</th>
              <th>Name</th>
              <th>Position</th>
              <th>Age</th>
              <th>Club</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr
                key={player.player_id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/player/${player.player_id}`)}
              >
                <td>{player.player_id}</td>
                <td>
                  {player.first_name || null} {player.last_name || null}
                </td>
                <td>{player.position || "N/A"}</td>
                <td>{calculateAge(player.date_of_birth)}</td>
                <td>{player.name || "N/A"}</td>
                <td>{player.country_of_citizenship || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ marginRight: "1rem" }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ marginLeft: "1rem" }}
          >
            Next
          </button>
        </div>

      </div>
    </section>
  );
}

export default PlayersPage;
