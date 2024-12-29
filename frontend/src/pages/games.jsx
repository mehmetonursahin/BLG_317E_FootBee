import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/filter.css";
const GamesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const metadata = {
    competition_id: "exact",
    competition_type: "exact",
    round: "exact",
    home_club_id: "exact",
    away_club_id: "exact",
    home_club_goals: "exact",
    away_club_goals: "exact",
    season: "range",
    date: "range",
    attendance: "range",
    home_club_manager_name: "exact",
    away_club_manager_name: "exact",
    stadium: "exact",
    referee: "exact",
  };
  // Parse current filters from URL
  const getFiltersFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const filters = {};
    for (const [key, value] of params.entries()) {
      if (metadata[key]) filters[key] = value;
    }
    return filters;
  };
  const getSortsFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get("sort");
    const initialSortStates = sortParam
      ? sortParam.split(",").reduce((acc, entry) => {
          const [column, order] = entry.split(":");
          acc[column] = order;
          return acc;
        }, {})
      : {};
    return initialSortStates;
  };

  const [filterValues, setFilterValues] = useState(getFiltersFromUrl());
  const [games, setGames] = useState([]);
  const [sortStates, setSortStates] = useState(getSortsFromUrl());
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 20,
    total_pages: 1,
    total_count: 0,
  });
  const handlePagination = (direction) => {
    const newPage =
      direction === "next" ? pagination.page + 1 : pagination.page - 1;
    if (newPage > 0 && newPage <= pagination.total_pages) {
      const sortParam = Object.entries(sortStates)
      .map(([col, order]) => `${col}:${order}`)
      .join(",");
      const params = new URLSearchParams({
        page: newPage,
        per_page: pagination.per_page,
        ...filterValues,
        sort: sortParam,
      });
      navigate(`?${params.toString()}`);
    }
  };
  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(
        `http://127.0.0.1:8080/games${location.search}`
      );
      const data = await response.json();
      setGames(data.games);
      setPagination({
        page: data.page,
        per_page: data.per_page,
        total_pages: data.total_pages,
        total_count: data.total_count,
      });
    };
    fetchGames();
  }, [location.search]);

  const handleInputChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      ...filterValues,
      page: 1,
    }).toString();
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
  const handleSort = (column) => {
    // Check the current order of the column
    const currentOrder = sortStates[column];
    
    // If the current order is "DESC", remove the column from the sort states
    let updatedSortStates;
    if (currentOrder === "DESC") {
      const { [column]: _, ...rest } = sortStates; // Exclude the column
      updatedSortStates = rest;
    } else {
      // Otherwise, toggle the order or add the column with "ASC"
      const newOrder = currentOrder === "ASC" ? "DESC" : "ASC";
      updatedSortStates = { ...sortStates, [column]: newOrder };
    }
  
    setSortStates(updatedSortStates);
  
    // Update URL with new sorting parameters
    const sortParam = Object.entries(updatedSortStates)
      .map(([col, order]) => `${col}:${order}`)
      .join(",");
    const params = new URLSearchParams(location.search);
    params.set("sort", sortParam);
    navigate(`?${params.toString()}`);
  };
  const handleRowClick = (game_id) => {
    navigate(`/game/${game_id}`);
  };

  const getSortIndicator = (column) => {
    return sortStates[column] ? (sortStates[column] === "ASC" ? "↑" : "↓") : "";
  };
  return (
    <section>
      <div className="games-page">
        <div className="filter-panel">
          <h3>Filters</h3>
          {Object.entries(metadata).map(([columnName, filterType]) => (
            <div key={columnName} className="filter-field">
              <label>
                {columnName
                  .replace(/_/g, " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                  .join(" ")}
              </label>
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
                <th onClick={() => handleSort("home_club_name")}>
                  Home Team {getSortIndicator("home_club_name")}
                </th>
                <th onClick={() => handleSort("aggregate")}>
                  Score {getSortIndicator("aggregate")}
                </th>
                <th onClick={() => handleSort("away_club_name")}>
                  Away Team {getSortIndicator("away_club_name")}
                </th>
                <th onClick={() => handleSort("date")}>
                  Date {getSortIndicator("date")}
                </th>
                <th onClick={() => handleSort("referee")}>
                  Referee {getSortIndicator("referee")}
                </th>
                <th onClick={() => handleSort("stadium")}>
                  Stadium {getSortIndicator("stadium")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.game_id} onClick={() => handleRowClick(game.game_id)}>
                  <td>{game.home_club_name}</td>
                  <td>{game.aggregate}</td>
                  <td>{game.away_club_name}</td>
                  <td>{new Date(game.date).toISOString().split("T")[0]}</td>
                  <td>{game.referee}</td>
                  <td>{game.stadium}</td>
                  <td>
                    <a href={`/game/${game.game_id}`}>Go to game </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              onClick={() => handlePagination("back")}
              disabled={pagination.page <= 1}
            >
              Back
            </button>
            <span>
              Page {pagination.page} of {pagination.total_pages}
            </span>
            <button
              onClick={() => handlePagination("next")}
              disabled={pagination.page >= pagination.total_pages}
            >
              Next
            </button>
          </div>
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
