import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To access the clubId from URL parameters
import '../styles/clubDetails.css';

function ClubDetailsPage() {
  const { clubId } = useParams(); // Extract clubId from the URL using React Router
  const [club, setClub] = useState(null); // State to hold the fetched club data
  const [players, setPlayers] = useState([]); // State to hold players data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error handling

  // Fetch club details when the component is mounted or the clubId changes
  useEffect(() => {
    const fetchClubDetails = async () => {
      setLoading(true); // Set loading to true before the request
      try {
        const response = await fetch(`http://127.0.0.1:8080/clubs/${clubId}`);
        const data = await response.json();
        
        if (data.club) {
          setClub(data.club); // Set the fetched club data to state
          setPlayers(data.players); // Set the players data to state
        } else {
          setError("Club not found"); // Handle case where club is not found
        }
      } catch (err) {
        setError("Error fetching club details"); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchClubDetails();
  }, [clubId]); // Re-fetch data when clubId changes

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error message if something goes wrong
  }

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

  // Group players by position
  const groupPlayersByPosition = (players) => {
    const positions = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Forward: [],
      Other: [],
    };

    players.forEach((player) => {
      if (player.position.includes("Goalkeeper")) {
        positions.Goalkeeper.push(player);
      } else if (player.position.includes("Defender")) {
        positions.Defender.push(player);
      } else if (player.position.includes("Midfield")) {
        positions.Midfielder.push(player);
      } else if (player.position.includes("Attack")) {
        positions.Forward.push(player);
      } else {
        positions.Other.push(player);
      }
    });

    return positions;
  };

  const groupedPlayers = groupPlayersByPosition(players);

  return (
    <div className="club-details-container">
      <h2 className="club-name">{club.name}</h2>
      <div className="club-details">
        <div className="club-detail-item">
          <strong>Competition:</strong> {getLeagueName(club.domestic_competition) || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Total Market Value:</strong> {club.total_market_value || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Squad Size:</strong> {club.squad_size || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Average Age:</strong> {club.average_age || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Foreigners Number:</strong> {club.foreigners_number || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Foreigners Percentage:</strong> {club.foreigners_percent || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>National Team Players:</strong> {club.national_team_players || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Stadium Name:</strong> {club.stadium_name || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Stadium Seats:</strong> {club.stadium_seats || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Net Transfer Record:</strong> {club.net_transfer_record || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Coach:</strong> {club.coach_name || "N/A"}
        </div>
        <div className="club-detail-item">
          <strong>Website:</strong> <a href={club.club_url} target="_blank" rel="noopener noreferrer">{club.club_url}</a>
        </div>
      </div>

      <div className="players-section">
        <h3>Players</h3>

        {Object.keys(groupedPlayers).map((position) => (
          groupedPlayers[position].length > 0 && (
            <div key={position} className="players-position-group">
              <h4>{position}</h4>
              <div className="players-grid">
                {groupedPlayers[position].map((player) => (
                  <div className="player-card" key={player.player_id}>
                    <img className="player-image" src={player.image_url} alt={`${player.first_name} ${player.last_name}`} />
                    <div className="player-info">
                      <strong>{player.first_name} {player.last_name}</strong> <br />
                      <span>{player.position}</span> <br />
                      <a className="player-profile-link" href={player.player_url} target="_blank" rel="noopener noreferrer">
                        Player Profile
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {players.length === 0 && <p>No players found for this club.</p>}
      </div>
    </div>
  );
}

export default ClubDetailsPage;
