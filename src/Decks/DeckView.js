import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { readDeck, deleteCard } from "../utils/api/index"
import ButtonsForCard from "../Cards/ButtonsForCard"
import CardList from "../Cards/CardList"

function DeckView({ handleDelete }) {
  const { deckId } = useParams()
  const history = useHistory()
  const [flashDeck, setFlashDeck] = useState({})
  const { id, name, description, cards } = flashDeck
  useEffect(() => {
    async function getFlashDeck() {
      const flashDeckFromApi = await readDeck(deckId)
      setFlashDeck(flashDeckFromApi)
    }
    getFlashDeck()}, [deckId])

  const handleCardDelete = async (id) => {
    if (window.confirm("Do you really want to delete this card?")) {
      await deleteCard(id)
      history.go(0)
    }}

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <div className="mb-4" key={id}>
        <h5>{name}</h5>
        <p>{description}</p>
        <ButtonsForCard id={id} handleDelete={handleDelete} />
      </div>
      <CardList cards={cards} handleDelete={handleCardDelete} />
    </div>
  )}

export default DeckView