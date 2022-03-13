import Layout from "../../../hocs/Layout";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.scss";
import { Box, Heading, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import Container from "../../../hocs/Container";
import Header from "../../../components/Header";
import NextLink from "next/link";
import Card from "../../../components/cards/CardPreview";

export default function DeckCard({ deckProps }) {
  const router = useRouter();
  const { id } = router.query;
  const { cards, title } = {
    cards: [
      { title: "algun titulo", desc: "descendiente" },
      {
        title:
          "Exercitation ullamco quis reprehenderit incididunt. Nisi laboris est ullamco ea ea ea anim elit exercitation minim aliquip consectetur sint. Pariatur non enim reprehenderit sunt excepteur eu. Quis magna occaecat culpa voluptate dolore commodo dolore consequat eiusmod exercitation do.o",
      },
      {
        title:
          "Pariatur eu amet reprehenderit nisi ad aliqua quis Lorem duis. Qui ipsum qui Lorem velit labore quis consectetur occaecat nisi deserunt. Enim excepteur esse officia aliquip minim laboris aute. Est sit irure aliquip eiusmod elit ipsum aute voluptate. Magna anim aliqua velit aute proident tempor occaecat in velit et est. Proident occaecat consectetur ad aute incididunt qui amet aute ipsum commodo mollit.",
      },
      { title: "algun titulo" },
      {
        title:
          "Commodo minim ut ullamco ipsum irure nisi ut reprehenderit occaecat id aute officia. Exercitation laborum duis laborum ex qui minim reprehenderit ut excepteur dolor occaecat veniam. Veniam voluptate esse aute deserunt reprehenderit ex exercitation exercitation.",
      },
      { title: "algun titulo" },
      { title: "algun titulo" },
    ],
    title: "Fundamentos de Compus",
  };

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
              <NextLink href={`/play/${id}`}>
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
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          autoRows={"10px"}
          overflow="hidden"
          justifyItems={["center", "baseline"]}
        >
          {cards.map((card, i) => (
            <Card title={card.title} key={i} />
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
