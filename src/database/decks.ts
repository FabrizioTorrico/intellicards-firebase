import { db, auth, typedCollection, typedDoc } from './index'
import {
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  collection,
  serverTimestamp,
  writeBatch,
  increment,
  getDoc,
  collectionGroup,
} from 'firebase/firestore'
import kebabcase from 'lodash.kebabcase'
import { Deck } from '@models/decks'

export const createDeck = async (username: string, title: string) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const decksCollection = doc(collection(userRef, 'decks'))

  const deckData = {
    username,
    title,
    query: encodeURI(kebabcase(title)),
    heart_count: 0,
    published: false,
    created_at: serverTimestamp(),
    // updated_at: serverTimestamp(),
  }

  const batch = writeBatch(db)
  batch.update(userRef, { deck_count: increment(1) })
  batch.set(decksCollection, deckData)
  await batch.commit()
}

export const deleteDeck = async (deckId: string) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  await deleteDoc(deckRef)
}

export const getDeckData = async (
  uid: string,
  deckId: string
): Promise<Deck> => {
  const userRef = doc(db, 'users', uid)
  const deckRef = typedDoc<Deck>(userRef, 'decks', deckId)
  const deckSnap = await getDoc(deckRef)
  if (!deckSnap.exists()) return
  const deckData = { ...deckSnap.data(), deckId: deckSnap.id }

  return deckData
}

export const getUserDecks = async (uid: string): Promise<Deck[]> => {
  const userRef = doc(db, 'users', uid)
  const decksRef = typedCollection<Deck>(userRef, 'decks')
  const decksSnap = await getDocs(decksRef)

  return decksSnap.docs?.map((doc) => ({ ...doc.data(), deckId: doc.id }))
}

export const getRealTimeDeck = (
  deckUid: string,
  deckId: string,
  setDeck: (deck: Deck) => void
) => {
  const userRef = doc(db, 'users', deckUid)
  const deckRef = typedDoc<Deck>(userRef, 'decks', deckId)

  return onSnapshot(deckRef, (doc) => {
    setDeck({ ...doc.data(), deckId: doc.id })
  })
}

export const getRealTimeDeckList = (setDeckList: (decks: Deck[]) => void) => {
  const uid = auth.currentUser?.uid
  if (!uid) return
  const userRef = doc(db, 'users', uid)
  const deckCollection = typedCollection<Deck>(userRef, 'decks')

  return onSnapshot(deckCollection, (collection) => {
    setDeckList(
      collection.docs.map((doc) => ({ ...doc.data(), deckId: doc.id }))
    )
  })
}

export const getUserDeckPaths = async () => {
  const snapshot = await getDocs(collectionGroup(db, 'decks'))
  return snapshot.docs.map((doc) => {
    const { username } = doc.data()
    const deckId = doc.id.toString()

    return {
      params: { username, deckId },
    }
  })
}
