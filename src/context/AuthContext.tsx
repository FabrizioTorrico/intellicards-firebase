import { createContext, useContext, useEffect, useState } from 'react'

import { User } from 'firebase/auth'
import { getUserData } from '@database/users'
import Layout from '../lib/Layout'
import CompleteLogin from '../components/Unauthenticated/CompleteLogin'
import { UserData } from '@models/users'
import { auth } from 'src/database/'
// import toast from 'react-hot-toast'

interface AuthContextProps {
  currentUser: User | null
  currentUserData: UserData | null
  refreshUserData: (uid: string) => void
  isAdmin: boolean
  setAdmin: (isAdmin: boolean) => void
}
const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  currentUserData: null,
  refreshUserData: () => null,
  isAdmin: false,
  setAdmin: () => null,
})

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [currentUserData, setCurrentUserData] = useState<UserData>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setAdmin] = useState(false)

  async function refreshUserData(uid: string) {
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
      value={{
        currentUser,
        currentUserData,
        refreshUserData,
        isAdmin,
        setAdmin,
      }}
    >
      <PageToRender />
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
