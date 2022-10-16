import { db, auth, usersCol } from './index'
import {
  doc,
  getDoc,
  collection,
  getDocs,
  // setDoc,
  writeBatch,
  collectionGroup,
  deleteDoc,
  addDoc,
  onSnapshot,
  increment,
  serverTimestamp,
  updateDoc,
  /*  query,
  orderBy , */
} from 'firebase/firestore'
import kebabcase from 'lodash.kebabcase'

export async function createFirestoreUser(uid, data) {
  data.deck_count = 0
  data.connection_count = 0
  const userRef = doc(db, 'users', uid)
  const usernameRef = doc(db, 'usernames', data.username)
  const batch = writeBatch(db)
  batch.set(userRef, data)
  batch.set(usernameRef, { uid })
  await batch.commit()
}

export const usernameExists = async (username) => {
  const ref = doc(db, 'usernames', username)
  const docSnap = await getDoc(ref)
  return docSnap.exists()
}

export const getUsernamePaths = async () => {
  const snapshot = await getDocs(collection(db, 'usernames'))
  return snapshot.docs.map((doc) => {
    return {
      params: { username: doc.id.toString() },
    }
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

export const getUidWithUsername = async (username) => {
  const usernameRef = doc(db, 'usernames', username)
  const usernameSnap = await getDoc(usernameRef)
  const uid = usernameSnap.data()?.uid
  return uid
}

export const getUserData = async (uid) => {
  const userRef = doc(usersCol, uid)
  const userSnap = await getDoc(userRef)
  const userData = userSnap.data()

  return userData
}

export const getUserDecks = async (uid) => {
  const userRef = doc(db, 'users', uid)
  const decksRef = collection(userRef, 'decks')
  const decksSnap = await getDocs(decksRef)

  return decksSnap.docs?.map((doc) => ({ ...doc.data(), deckId: doc.id }))
}

export const getDeckData = async (uid, deckId) => {
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const deckSnap = await getDoc(deckRef)
  if (!deckSnap.exists()) return
  const deckData = { ...deckSnap.data(), deckId: deckSnap.id }

  return deckData
}

export const getDeckCards = async (uid, deckId) => {
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardsRef = collection(deckRef, 'cards')
  // const q = query(cardsCollection, orderBy("created_at", "desc"));
  const cardsSnap = await getDocs(cardsRef)

  return cardsSnap.docs?.map((doc) => ({
    ...doc.data(),
    cardId: doc.id,
  }))
}

export const createDeck = async (username, title) => {
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
export const deleteDeck = async (deckQuery) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckQuery)
  await deleteDoc(deckRef)
}

export const createCard = async (deckId, cardData) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardsCollection = collection(deckRef, 'cards')

  await addDoc(cardsCollection, cardData)
}

export const deleteCard = async (deckId, cardId) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardRef = doc(deckRef, 'cards', cardId)

  await deleteDoc(cardRef)
}

export const updateCard = async (deckId, cardId, newCard) => {
  const { uid } = auth.currentUser
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardRef = doc(deckRef, 'cards', cardId)

  await updateDoc(cardRef, newCard)
}

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

export const getRealTimeDeck = (deckUid, deckId, setDeck) => {
  const userRef = doc(db, 'users', deckUid)
  const deckRef = doc(userRef, 'decks', deckId)

  return onSnapshot(deckRef, (doc) => {
    setDeck({ ...doc.data(), deckId: doc.id })
  })
}

export const getRealTimeDeckList = (setDeckList) => {
  const uid = auth.currentUser?.uid
  if (!uid) return
  const userRef = doc(db, 'users', uid)
  const deckCollection = collection(userRef, 'decks')

  return onSnapshot(deckCollection, (collection) => {
    setDeckList(
      collection.docs.map((doc) => ({ ...doc.data(), deckId: doc.id }))
    )
  })
}

export const getRealTimeCardList = (deckId, setCardList) => {
  const uid = auth.currentUser?.uid
  if (!uid) return
  const userRef = doc(db, 'users', uid)
  const deckRef = doc(userRef, 'decks', deckId)
  const cardsCollection = collection(deckRef, 'cards')

  return onSnapshot(cardsCollection, (collection) => {
    setCardList(
      collection.docs.map((doc) => ({ ...doc.data(), cardId: doc.id }))
    )
  })
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
