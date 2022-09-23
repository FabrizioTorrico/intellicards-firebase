import Layout from '../lib/Layout'
import DisconnectedPage from '../components/Unauthenticated/DisconnectedPage'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAuth } from '@context/AuthContext'

export default function Home() {
  const router = useRouter()
  const { currentUserData } = useAuth()

  useEffect(() => {
    if (currentUserData) {
      toast.promise(
        router.push(`/${currentUserData.username}`),
        {
          success: <b>User loaded!</b>,
          loading: <b>Loading user...</b>,
          error: <b>Could not load user.</b>,
        },
        { id: 'loadingUser' }
      )
    }
  }, [currentUserData, router])

  return (
    <Layout home>
      <DisconnectedPage />
    </Layout>
  )
}
