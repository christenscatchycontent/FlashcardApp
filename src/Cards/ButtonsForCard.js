import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

/* Function for General Buttons for Cards */
function ButtonsForCard({ id, handleDelete }) {
  const {deckId} = useParams()
  return (
    <div className="btn-group" role="group" aria-label="Card Buttons group">
      <Link to={`/decks/${deckId}/cards/${id}/edit`}>
        <button type="button" className="btn btn-sm btn-secondary mr-2">
          Edit
        </button>
      </Link>
      <button
        type="button"
        onClick={() => handleDelete(id)}
        className="btn btn-danger btn-sml">
        Delete
      </button>
    </div>
  )};

export default ButtonsForCard