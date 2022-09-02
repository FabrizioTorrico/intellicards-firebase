import { createContext, useContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth } from './index'
import { getUserData } from './firestore'
import Layout from '../lib/Layout'
import CompleteLogin from '../components/Unauthenticated/CompleteLogin'
// import toast from 'react-hot-toast'

interface AuthContextProps {
  currentUser: User | null
  currentUserData: any
  refreshUserData: (uid: number) => void
}
const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  currentUserData: null,
  refreshUserData: () => {},
})

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [currentUserData, setCurrentUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  async function refreshUserData(uid: number) {
    setCurrentUserData(await getUserData(uid))
  }

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      setLoading(true)
      if (!user) {
        setCurrentUser(null)
        setCurrentUserData(null)
        setLoading(false)
        return
      }
      // const token = await user.getIdToken()
      setCurrentUser(user)
      setCurrentUserData(await getUserData(user.uid))
      setLoading(false)
    })
  }, [])

  /* function PageToRender() {
    if (!currentUserData) {
      return (
        <Layout home>
          {!currentUser || loading ? (
            <DisconnectedPage loading={loading} />
          ) : (
            <CompleteLogin />
          )}
        </Layout>
      );
    } else return children;
  } */

  function PageToRender() {
    if (!currentUserData && currentUser && !loading) {
      return (
        <Layout>
          <CompleteLogin />
        </Layout>
      )
    }
    return children
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, currentUserData, refreshUserData }}
    >
      <PageToRender />
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)

export const loginWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider()).catch((error) =>
    console.log(error)
  )
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

export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password).catch(
    (err) => {
      return err
    }
  )
}

export const logout = () => signOut(auth)
