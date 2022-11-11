import { db, dbCollection, dbDoc } from './index'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from 'firebase/firestore'
import { UserData, Usernames } from '@models/users'

export async function createFirestoreUser(
  uid: string,
  data: Partial<UserData>
) {
  data.deck_count = 0
  data.connection_count = 0
  const userRef = dbDoc<UserData>(db, 'users', uid)
  const usernameRef = dbDoc<Usernames>(db, 'usernames', data.username)
  const batch = writeBatch(db)
  batch.set(userRef, data)
  batch.set(usernameRef, { uid })
  await batch.commit()
}

export const usernameExists = async (username: string): Promise<boolean> => {
  const ref = doc(db, 'usernames', username)
  const docSnap = await getDoc(ref)
  return docSnap.exists()
}

export const getUidWithUsername = async (username: string): Promise<string> => {
  const usernameRef = dbDoc<Usernames>(db, 'usernames', username)
  const usernameSnap = await getDoc(usernameRef)
  const uid = usernameSnap.data()?.uid
  return uid
}

export const getUserData = async (uid: string): Promise<UserData> => {
  const userRef = dbDoc<UserData>(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  const userData = userSnap.data()

  return userData
}

export const getUsers = async (): Promise<UserData[]> => {
  const usersRef = dbCollection<UserData>(db, 'users')
  const usersSnap = await getDocs(usersRef)

  return usersSnap.docs?.map((doc) => ({ ...doc.data(), objectID: doc.id }))
}

export const getUsernamePaths = async () => {
  const snapshot = await getDocs(collection(db, 'usernames'))
  return snapshot.docs.map((doc) => {
    return {
      params: { username: doc.id.toString() },
    }
  })
}
