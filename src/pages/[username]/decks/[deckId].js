import Layout from '../../../hocs/Layout'
import CardList from '../../../components/cards/CardList'
import {
  getDeckCards,
  getRealTimeCardList,
  getDeckData,
  getUidWithUsername,
} from '../../../firebase/firestore'
import { useAuth } from '../../../firebase/auth'
import { useEffect, useState } from 'react'
/* import usePlay from '../../../components/play/PlayContext'
import PlayCard from '../../../components/play/PlayCard' */
import CardContent from '../../../components/cards/CardContent'
import CardForm from '../../../components/cards/CardForm'
import { useCard } from '../../../components/cards/CardContext'

import { Box } from '@chakra-ui/layout'

export default function DeckId({ deckProps }) {
  const { deckData, deckCards, deckUid } = JSON.parse(deckProps)
  const { setCards, createCard } = useCard()
  const { currentUser } = useAuth()
  const [admin, setAdmin] = useState(false)
  const { cards } = useCard()
  // const shuffledCards = cards?.sort((a, b) => 0.5 - Math.random());

  useEffect(() => {
    setCards(deckCards)
  }, [])

  useEffect(() => {
    setAdmin(deckUid === currentUser?.uid)

    if (admin) {
      return getRealTimeCardList(deckData.deckId, setCards)
    }
  }, [deckUid, currentUser?.uid])

  return (
    <Layout>
      <CardList admin={admin} deckId={deckData.deckId} />
      <Box ml={80} minH="85vh" position="relative">
        {createCard || (Array.isArray(cards) && cards.length === 0) ? (
          <CardForm />
        ) : (
          <CardContent deckData={deckData} />
        )}
      </Box>
      {/* <DeckHeader deckData={deckData} deckUid={deckUid} admin={admin} /> */}
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { username, deckId } = query
  const deckUid = await getUidWithUsername(username)
  if (!deckUid)
    return {
      notFound: true,
    }
  const deckData = await getDeckData(deckUid, deckId)
  if (!deckData)
    return {
      notFound: true,
    }
  const deckCards = await getDeckCards(deckUid, deckId)

  return {
    props: {
      deckProps: JSON.stringify({ deckData, deckCards, deckUid }) || null,
    },
  }
}

/* export const getStaticPaths = async () => {
  const paths = await getUserDeckPaths();
  console.log("paths: ", paths);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { username, deckId } = params;

  const deckUid = await getUidWithUsername(username);
  const deckData = await getDeckData(deckUid, deckId);
  const deckCards = await getDeckCards(deckUid, deckId);

  return {
    props: {
      deckProps: JSON.stringify({ deckData, deckCards, deckUid }) || null,
    },
  };
}; */
