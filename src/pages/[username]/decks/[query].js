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
import { useEffect, useState } from "react";

export default function DeckCard({ deckProps }) {
  const { deckData, deckCards } = JSON.parse(deckProps);
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState(false);
  //checks if uid is equal deckUid
  useEffect(() => {
    (async () => {
      const deckUid = await getUidWithUsername(deckData.username);
      setAdmin(deckUid === currentUser.uid);
    })();
  }, []);

  return (
    <Layout>
      <DeckHeader {...deckData} />
      <CardList deckCards={deckCards} deckName={deckData.query} admin={admin} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await getUserDeckPaths();
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const { username, query } = params;
  const uid = await getUidWithUsername(username);
  const deckData = await getDeckData(uid, query);
  const deckCards = await getDeckCards(uid, query);

  return {
    props: { deckProps: JSON.stringify({ deckData, deckCards }) || null },
  };
};
