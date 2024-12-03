import React, { useState, useEffect } from 'react';

function PlayersPage() {
  // State for players and filter
  const [players, setPlayers] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch players data (replace with actual API call)
  useEffect(() => {
    // Example player data
    const fetchPlayers = async () => {
      const data = [
        { id: 1, name: "Lionel Messi", position: "Forward", age: 36, club: "Inter Miami", nationality: "Argentina" },
        { id: 2, name: "Cristiano Ronaldo", position: "Forward", age: 38, club: "Al-Nassr", nationality: "Portugal" },
        { id: 3, name: "Kylian Mbappé", position: "Forward", age: 24, club: "Paris Saint-Germain", nationality: "France" },
        // Add more data as needed
      ];
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  // Filtered players based on input
  const filteredPlayers = players.filter(
    player =>
      player.name.toLowerCase().includes(filter.toLowerCase()) ||
      player.position.toLowerCase().includes(filter.toLowerCase()) ||
      player.club.toLowerCase().includes(filter.toLowerCase()) ||
      player.nationality.toLowerCase().includes(filter.toLowerCase())
  );

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
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.age}</td>
                <td>{player.club}</td>
                <td>{player.nationality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PlayersPage;
