import { createContext, useContext, useState } from 'react'

const CardContext = createContext(null)

export const CardProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(0)
  const [cards, setCards] = useState([])
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
