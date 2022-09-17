import { createContext, useContext, useState } from 'react'
import { Card } from 'src/models/cards'

interface ContextProps {
  selectedCard: number
  setSelectedCard: (x: number) => void
  cards: Card[]
  setCards: (x: Card[]) => void
  createCard: boolean
  setCreateCard: (x: boolean) => void
}
const CardContext = createContext<ContextProps>({
  selectedCard: 0,
  setSelectedCard: () => undefined,
  cards: [],
  setCards: () => undefined,
  createCard: false,
  setCreateCard: () => undefined,
})

export const CardProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(0)
  const [cards, setCards] = useState<Card[]>([])
  const [createCard, setCreateCard] = useState(false)
  return (
    <CardContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        cards,
        setCards,
        createCard,
        setCreateCard,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export const useCard = () => useContext(CardContext)
