import { db } from "./index";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  return userData;
}
