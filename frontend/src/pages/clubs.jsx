import React, { useState, useEffect } from "react";

function ClubsPage() {
  // State for clubs data and filter
  const [clubs, setClubs] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch clubs data (replace with actual API call)
  useEffect(() => {
    // Replace this with an actual API call
    const fetchClubs = async () => {
      const response = await fetch("http://127.0.0.1:8080/clubs");
      const data = await response.json();
      setClubs(data.clubs);
    };
    
    fetchClubs();
  }, []);

  // Filtered clubs based on input
  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(filter.toLowerCase()) ||
      club.domestic_competition.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section>
      <div className="container">
        <h2>Clubs</h2>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter clubs..."
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

        {/* Clubs Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Competition</th>
              <th>Average Age</th>
              <th>Squad Size</th>
              <th>Stadium</th>
              <th>Transfer Record</th>
            </tr>
          </thead>
          <tbody>
            {filteredClubs.map((club) => (
              <tr key={club.club_id}>
                <td>{club.club_id}</td>
                <td>
                  <a href={club.url} target="_blank" rel="noopener noreferrer">
                    {club.name}
                  </a>
                </td>
                <td>{club.domestic_competition}</td>
                <td>{club.average_age}</td>
                <td>{club.squad_size}</td>
                <td>{club.stadium_name}</td>
                <td>{club.net_transfer_record}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ClubsPage;
