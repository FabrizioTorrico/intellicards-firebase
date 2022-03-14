import Layout from "../../../hocs/Layout";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.scss";
import { Box, Heading, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import Container from "../../../hocs/Container";
import Header from "../../../components/Header";
import NextLink from "next/link";
import Card from "../../../components/cards/CardPreview";
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

  const { title } = deckData;
  return (
    <Layout>
      <Box
        bgGradient="linear(main.600, main.500)"
        w="100%"
        color="white"
        position="relative"
      >
        <Container>
          <Header
            title={title}
            description={
              <NextLink href={`/play/2`}>
                <Button colorScheme="main.yellow" borderRadius={"50px"}>
                  Play Now
                </Button>
              </NextLink>
            }
          ></Header>
        </Container>
        <div className={styles.wave2}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={styles["shape-fill"]}
            ></path>
          </svg>
        </div>
      </Box>
      <Container>
        <Grid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          autoRows={"10px"}
          overflow="hidden"
          justifyItems={["center", "baseline"]}
        >
          {!deckCards ||
          (Array.isArray(deckCards) && deckCards.length === 0) ? (
            <GridItem gridRowEnd={"span 4"}>
              <Text fontSize="2xl">There is no cards!</Text>
            </GridItem>
          ) : (
            deckCards.map((card, i) => <Card title={card.title} key={i} />)
          )}
        </Grid>
      </Container>
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
