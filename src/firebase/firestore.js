import { db } from "./index";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export async function getUsernameWithUid(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  console.log(userSnap.data());
  const { username } = userSnap.data();

  return username ? username : false;
}
