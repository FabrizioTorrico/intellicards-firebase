import {
  getUsernamePaths,
  getUidWithUsername,
  getUserData,
  getUserDecks,
} from "../../firebase/firestore";
import Layout from "../../hocs/Layout";
import Hero from "../../components/Hero";
import UserHeader from "../../components/UserHeader";
import DeckList from "../../components/decks/DeckList";
import { useAuth } from "../../firebase/auth";
import { useEffect, useState } from "react";

export default function UserPage({ userProps }) {
  const { userData, userDecks, userId } = JSON.parse(userProps);
  const [admin, setAdmin] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setAdmin(userId === currentUser?.uid);
  }, []);

  return (
    <Layout priv>
      <Hero title={<UserHeader user={userData} admin={admin} />} />
      <DeckList userDecks={userDecks} admin={admin} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
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
};
