// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
} from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

/* const app =  */ initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()
const auth = getAuth()

const EMULATORS_STARTED = 'EMULATORS_STARTED'
if (process.env.NODE_ENV === 'development') {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectStorageEmulator(storage, 'localhost', 9199)
  }
}
export { db, auth, storage }

// TYPED COLLECTIONS
import { UserData } from '@models/users'
import { Deck } from '@models/decks'
import { Card } from '@models/cards'

const typedCollection = <T = DocumentData>(
  reference: CollectionReference<UserData | Deck | Card> | Firestore,
  collectionName: string
) => {
  return collection(db, collectionName) as CollectionReference<T>
}

// export all your collections
export const usersCol = typedCollection<UserData>(db, 'users')
export const decksCol = typedCollection<Deck>(usersCol, 'authors')
export const booksCol = typedCollection<Card>(decksCol, 'cards')
