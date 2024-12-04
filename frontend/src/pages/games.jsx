import React, { useState, useEffect } from "react";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch("http://127.0.0.1:8080/games");
      const data = await response.json();
      setGames(data.games);
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter(
   (game) =>
     (game.home || "").toLowerCase().includes(filter.toLowerCase()) || // Varsayılan değer
     (game.away || "").toLowerCase().includes(filter.toLowerCase()) ||
     (game.date || "").includes(filter)
 );
 

  return (
    <section>
      <div className="container">
        <h2>Games</h2>

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
