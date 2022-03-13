import { db } from "./index";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  return userData;
}

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

const getUidWithUsername = async (username) => {
  const usernameRef = doc(db, "usernames", username);
  const usernameSnap = await getDoc(usernameRef);
  const { uid } = usernameSnap.data();
  return uid;
};

export const getUserWithUsername = async (username) => {
  const uid = await getUidWithUsername(username);
  const userData = await getUserData(uid);
  const userDecks = await getUserDecks(uid);
  return { userData, userDecks };
};

export const getUserDecks = async (uid) => {
  const userRef = doc(db, "users", uid);
  const decksRef = collection(userRef, "decks");

  const decksSnap = await getDocs(decksRef);

  return decksSnap.docs.map((doc) => doc.data());
};
