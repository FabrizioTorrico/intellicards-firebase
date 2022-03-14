import Layout from "../../../hocs/Layout";
import DeckData from "../../../components/DeckData";
import CardList from "../../../components/cards/CardList";
import {
  getDeckCards,
  getDeckData,
  getUserDeckPaths,
  getUidWithUsername,
} from "../../../firebase/firestore";

export default function DeckCard({ deckProps }) {
  const { deckData, deckCards } = JSON.parse(deckProps);
  console.log("deckData: ", deckData);
  console.log("deckCards: ", deckCards);

  return (
    <Layout>
      <DeckData {...deckData} />
      <CardList deckCards={deckCards} />
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
