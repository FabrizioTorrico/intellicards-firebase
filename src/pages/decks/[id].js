import Layout from "../../hocs/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "../../styles/Home.module.scss";
import { Box, Heading, Button, SimpleGrid, Text } from "@chakra-ui/react";
import Container from "../../hocs/Container";
import Header from "../../components/Header";
import NextLink from "next/link";

export default function Deck() {
  const router = useRouter();
  const { id } = router.query;
  const deckData = useSelector((state) => state.user.decks?.[id]);
  const { cards, title } = deckData ?? { cards: "", title: "" };

  function Card({ title, desc, ...rest }) {
    return (
      <Box
        p={8}
        border="2px"
        borderColor="gray.400"
        flex="1"
        borderRadius="15px"
        {...rest}
      >
        <Text>{desc}</Text>
      </Box>
    );
  }

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
        <SimpleGrid
          columns={2}
          spacingX="40px"
          spacingY="20px"
          fontSize={"20px"}
        >
          {!cards || (Array.isArray(cards) && cards.length === 0) ? (
            <Text>There is no cards :(</Text>
          ) : (
            cards.map((card) => <Card desc={card.front} />)
          )}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
