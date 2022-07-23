import Layout from "../../../hocs/Layout";
import DeckHeader from "../../../components/decks/DeckHeader";
import CardList from "../../../components/cards/CardList";
import {
  getDeckCards,
  getDeckData,
  getUserDeckPaths,
  getUidWithUsername,
} from "../../../firebase/firestore";
import { useAuth } from "../../../firebase/auth";
import { useEffect, useState, useRef } from "react";
import { Stack, Heading, Container } from "@chakra-ui/react";
import CardForm from "../../../components/cards/CardForm";
import usePlay from "../../../components/play/PlayContext";
import PlayCard from "../../../components/play/PlayCard";
import { getRealTimeCardList } from "../../../firebase/firestore";

export default function DeckId({ deckProps }) {
  const { deckData, deckCards, deckUid } = JSON.parse(deckProps);
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState(false);
  const { playActive } = usePlay();
  const [cards, setCards] = useState(deckCards);
  const shuffledCards = cards?.sort((a, b) => 0.5 - Math.random());

  useEffect(() => {
    setAdmin(deckUid === currentUser?.uid);
    if (admin) {
      return getRealTimeCardList(deckData.deckId, setCards);
    }
  }, [admin, currentUser?.uid, deckData.deckId, deckUid]);

  return playActive && cards.length > 0 ? (
    <PlayCard cards={shuffledCards} deckData={deckData} />
  ) : (
    <Layout priv>
      <CardList cards={cards} admin={admin} deckId={deckData.deckId} />
      <DeckHeader deckData={deckData} deckUid={deckUid} admin={admin} />
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { username, deckId } = query;
  const deckUid = await getUidWithUsername(username);
  if (!deckUid)
    return {
      notFound: true,
    };
  const deckData = await getDeckData(deckUid, deckId);
  if (!deckData)
    return {
      notFound: true,
    };
  const deckCards = await getDeckCards(deckUid, deckId);

  return {
    props: {
      deckProps: JSON.stringify({ deckData, deckCards, deckUid }) || null,
    },
  };
};

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
