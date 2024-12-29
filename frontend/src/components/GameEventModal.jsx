import React, {useEffect, useState } from "react";
import '../styles/GameEventModal.css'
const GameEventModal = ({ isOpen, onClose, event, onSave, mode , game=null }) => {
  const [formData, setFormData] = useState({
    game_id : "",
    game_event_id : "",
    club_id : "",
    player_id: "",
    player_in_id: "",
    description: "",
    type: "",
    minute: "",
  });

  // Update formData when the event changes
  useEffect(() => {
    if (event) {
      setFormData({
        game_id : event.game_id || "",
        game_event_id : event.game_event_id || "",
        club_id : event.club_id || "",
        player_id: event.player_id || "",
        player_in_id: event.player_in_id || null,
        description: event.description || "",
        type: event.type || "",
        minute: event.minute || "",
      });
    }
  }, [event])
  if (!isOpen ) return null;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(mode=="edit") onSave(event.game_event_id, formData);
    else onSave(formData);
  };


  return (
    
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode == "edit" ? "Edit" : "Create"} Game Event</h2>
        <form onSubmit={handleSubmit}>
          
          { mode == "create" && (
            <label>
            Club:
            <select name="club_id" value={formData.club_id} onChange={handleChange}>
              <option value={game.home_club_id}>{game.home_club_name}</option>
              <option value={game.away_club_id}>{game.away_club_name}</option>
            </select>
          </label>
          )
          }
          <label>
            Event Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Goals">Goals</option>
              <option value="Substitutions">Substitutions</option>
            </select>
          </label>
          <label>
            Player ID:
            <input
              type="text"
              name="player_id"
              value={formData.player_id}
              onChange={handleChange}
            />
          </label>
          {formData.type === "Substitutions" && (
            <label>
              Player In ID:
              <input
                type="text"
                name="player_in_id"
                value={formData.player_in_id}
                onChange={handleChange}
              />
            </label>
          )}
          {formData.type === "Goals" && (
            <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        )}
          <label>
            Minute:
            <input
              type="number"
              name="minute"
              value={formData.minute}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameEventModal;
