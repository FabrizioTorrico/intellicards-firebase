import Container from "../../hocs/Container";
import Header from "../Header";
import NextLink from "next/link";
import {
  Button,
  Box,
  Stack,
  Text,
  Link,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.scss";
import {
  deleteDeck,
  getRealTimeDeck,
  getRealTimeHeart,
} from "../../firebase/firestore";
import HeartButton from "../HeartButton";
import { useState, useEffect } from "react";
import usePlay from "./PlayContext";

function DeckStats({ deckUid, deckId, heart_count }) {
  const { setPlay } = usePlay();
  const [myHeart, setMyHeart] = useState(null);
  useEffect(() => {
    return getRealTimeHeart(deckUid, deckId, setMyHeart);
  }, []);

  return (
    <Grid templateColumns="1fr 1fr" fontSize={"xl"} gap={6}>
      <GridItem>
        <HeartButton deckUid={deckUid} deckId={deckId} myHeart={myHeart} />{" "}
      </GridItem>
      <GridItem alignSelf="center" justifySelf="center">
        <Text>{heart_count} hearts</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Button
          colorScheme="main.yellow"
          width="100%"
          height="3rem"
          rounded="full"
          onClick={() => setPlay(true)}
        >
          Play now
        </Button>
      </GridItem>
    </Grid>
  );
}

/**
 * uses the deckData and deckUid to get real time deck data
 * @param {props} props 
 */
export default function DeckHeader({ deckData, deckUid }) {
  const [realTimeDeck, setRealTimeDeck] = useState(deckData);
  const { title, username, heart_count, created_at, deckId } = realTimeDeck;

  useEffect(() => {
    return getRealTimeDeck(deckUid, deckId, setRealTimeDeck);
  }, []);

  return (
    <Box
      bgGradient="linear(main.600, main.500)"
      w="100%"
      color="white"
      position="relative"
    >
      <Container>
        <Text mb="2rem" fontSize="xl">
          Created by{" "}
          <NextLink href={`/${username}`}>
            <Link>@{username}</Link>
          </NextLink>
        </Text>
        <Header
          title={title}
          secondary={
            <DeckStats
              deckUid={deckUid}
              deckId={deckId}
              heart_count={heart_count}
            />
          }
        ></Header>
      </Container>
      <div className={styles.wave2} id="card-form">
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
  );
}
