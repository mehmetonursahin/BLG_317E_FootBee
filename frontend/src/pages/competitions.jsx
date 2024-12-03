import React, { useState, useEffect } from 'react';

function CompetitionsPage() {
  // State for competitions and filter
  const [competitions, setCompetitions] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch competitions data (replace with actual API call)
  useEffect(() => {
    // Example competition data
    const fetchCompetitions = async () => {
      const data = [
        { id: 1, name: "Premier League", country: "England", type: "League" },
        { id: 2, name: "La Liga", country: "Spain", type: "League" },
        { id: 3, name: "Champions League", country: "Europe", type: "Cup" },
        // Add more data as needed
      ];
      setCompetitions(data);
    };
    fetchCompetitions();
  }, []);

  // Filtered competitions based on input
  const filteredCompetitions = competitions.filter(
    competition =>
      competition.name.toLowerCase().includes(filter.toLowerCase()) ||
      competition.country.toLowerCase().includes(filter.toLowerCase()) ||
      competition.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section>
      <div className="container">
        <h2>Competitions</h2>
        
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter competitions..."
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

        {/* Competitions Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompetitions.map((competition) => (
              <tr key={competition.id}>
                <td>{competition.id}</td>
                <td>{competition.name}</td>
                <td>{competition.country}</td>
                <td>{competition.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CompetitionsPage;
