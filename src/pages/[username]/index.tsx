import { getUidWithUsername, getUserData } from '@database/users'
import { getUserDecks } from '@database/decks'
import Layout from '../../lib/Layout'
import Hero from '../../lib/Hero'
import UserHeader from '../../components/UserHeader'
import DeckList from '../../components/decks/DeckList'
import { useAuth } from '@context/AuthContext'
import { useEffect, useState } from 'react'

export default function UserPage({ userProps }) {
  const { userData, userDecks, userId } = JSON.parse(userProps)
  const { currentUser, setAdmin } = useAuth()

  useEffect(() => {
    setAdmin(userId === currentUser?.uid)
  }, [userId, currentUser?.uid])

  return (
    <Layout priv>
      <Hero title={<UserHeader user={userData} />} />
      <DeckList userDecks={userDecks} />
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { username } = query
  const uid = await getUidWithUsername(username)

  if (!uid) {
    return {
      notFound: true,
    }
  }
  const userData = await getUserData(uid)
  const userDecks = await getUserDecks(uid)

  return {
    props: {
      userProps: JSON.stringify({ userData, userDecks, userId: uid }) || null,
    },
  }
}
/* export const getStaticPaths = async () => {
  const paths = await getUsernamePaths();
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const uid = await getUidWithUsername(context.params.username);
  const userData = await getUserData(uid);
  const userDecks = await getUserDecks(uid);

  return {
    props: {
      userProps: JSON.stringify({ userData, userDecks, userId: uid }) || null,
    },
  };
}; */
