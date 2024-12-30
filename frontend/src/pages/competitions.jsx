import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/shared.css';

function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCompetitions = async () => {
    const response = await fetch("http://127.0.0.1:8080/competitions");
    const data = await response.json();
    setCompetitions(data.competitions);
    setFilteredCompetitions(data.competitions);
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const capitalizeWords = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const capitalizeType = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getCountryName = (country) => {
    return country ? country : "International";
  };

  const handleFilterChange = (e) => {
    const filterText = e.target.value;
    setFilter(filterText);
    const filtered = competitions.filter(
      (competition) =>
        capitalizeWords(competition.name).toLowerCase().includes(filterText.toLowerCase()) ||
        getCountryName(competition.country_name).toLowerCase().includes(filterText.toLowerCase()) ||
        competition.type.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredCompetitions(filtered);
    setPage(1); // Reset page to 1 when filter changes
  };

  const paginatedCompetitions = filteredCompetitions.slice((page - 1) * 20, page * 20);

  const calculateTotalPages = () => Math.ceil(filteredCompetitions.length / 20);

  useEffect(() => {
    setTotalPages(calculateTotalPages());
  }, [filteredCompetitions]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const navigate = useNavigate();

  const handleRowClick = (competition_id) => {
    navigate(`/competitions/${competition_id}`);
  };

  // Navigate to AddCompetitionPage
  const handleAddCompetitionClick = () => {
    navigate("/competitions/add");
  };

  return (
    <section>
      <div className="container">
        <h2>Competitions</h2>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter competitions..."
          value={filter}
          onChange={handleFilterChange}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Add Competition Button */}
        <div>
        <button
          onClick={handleAddCompetitionClick}
          className="add-button"
        >
          Add Competition
        </button>
        </div>

        {/* Competitions Table */}
        <table style={{ width: "100%", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "33%" }}>Name</th>
              <th style={{ width: "33%" }}>Type</th>
              <th style={{ width: "33%" }}>Country</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompetitions.map((competition) => (
              <tr
                key={competition.competition_id}
                onClick={() => handleRowClick(competition.competition_id)}
                style={{ cursor: "pointer" }}
              >
                <td>{capitalizeWords(competition.name)}</td>
                <td>{capitalizeType(competition.type)}</td>
                <td>{getCountryName(competition.country_name)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            {" "}
            Page {page} of {totalPages}{" "}
          </span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default CompetitionsPage;
