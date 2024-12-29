import React, { useState } from "react";
import GameEventModal from "./GameEventModal";

const GameEvents = ({ events, game }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenAddModal = () => {
    setSelectedEvent(events[0]);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveAdd = async (updatedData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/game_events/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Event created successfully.");
        handleCloseAddModal();
        // Optionally refresh or update the local state with the new data
      } else {
        alert("Failed to update the event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSave = async (gameEventId, updatedData) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/game_events/${gameEventId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert("Event updated successfully.");
        handleCloseModal();
        // Optionally refresh or update the local state with the new data
      } else {
        alert("Failed to update the event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const renderEventIcon = (type) => {
    switch (type) {
      case "Goals":
        return <span className="event-icon">⚽</span>;
      case "Substitutions":
        return (
          <span className="event-icon">
            <img src="https://www.mackolik.com/img/substitution.2be0be96e1.svg"></img>
          </span>
        );
      default:
        return null;
    }
  };
  const handleDelete = async (gameEventId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/game_events/${gameEventId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Event deleted successfully.");
        // Optionally refresh the list or remove the event from the state
      } else {
        alert("Failed to delete the event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="relative-div">
      <div >
        <button className="create-button" style={styles.submitButton} onClick={() => handleOpenAddModal()}>
          Create Game Event
        </button>
      </div>
      {events.map((event) => (
        <div key={event.game_event_id} className="event-row">
          <div className="event-placeholder">
            {event.club_id === game.home_club_id && (
              <div className="event-details">
                {renderEventIcon(event.type)}
                {event.type === "Goals" && (
                  <p>
                    {event.player_name} {event.description || ""}
                  </p>
                )}
                {event.type === "Substitutions" && (
                  <p>
                    {event.player_name}, {event.player_in_name}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="event-minute">
            <strong>{event.minute}'</strong>
          </div>
          <div className="event-placeholder">
            {event.club_id !== game.home_club_id && (
              <div className="event-details">
                {renderEventIcon(event.type)}
                {event.type === "Goals" && (
                  <p>
                    {event.player_name} {event.description || ""}
                  </p>
                )}
                {event.type === "Substitutions" && (
                  <p>
                    {event.player_name}, {event.player_in_name}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="event-actions">
            <button
              className="edit-button"
              onClick={() => handleOpenModal(event)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(event.game_event_id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <GameEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        onSave={handleSave}
        mode="edit"
        game={game}

      />
      <GameEventModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        event={selectedEvent}
        onSave={handleSaveAdd}
        mode="create"
        game={game}
      />
    </div>
  );
};
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center", // Centers the heading
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    maxHeight: "800px",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    padding: "0.8rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "20px",
  },
  cancelButton: {
    padding: "0.8rem",
    backgroundColor: "#f22",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "20px",
  },
};
export default GameEvents;
