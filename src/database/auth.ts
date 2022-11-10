import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from './index'

export const loginWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider()).catch(() => undefined)
}

export const createUserForAuth = (data) => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((result) => {
      updateProfile(result.user, {
        displayName: `${data.first_name} ${data.last_name}`,
      }).catch((err) => console.log(err))
    })
    .catch((error) => {
      console.log(error)
    })
}

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password).catch(
    (err) => {
      return err
    }
  )
}

export const logout = () => signOut(auth)
