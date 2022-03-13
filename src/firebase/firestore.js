import { db } from "./index";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  writeBatch,
  collectionGroup,
} from "firebase/firestore";

export async function createUser(uid, data) {
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

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  return userData;
}

export const getUserDeckPaths = async () => {
  const snapshot = await getDocs(collectionGroup(db, "decks"));
  return snapshot.docs.map((doc) => {
    const { username, query } = doc.data();
    return {
      params: { username, query },
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

export const getUserDecks = async (uid) => {
  const userRef = doc(db, "users", uid);
  const decksRef = collection(userRef, "decks");
  const decksSnap = await getDocs(decksRef);

  return decksSnap.docs.map((doc) => doc.data());
};

export const getDeckCards = async (username, deckQuery) => {
  const uid = await getUidWithUsername(username);
  if (uid) {
    const userRef = doc(db, "users", uid);
    const deckRef = doc(userRef, "decks", deckQuery);
    const deckSnap = getDoc(deckRef);
  }
};
