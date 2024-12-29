import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // If you are using React Router for routing

function ClubsPage() {
  // State for clubs data, filter, and pagination
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [totalCount, setTotalCount] = useState(0); // Total number of clubs

  // Function to fetch clubs data (without pagination)
  const fetchClubs = async () => {
    const response = await fetch(`http://127.0.0.1:8080/clubs`);
    const data = await response.json();
    setClubs(data.clubs); // Store all clubs data
    setFilteredClubs(data.clubs); // Initially set the filtered clubs to all clubs
    setTotalCount(data.total_count);
  };

  // Fetch clubs data once when the component mounts
  useEffect(() => {
    fetchClubs();
  }, []);

  // Filter clubs based on input
  const handleFilterChange = (e) => {
    const filterText = e.target.value;
    setFilter(filterText);

    // Filter the clubs based on the filter text
    const filtered = clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(filterText.toLowerCase()) ||
        club.stadium_name.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredClubs(filtered); // Set the filtered clubs
    setPage(1); // Reset to page 1 after filtering
  };

  // Paginate the clubs data
  const paginatedClubs = filteredClubs.slice((page - 1) * 20, page * 20);

  // Calculate the total number of pages
  const calculateTotalPages = () => {
    return Math.ceil(filteredClubs.length / 20);
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const navigate = useNavigate();

  // Function to handle club deletion
  const handleDeleteClub = async (club_id) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      try {
        console.log(club_id);
        const response = await fetch(`http://127.0.0.1:8080/clubs/${club_id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          alert("Club deleted successfully!");
          // Remove the club from the state immediately without needing to re-fetch
          setClubs(clubs.filter((club) => club.club_id !== club_id));
          setFilteredClubs(filteredClubs.filter((club) => club.club_id !== club_id));
        } else {
          alert(data.error || "Failed to delete club");
        }
      } catch (error) {
        alert("Error deleting club");
        console.error(error);
      }
    }
  };

  // Update total pages after filtering
  useEffect(() => {
    setTotalPages(calculateTotalPages());
  }, [filteredClubs, page]);

  // Dictionary for league abbreviations
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
    PO1: "Ekstraklasa",
    UKR1: "Ukrainian Premier League",
  };

  // Function to get league name
  const getLeagueName = (abbreviation) => leagueNames[abbreviation] || abbreviation;

  return (
    <section>
      <div className="container">
        <h2>Clubs</h2>

        {/* Filter Input */}
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

        {/* Link to Add a New Club */}
        <div>
          <Link
            to="/clubs/add"
            style={{ display: "inline-block", marginTop: "1rem", color: "blue" }}
          >
            Add a New Club
          </Link>
        </div>

        {/* Clubs Table */}
        <table style={{ width: "100%", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "25%" }}>Competition</th>
              <th style={{ width: "25%" }}>Stadium</th>
              <th style={{ width: "5%" }}>Details</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClubs.map((club) => (
              <tr key={club.club_id}>
                <td> {club.name} </td>
                <td>{getLeagueName(club.domestic_competition)}</td>
                <td>{club.stadium_name}</td>
                <td>
                  <Link to={`/clubs/${club.club_id}`} style={{ color: "blue" }}>
                    Details
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDeleteClub(club.club_id)}>Delete Club</button>
                  <button>
                    <Link to={`/clubs/edit/${club.club_id}`} style={{ color: "blue" }}>
                      Edit Club
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span> Page {page} of {totalPages} </span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default ClubsPage;