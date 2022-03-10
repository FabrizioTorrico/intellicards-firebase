import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Box, Button, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import Container from "../../hocs/Container";
import { useState } from "react";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default function Play() {
  const [index, setIndex] = useState(0);
  const [face, setFace] = useState("front");
  const router = useRouter();
  const { id } = router.query;
  const deckData = useSelector((state) => state.user.decks?.[id]);
  const { cards, title } = deckData ?? { cards: "", title: "" };

  shuffleArray(cards);

  function renderButton() {
    return face === "front" ? (
      <Button
        bg="gray.900"
        w="100%"
        h="15vh"
        position="fixed"
        bottom="0"
        left="0"
        zIndex={10}
        colorScheme="Black"
        onClick={() =>
          index < cards.length - 1 ? setFace("back") : router.push(`/decks`)
        }
      >
        <Text float="right">Click aqui para continuar</Text>
      </Button>
    ) : (
      <Button
        bg="gray.900"
        w="100%"
        h="15vh"
        position="fixed"
        bottom="0"
        left="0"
        zIndex={10}
        colorScheme="Black"
        onClick={() => {
          if (index < cards.length - 1) {
            setIndex(index + 1);
            setFace("front");
          } else {
            router.push(`/decks`);
          }
        }}
      >
        <Text float="right">Click aqui para continuar</Text>
      </Button>
    );
  }

  return (
    <>
      <Box
        bgGradient="linear(main.600, main.500)"
        w="100%"
        h="100vh"
        position="fixed"
        top="0"
        left="0"
        zIndex={-10}
      ></Box>
      <Container pt="10rem" pb="20vh" maxW={"3xl"}>
        <Text fontSize="1.5rem " color="white" textAlign={"center"}>
          {!cards || (Array.isArray(cards) && cards.length === 0)
            ? "There is no cards :("
            : cards[index][face]}
        </Text>
      </Container>
      {renderButton()}
    </>
  );
}
