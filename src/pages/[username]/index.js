import {
  getUsernamePaths,
  getUserWithUsername,
} from "../../firebase/firestore";
import Layout from "../../hocs/Layout";
export default function UserPage({ userProps }) {
  console.log(JSON.parse(userProps));
  return <Layout>index </Layout>;
}

export const getStaticPaths = async () => {
  const paths = await getUsernamePaths();
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const userData = await getUserWithUsername(context.params.username);

  return { props: { userProps: JSON.stringify(userData) || null } };
};
