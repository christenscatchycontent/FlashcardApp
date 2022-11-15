import React, { useState, useEffect } from "react"
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom"
import { listDecks, deleteDeck } from "../utils/api/index"
import DeckView from "./DeckView"
import DeckStudies from "./DeckStudies"
import DeckEdit from "./DeckEdit"
import DeckNew from "./DeckNew"
import Deck from "./Deck"
import CardEdit from "../Cards/CardEdit"
import CardCreate from "../Cards/CardCreate"
import NotFound from "../Layout/NotFound"

/* Main Deck function to set parameters */
function Decks() {
  const history = useHistory()
  const { deckId } = useParams()
  const [flashDecks, setFlashDecks] = useState([])

  useEffect(() => {
    async function getFlashDecks() {
      const flashDecksFromApi = await listDecks()
      setFlashDecks(flashDecksFromApi) }
    getFlashDecks()}, [])

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this deck?")) {
      deleteDeck(id)

      setFlashDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== id))

      history.push("/")
    }}

  const deckList = flashDecks.map((deck) => {
    return (
      <Deck
        key={deck?.id}
        id={deck?.id}
        name={deck?.name}
        description={deck?.description}
        totalCards={deck?.cards?.length}
        handleDelete={handleDelete} />
    )})

  function DisplayDecks({ flashDecks }) {
    return (
      <div>
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary mb-4">
            + Create Deck
          </button>
        </Link>
        {}
        {flashDecks}
      </div>
    )}

  return (
    <div className="container" style={{ maxWidth: "800px", paddingBottom: "20px" }}>
      <Switch>
        <Route exact={true} path="/">
          <DisplayDecks flashDecks={deckList} deckId={deckId} />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <CardEdit />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <CardCreate />
        </Route>
        <Route path="/decks/:deckId/study">
          <DeckStudies />
        </Route>
        <Route path="/decks/:deckId/edit">
          <DeckEdit />
        </Route>
        <Route path="/decks/new">
          <DeckNew />
        </Route>
        <Route path="/decks/:deckId">
          <DeckView handleDelete={handleDelete} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )}

export default Decks