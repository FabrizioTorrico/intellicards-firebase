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
