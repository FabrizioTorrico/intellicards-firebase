import { Deck } from '@models/decks'
import { createContext, useContext, useState } from 'react'

interface ContextProps {
  deckData: Deck
  setDeckData: (x: Deck) => void
  decks: Deck[]
  setDecks: (x: Deck[]) => void
}

const DeckContext = createContext<ContextProps>({
  deckData: null,
  setDeckData: () => undefined,
  decks: [],
  setDecks: () => undefined,
})

export const DeckProvider = ({ children }) => {
  const [deckData, setDeckData] = useState<Deck>(null)
  const [decks, setDecks] = useState<Deck[]>([])
  return (
    <DeckContext.Provider
      value={{
        deckData,
        setDeckData,
        decks,
        setDecks,
      }}
    >
      {children}
    </DeckContext.Provider>
  )
}

export const useDeck = () => useContext(DeckContext)
