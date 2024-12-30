import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addClub.css";

function AddClubPage() {
  const [club, setClub] = useState({
    club_id: "",
    club_code: "",
    name: "",
    domestic_competition: "",
    total_market_value: "",
    squad_size: "",
    average_age: "",
    foreigners_number: "",
    foreigners_percent: "",
    national_team_players: "",
    stadium_name: "",
    stadium_seats: "",
    net_transfer_record: "",
    coach_name: "",
    url: "",
  });

  const navigate = useNavigate();

  // Function to handle form submission (add club)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(club);
      const response = await fetch("http://127.0.0.1:8080/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(club),
      });

      if (response.ok) {
        alert("Club added successfully!");
        navigate("/clubs"); // Redirect to the clubs list page
      } else {
        alert("Error adding club");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding club");
    }
  };

  return (
    <div className="add-club-container">
      <h2>Add Club</h2>
      <form onSubmit={handleSubmit} className="add-club-form">
        {/* Left Section */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="input-group">
            <div className="input-container">
              <label>Club Name</label>
              <input
                type="text"
                placeholder="Club Name"
                value={club.name}
                onChange={(e) => setClub({ ...club, name: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Club Code</label>
              <input
                type="text"
                placeholder="Club Code"
                value={club.club_code}
                onChange={(e) => setClub({ ...club, club_code: e.target.value })}
                required
              />
            </div>

            <div className="input-container">
              <label>Competition</label>
              <input
                type="text"
                placeholder="Competition"
                value={club.domestic_competition}
                onChange={(e) => setClub({ ...club, domestic_competition: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Market Value</label>
              <input
                type="text"
                placeholder="Total Market Value"
                value={club.total_market_value}
                onChange={(e) => setClub({ ...club, total_market_value: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Coach Name</label>
              <input
                type="text"
                placeholder="Coach Name"
                value={club.coach_name}
                onChange={(e) => setClub({ ...club, coach_name: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>URL</label>
              <input
                type="text"
                placeholder="Club URL"
                value={club.url}
                onChange={(e) => setClub({ ...club, url: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="form-section">
          <h3>Team Statistics</h3>
          <div className="input-group">
            <div className="input-container">
              <label>Squad Size</label>
              <input
                type="number"
                placeholder="Squad Size"
                value={club.squad_size}
                onChange={(e) => setClub({ ...club, squad_size: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Average Age</label>
              <input
                type="number"
                placeholder="Average Age"
                value={club.average_age}
                onChange={(e) => setClub({ ...club, average_age: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Number of Foreign Players</label>
              <input
                type="number"
                placeholder="Foreign Players"
                value={club.foreigners_number}
                onChange={(e) => setClub({ ...club, foreigners_number: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Foreigners Percent</label>
              <input
                type="number"
                placeholder="Foreigners Percent"
                value={club.foreigners_percent}
                onChange={(e) => setClub({ ...club, foreigners_percent: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>National Team Players</label>
              <input
                type="number"
                placeholder="National Team Players"
                value={club.national_team_players}
                onChange={(e) => setClub({ ...club, national_team_players: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Stadium Name</label>
              <input
                type="text"
                placeholder="Stadium Name"
                value={club.stadium_name}
                onChange={(e) => setClub({ ...club, stadium_name: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Stadium Seats</label>
              <input
                type="number"
                placeholder="Stadium Seats"
                value={club.stadium_seats}
                onChange={(e) => setClub({ ...club, stadium_seats: e.target.value })}
              />
            </div>

            <div className="input-container">
              <label>Net Transfer Record</label>
              <input
                type="text"
                placeholder="Net Transfer Record"
                value={club.net_transfer_record}
                onChange={(e) => setClub({ ...club, net_transfer_record: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit">Add Club</button>
        </div>
      </form>
    </div>
  );
}

export default AddClubPage;
