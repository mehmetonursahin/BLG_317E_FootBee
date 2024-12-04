import React, { useState, useEffect } from "react";

function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCompetitions = async () => {
      const response = await fetch("http://127.0.0.1:8080/competitions");
      const data = await response.json();
      setCompetitions(data.competitions);
    };

    fetchCompetitions();
  }, []);

  const filteredCompetitions = competitions.filter(
    (competition) =>
      competition.name.toLowerCase().includes(filter.toLowerCase()) ||
      competition.country.toLowerCase().includes(filter.toLowerCase()) ||
      competition.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section>
      <div className="container">
        <h2>Competitions</h2>

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
