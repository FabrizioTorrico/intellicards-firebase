import { db, auth, typedCollection, typedDoc } from './index'
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { Card } from '@models/cards'

export const createCard = async (deckId, cardData) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardsCollection = typedCollection<Card>(deckRef, 'cards')

  await addDoc(cardsCollection, cardData)
}

export const deleteCard = async (deckId, cardId) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardRef = doc(deckRef, 'cards', cardId)

  await deleteDoc(cardRef)
}

export const updateCard = async (
  deckId: string,
  cardId: string,
  newCard: Card
) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardRef = typedDoc<Card>(deckRef, 'cards', cardId)

  await updateDoc<Card>(cardRef, newCard)
}

export const getDeckCards = async (
  uid: string,
  deckId: string
): Promise<Card[]> => {
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardsRef = typedCollection<Card>(deckRef, 'cards')
  // const q = query(cardsCollection, orderBy("created_at", "desc"));
  const cardsSnap = await getDocs(cardsRef)
  return cardsSnap.docs?.map((doc) => ({
    ...doc.data(),
    cardId: doc.id,
  }))
}

export const getRealTimeCardList = (
  deckId: string,
  setCardList: (cards: Card[]) => void
) => {
  const uid = auth.currentUser?.uid
  if (!uid) return
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardsCollection = typedCollection<Card>(deckRef, 'cards')

  return onSnapshot(cardsCollection, (collection) => {
    setCardList(
      collection.docs.map((doc) => ({ ...doc.data(), cardId: doc.id }))
    )
  })
}
