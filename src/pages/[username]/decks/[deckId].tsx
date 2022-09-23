import Layout from '../../../lib/Layout'
import CardList from '../../../components/cards/cardAside/CardList'
import {
  getDeckCards,
  getDeckData,
  getUidWithUsername,
} from '../../../database/firestore'
import { useAuth } from '@context/AuthContext'
import { useEffect, useState } from 'react'
/* import usePlay from '../../../components/play/PlayContext'
import PlayCard from '../../../components/play/PlayCard' */
import CardContent from '../../../components/cards/CardContent'
import CardForm from '../../../components/cards/CardForm'

import { Box } from '@chakra-ui/layout'
import { useCard, useDeck } from 'src/context'

export default function DeckId({ deckProps }) {
  const { deckData, deckCards, deckUid } = JSON.parse(deckProps)
  const { setCards, createCard } = useCard()
  const { setDeckData } = useDeck()
  const { currentUser } = useAuth()
  const [admin, setAdmin] = useState(false)
  const { cards, cardListOpen } = useCard()

  useEffect(() => {
    setCards(deckCards)
    setDeckData(deckData)
  }, [])

  useEffect(() => {
    setAdmin(deckUid === currentUser?.uid)
  }, [deckUid, currentUser?.uid])

  return (
    <Layout noFooter priv>
      <Box
        ml={{ md: cardListOpen ? 80 : 16 }}
        transition="margin-left 1s"
        minH="85vh"
        position="relative"
      >
        {admin &&
        (createCard || (Array.isArray(cards) && cards.length === 0)) ? (
          <CardForm />
        ) : (
          <CardContent />
        )}
      </Box>
      <CardList admin={admin} deckId={deckData.deckId} />
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