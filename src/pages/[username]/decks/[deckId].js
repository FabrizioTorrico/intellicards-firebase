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
  console.log(deckData);
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    //checks if uid is equal deckUid
    (async () => {
      const deckUid = await getUidWithUsername(deckData.username);
      setAdmin(deckUid === currentUser.uid);
    })();
  }, []);

  return (
    <Layout>
      <DeckHeader {...deckData} />
      <CardList deckCards={deckCards} admin={admin} />
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
  console.log(deckData);

  return {
    props: { deckProps: JSON.stringify({ deckData, deckCards }) || null },
  };
};
