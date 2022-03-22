import { CloseIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Circle,
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Center,
  IconButton,
} from "@chakra-ui/react";
import usePlay from "../decks/PlayContext";
import { useState } from "react";
import MarkDown from "../MarkDown";
import Divider from "../Divider";
import styles from "../../styles/CardPlay.module.scss";
import ReactCardFlip from "react-card-flip";
import cn from "classnames";
export default function CardPlay({ deckCards, deckData }) {
  console.log(deckCards);
  const { setPlay } = usePlay();
  const [finished, setFinished] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  function handleFlip() {
    setShowBack(!showBack);
  }

  function handleIndex() {
    if (cardIndex < deckCards.length) setCardIndex(cardIndex + 1);
    else setFinished(true);
  }
  console.log(cardIndex);
  return (
    <Box minH={"100vh"} bg={"gray.300"} p={6}>
      <Flex gap={3} alignItems={"center"} mb={"3rem"}>
        <Circle
          size="40px"
          bg="white"
          color="gray.900"
          onClick={() => setPlay(false)}
          _hover={{ cursor: "pointer" }}
        >
          <CloseIcon />
        </Circle>

        <Text fontSize={"1.5rem"} fontColor={"gray.900"}>
          By @{deckData.username}
        </Text>
      </Flex>
      <Center>
        <Box className={styles["flip-card-outer"]}>
          <Box
            className={`${styles["flip-card-inner"]} ${
              showBack ? styles["showBack"] : ""
            }`}
          >
            <Box className={`${styles["card"]} ${styles["front"]}`}>
              <MarkDown>{deckCards[cardIndex].front}</MarkDown>
              <Divider my={4} />
              <Button rightIcon={<ArrowForwardIcon />} onClick={handleFlip}>
                <Text>Show answer</Text>
              </Button>
            </Box>
            <Box className={`${styles["card"]} ${styles["back"]}`}>
              <MarkDown>{deckCards[cardIndex].back}</MarkDown>
              <Divider my={4} />
              <Button rightIcon={<ArrowBackIcon />} onClick={handleFlip}>
                <Text>Go Back</Text>
              </Button>
              <Button
                rightIcon={<ArrowForwardIcon />}
                onClick={() => {
                  handleFlip();
                  handleIndex();
                }}
              >
                <Text>Continue</Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
