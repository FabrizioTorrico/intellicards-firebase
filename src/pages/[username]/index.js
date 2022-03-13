import {
  getUsernamePaths,
  getUidWithUsername,
  getUserData,
  getUserDecks,
} from "../../firebase/firestore";
import Layout from "../../hocs/Layout";
import Hero from "../../components/Hero";
import UserCard from "../../components/UserCard";
import DeckList from "../../components/DeckList";

export default function UserPage({ userProps }) {
  const user = JSON.parse(userProps);
  console.log(user);
  return (
    <Layout>
      <Hero title={<UserCard user={user.userData} />} />
      <DeckList userDecks={user.userDecks} />
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
    props: { userProps: JSON.stringify({ userData, userDecks }) || null },
  };
};