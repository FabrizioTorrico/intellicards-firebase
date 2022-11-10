import { db, auth } from './index'
import { doc, writeBatch, onSnapshot, increment } from 'firebase/firestore'

export const addHeart = async (deckUid, deckId) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', deckUid)
  const deckRef = doc(userRef, 'decks', deckId)
  const heartRef = doc(deckRef, 'hearts', uid)
  const batch = writeBatch(db)

  batch.update(deckRef, { heart_count: increment(1) })
  batch.set(heartRef, { uid })
  await batch.commit()
}

export const removeHeart = async (deckUid, deckId) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', deckUid)
  const deckRef = doc(userRef, 'decks', deckId)
  const heartRef = doc(deckRef, 'hearts', uid)
  const batch = writeBatch(db)

  batch.update(deckRef, { heart_count: increment(-1) })
  batch.delete(heartRef)
  await batch.commit()
}

export const getRealTimeHeart = (deckUid, deckId, setMyHeart) => {
  const uid = auth.currentUser?.uid
  if (!uid) return
  const userRef = doc(db, 'users', deckUid)
  const deckRef = doc(userRef, 'decks', deckId)
  const heartRef = doc(deckRef, 'hearts', uid)

  return onSnapshot(heartRef, (doc) => {
    setMyHeart(doc)
  })
}
