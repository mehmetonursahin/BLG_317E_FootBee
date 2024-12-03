import React, { useState, useEffect } from 'react';

function GamesPage() {
  // State for games and filter
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch games data (replace with actual API call)
  useEffect(() => {
    // Example game data
    const fetchGames = async () => {
      const data = [
        { id: 1, home: "Team A", away: "Team B", score: "2-1", date: "2024-12-01" },
        { id: 2, home: "Team C", away: "Team D", score: "0-0", date: "2024-12-02" },
        { id: 3, home: "Team E", away: "Team F", score: "3-2", date: "2024-12-03" },
        // Add more data as needed
      ];
      setGames(data);
    };
    fetchGames();
  }, []);

  // Filtered games based on input
  const filteredGames = games.filter(
    game =>
      game.home.toLowerCase().includes(filter.toLowerCase()) ||
      game.away.toLowerCase().includes(filter.toLowerCase()) ||
      game.date.includes(filter)
  );

  return (
    <section>
      <div className="container">
        <h2>Games</h2>
        
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter games..."
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

        {/* Games Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.home}</td>
                <td>{game.away}</td>
                <td>{game.score}</td>
                <td>{game.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default GamesPage;
