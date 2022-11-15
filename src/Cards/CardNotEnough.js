import React from "react";
import { Link } from "react-router-dom";

/* Function for prompt when less than 3 cards */
function CardNotEnough({ totalCards, deckId }) {
  let cardCount = "2 cards";
  cardCount = !totalCards ? "0 cards" : "1 card";
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cardCount} in the deck
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type="button" className="btn btn-primary">
          + Add Card
        </button>
      </Link>
    </div>
  )}

export default CardNotEnough