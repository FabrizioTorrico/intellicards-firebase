import { db } from "./index";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  writeBatch,
  collectionGroup,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { auth } from "./index";

export async function createFirestoreUser(uid, data) {
  data.deck_count = 0;
  data.confirmed = false;
  data.connection_count = 0;
  const userRef = doc(db, "users", uid);
  const usernameRef = doc(db, "usernames", data.username);
  const batch = writeBatch(db);
  batch.set(userRef, data);
  batch.set(usernameRef, { uid });
  await batch.commit();
}

export const usernameExists = async (username) => {
  const ref = doc(db, "usernames", username);
  const docSnap = await getDoc(ref);
  return docSnap.exists();
};

export const getUsernamePaths = async () => {
  const snapshot = await getDocs(collection(db, "usernames"));
  return snapshot.docs.map((doc) => {
    return {
      params: { username: doc.id.toString() },
    };
  });
};

export const getUserDeckPaths = async () => {
  const snapshot = await getDocs(collectionGroup(db, "decks"));
  return snapshot.docs.map((doc) => {
    const { username } = doc.data();
    const deckId = doc.id.toString();

    return {
      params: { username, deckId },
    };
  });
};

export const getUidWithUsername = async (username) => {
  let uid;
  const usernameRef = doc(db, "usernames", username);
  const usernameSnap = await getDoc(usernameRef);
  if (usernameSnap.exists()) uid = usernameSnap.data().uid;
  else uid = false;
  return uid;
};

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  return userData;
}

export const getUserDecks = async (uid) => {
  const userRef = doc(db, "users", uid);
  const decksRef = collection(userRef, "decks");
  const decksSnap = await getDocs(decksRef);

  return decksSnap?.docs.map((doc) => ({ ...doc.data(), deckId: doc.id }));
};

export const getDeckData = async (uid, deckId) => {
  const userRef = doc(db, "users", uid);
  const deckRef = doc(userRef, "decks", deckId);
  const deckSnap = await getDoc(deckRef);
  const deckData = { ...deckSnap.data(), deckId: deckSnap.id };

  return deckData;
};

export const getDeckCards = async (uid, deckId) => {
  const userRef = doc(db, "users", uid);
  const deckRef = doc(userRef, "decks", deckId);
  const cardsRef = collection(deckRef, "cards");
  const cardsSnap = await getDocs(cardsRef);

  return cardsSnap?.docs.map((doc) => ({ ...doc.data(), cardId: doc.id }));
};

export const deleteDeck = async (deckQuery) => {
  const { uid } = auth.currentUser;
  const userRef = doc(db, "users", uid);
  const deckRef = doc(userRef, "decks", deckQuery);
  await deleteDoc(deckRef);
};

export const createCard = async (deckQuery, cardData) => {
  const { uid } = auth.currentUser;
  const userRef = doc(db, "users", uid);
  const deckRef = doc(userRef, "decks", deckQuery);
  const cardsCollection = collection(deckRef, "cards");

  await addDoc(cardsCollection, cardData);
};
export const deleteCard = async (deckQuery, cardQuery) => {
  const { uid } = auth.currentUser;
  const userRef = doc(db, "users", uid);
  const deckRef = doc(userRef, "decks", deckQuery);
  const cardRef = doc(userRef, "cards", cardQuery);

  await deleteDoc(cardRef);
};

export const updateCard = async (deckQuery, cardQuery, cardData) => {
  const { uid } = auth.currentUser;
  const userRef = doc(db, "users", uid);
  const deckRef = doc(userRef, "decks", deckQuery);
  const cardRef = doc(userRef, "cards", cardQuery);

  await updateDoc(cardRef, cardData);
};
