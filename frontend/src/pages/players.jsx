import React, { useState, useEffect } from "react";

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch players data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/players");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlayers(data.players || []); // Hata durumunda boş array sağlar
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setPlayers([]); // Hata durumunda boş array ata
      }
    };

    fetchPlayers();
  }, []);

  // Filtered players based on input
  const filteredPlayers = players.filter(
    (player) =>
      (player.name || "").toLowerCase().includes(filter.toLowerCase()) || // Varsayılan değer
      (player.position || "").toLowerCase().includes(filter.toLowerCase()) ||
      (player.club || "").toLowerCase().includes(filter.toLowerCase()) ||
      (player.nationality || "").toLowerCase().includes(filter.toLowerCase())
  );

  const calculateAge = (dateOfBirth) => {
   if (!dateOfBirth) return "Null"; // Eğer doğum tarihi yoksa
   const birthDate = new Date(dateOfBirth);
   const today = new Date();
   let age = today.getFullYear() - birthDate.getFullYear();
   const monthDifference = today.getMonth() - birthDate.getMonth();
   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
     age--; // Eğer doğum gününü henüz kutlamadıysa, yaşı bir azalt
   }
   return age;
 };

  return (
    <section>
      <div className="container">
        <h2>Players</h2>

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
          }}
        />

        {/* Players Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Age</th>
              <th>Club</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.first_name || null} {player.last_name || null}</td>
                <td>{player.position || "N/A"}</td>
                <td>{calculateAge(player.date_of_birth)}</td>
                <td>{player.club || "N/A"}</td>
                <td>{player.nationality || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PlayersPage;
