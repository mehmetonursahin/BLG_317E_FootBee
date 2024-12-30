import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/clubs.css';
import '../styles/shared.css';

function ClubsPage() {
  // State for clubs data, filter, and pagination
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Function to fetch clubs data
  const fetchClubs = async () => {
    const response = await fetch(`http://127.0.0.1:8080/clubs`);
    const data = await response.json();
    setClubs(data.clubs);
    setFilteredClubs(data.clubs);
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleFilterChange = (e) => {
    const filterText = e.target.value.toLowerCase();
    setFilter(filterText);
    
    const filtered = clubs.filter((club) => {
      return (
        club.name?.toLowerCase().includes(filterText) ||
        club.stadium_name?.toLowerCase().includes(filterText)
      );
    });
    
    setFilteredClubs(filtered);
    setPage(1); // Reset to first page when filtering
  };

  const paginatedClubs = filteredClubs
    .sort((a, b) => {
      if (!sortField) return 0;
      
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle null values
      if (aValue === null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === null) return sortDirection === 'asc' ? -1 : 1;
      
      // Convert to strings for string comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    })
    .slice((page - 1) * 20, page * 20);

  const calculateTotalPages = () => Math.ceil(filteredClubs.length / 20);

  useEffect(() => {
    setTotalPages(calculateTotalPages());
  }, [filteredClubs]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const navigate = useNavigate();

  const handleRowClick = (club_id) => {
    navigate(`/clubs/${club_id}`);
  };

  const leagueNames = {
    L1: "Bundesliga 1",
    IT1: "Serie A",
    GB1: "English Premier League",
    TR1: "Turkish Super Lig",
    ES1: "La Liga",
    BE1: "Belgian Pro League",
    SC1: "Scottish Premiership",
    FR1: "Ligue 1",
    RU1: "Russian Premier League",
    GR1: "Super League Greece",
    NL1: "Eredivisie",
    DK1: "Danish Superliga",
    PO1: "Liga Portugal",
    UKR1: "Ukrainian Premier League",
  };

  const getLeagueName = (abbreviation) => leagueNames[abbreviation] || abbreviation;

  const handleAddClubClick = () => {
    navigate("/clubs/add"); // Navigate to the Add Club page
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <section>
      <div className="container">
        <div className="clubs-header">
        <h2>Clubs</h2>
        </div>

        {/* Filter Input */}
        <div className="filter-field">
        <input
          type="text"
          placeholder="Filter clubs..."
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
        </div>

        {/* Add Club Button */}
        <div>
        <button className="add-button" onClick={handleAddClubClick}>
          Add Club
        </button>
        </div>

        {/* Clubs Table */}
        <div>
        <table style={{ width: "100%", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                Club Name{getSortIndicator('name')}
              </th>
              <th onClick={() => handleSort('domestic_competition')} style={{ cursor: 'pointer' }}>
                League{getSortIndicator('domestic_competition')}
              </th>
              <th onClick={() => handleSort('stadium_name')} style={{ cursor: 'pointer' }}>
                Stadium{getSortIndicator('stadium_name')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClubs.map((club) => (
              <tr
                key={club.club_id}
                onClick={() => handleRowClick(club.club_id)}
                style={{ cursor: "pointer" }}
              >
                <td>{club.name}</td>
                <td>{getLeagueName(club.domestic_competition)}</td>
                <td>{club.stadium_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

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

export default ClubsPage;
