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
import usePlay from "../../../components/decks/PlayContext";
import PlayCard from "../../../components/play/PlayCard";
export default function DeckCard({ deckProps }) {
  const { deckData, deckCards, deckUid } = JSON.parse(deckProps);
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState(false);
  const { play } = usePlay();
  const shuffledCards = deckCards.sort((a, b) => 0.5 - Math.random());
  useEffect(() => {
    setAdmin(deckUid === currentUser.uid);
  }, []);

  return play ? (
    <PlayCard deckCards={shuffledCards} deckData={deckData} />
  ) : (
    <Layout>
      <DeckHeader deckData={deckData} deckUid={deckUid} admin={admin} />
      <CardList deckCards={deckCards} deckId={deckData.deckId} admin={admin} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await getUserDeckPaths();
  console.log("paths: ", paths);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { username, deckId } = params;
  console.log("params: ", username, deckId);
  const uid = await getUidWithUsername(username);
  const deckData = await getDeckData(uid, deckId);
  const deckCards = await getDeckCards(uid, deckId);
  const deckUid = await getUidWithUsername(deckData.username);

  return {
    props: {
      deckProps: JSON.stringify({ deckData, deckCards, deckUid }) || null,
    },
  };
};
