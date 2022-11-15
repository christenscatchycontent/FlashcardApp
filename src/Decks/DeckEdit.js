import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { updateDeck, readDeck } from "../utils/api/index"
import FormDeck from "../Forms/FormDeck"

/* Function to Edit the Decks */
function DeckEdit() {
  const { deckId } = useParams()
  const history = useHistory()
  const formReset = {
    id: "",
    name: "",
    description: "", }

  const [existingDeck, setExistingDeck] = useState(formReset)
  
/* Async/Await functions for synchronous */
  useEffect(() => {
    async function getFlashDeck() {
      try {
        const deckFromApi = await readDeck(deckId)
        setExistingDeck(deckFromApi)
      } catch (error) {
        throw new Error(`API readDeck(${deckId}) had an error: ${error}`)
      }}
    getFlashDeck()
  }, [deckId])

  const handleFormChange = ({ target }) => {
    setExistingDeck({
      ...existingDeck,
      [target.id]: target.value,
    })}

  async function handleSubmit(event) {
    event.preventDefault();
    await updateDeck({
      ...existingDeck,
      id: existingDeck.id,
      name: existingDeck.name,
      description: existingDeck.description,
    });
    history.goBack();
  }
  let ogDeckName = existingDeck?.name ? existingDeck?.name : "loading..."

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{ogDeckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  )

  return (
    <div>
      {breadcrumb}
      <FormDeck
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
        existingDeck={existingDeck}
      />
    </div>
  )}

export default DeckEdit