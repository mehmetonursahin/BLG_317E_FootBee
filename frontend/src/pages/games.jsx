import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GamesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const metadata = {
    "competition_id" : "exact",
    "competition_type" : "exact",
    "round": "exact",
    "home_club_id": "exact",
    "away_club_id" : "exact", 
    "home_club_goals" : "exact",
    "away_club_goals" : "exact",
    "season" : "range",
    "date" : "range",
    "attendance" : "range",
    "home_club_manager_name": "exact",
    "away_club_manager_name": "exact",
    "stadium" : "exact",
    "referee" : "exact",
  }
  // Parse current filters from URL
  const getFiltersFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const filters = {};
    for (const [key, value] of params.entries()) {
      filters[key] = value;
    }
    return filters;
  };

  const [filterValues, setFilterValues] = useState(getFiltersFromUrl());
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(`http://127.0.0.1:8080/games${location.search}`);
      const data = await response.json();
      setGames(data.games);
    };
    fetchGames();
  }, [location.search]);

  

  const handleInputChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const params = new URLSearchParams(filterValues).toString();
    navigate(`?${params}`);
  };

  const renderFilterField = (columnName, filterType) => {
    switch (filterType) {
      case "exact":
        return (
          <input
            type="text"
            value={filterValues[columnName] || ""}
            onChange={(e) => handleInputChange(columnName, e.target.value)}
          />
        );
      case "range":
        return (
          <div>
            <input
              type="text"
              placeholder="From"
              value={filterValues[`${columnName}_start`] || ""}
              onChange={(e) =>
                handleInputChange(`${columnName}_start`, e.target.value)
              }
            />
            <input
              type="text"
              placeholder="To"
              value={filterValues[`${columnName}_end`] || ""}
              onChange={(e) =>
                handleInputChange(`${columnName}_end`, e.target.value)
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="games-page">
        <div className="filter-panel">
          <h3>Filters</h3>
          {Object.entries(metadata).map(([columnName, filterType]) => (
            <div key={columnName} className="filter-field">
              <label>{columnName}</label>
              {renderFilterField(columnName, filterType)}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div className="games-list">
          <h3>Games</h3>
          <table>
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Score</th>
              <th>Away Team</th>
              <th>Date</th>
              <th>Referee</th>
              <th>Stadium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {games.map((game) => (
              <tr key={game.game_id}>
                <td>{game.home_club_name}</td>
                <td>{game.aggregate}</td>
                <td>{game.away_club_name}</td>
                <td>{new Date(game.date).toLocaleDateString()}</td>
                <td>{game.referee}</td>
                <td>{game.stadium}</td>
                <td>
                  <a href={`/game/${game.game_id}`}>Go to game </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
};

export default GamesPage;

// function GamesPage() {
//   const [games, setGames] = useState([]);
//   const [filter, setFilter] = useState("");

//   // useEffect(() => {
//   //   const fetchGames = async () => {
//   //     const response = await fetch("http://127.0.0.1:8080/games");
//   //     const data = await response.json();
//   //     setGames(data.games);
//   //   };

//   //   fetchGames();
//   // }, []);

//   return (
//     <section>
//       <div className="container">
//         <h2>Games</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Home Team</th>
//               <th>Score</th>
//               <th>Away Team</th>
//               <th>Date</th>
//               <th>Referee</th>
//               <th>Stadium</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredGames.map((game) => (
//               <tr key={game.game_id}>
//                 <td>{game.home_club_name}</td>
//                 <td>{game.aggregate}</td>
//                 <td>{game.away_club_name}</td>
//                 <td>{new Date(game.date).toLocaleDateString()}</td>
//                 <td>{game.referee}</td>
//                 <td>{game.stadium}</td>
//                 <td>
//                   <a href={`/game/${game.game_id}`}>Go to game </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }
