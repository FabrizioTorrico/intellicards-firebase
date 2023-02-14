import { createContext, Dispatch, useContext, useState } from 'react'
import { Card } from 'src/models/cards'

interface ContextProps {
  selectedCard: number | null
  setSelectedCard: Dispatch<React.SetStateAction<number>>
  cards: Card[]
  setCards: (x: Card[]) => void
  createCard: boolean
  setCreateCard: (x: boolean) => void
  cardListOpen: boolean
  setCardListOpen: Dispatch<React.SetStateAction<boolean>>
}
const CardContext = createContext<ContextProps>({
  selectedCard: 0,
  setSelectedCard: () => undefined,
  cards: [],
  setCards: () => undefined,
  createCard: false,
  setCreateCard: () => undefined,
  cardListOpen: false,
  setCardListOpen: () => undefined,
})

export const CardProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(0)
  const [cards, setCards] = useState<Card[]>([])
  const [createCard, setCreateCard] = useState(false)
  const [cardListOpen, setCardListOpen] = useState(true)
  return (
    <CardContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        cards,
        setCards,
        createCard,
        setCreateCard,
        cardListOpen,
        setCardListOpen,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export const useCard = () => useContext(CardContext)
