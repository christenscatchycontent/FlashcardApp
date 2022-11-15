import React from "react"
import ButtonsForCard from "../Cards/ButtonsForCard"

/* Function for Initial Decks */

function Deck({ id, name, description, totalCards, handleDelete }) {
  const totalCardsDisplay = totalCards == 1 ? "1 card" : `${totalCards} cards`
  return (
    <div className="card mb-2" key={id}>
      <div className="card-body">
        <div className="row justify-content-between">
          <h5 className="card-title">{name}</h5>
          <p className="text text-secondary">{totalCardsDisplay}</p>
        </div>
        <p className="card-text">{description}</p>
        <ButtonsForCard id={id} handleDelete={handleDelete}/>
      </div>
    </div>
  )}

export default Deck