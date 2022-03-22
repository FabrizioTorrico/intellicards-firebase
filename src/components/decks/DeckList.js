import Container from "../../hocs/Container";
import { Text, Stack, Heading } from "@chakra-ui/react";
import DeckPreview from "./DeckPreview";
import DeckForm from "./DeckForm";
import { useState, useEffect } from "react";
import { getRealTimeDeckList } from "../../firebase/firestore";
export default function DeckList({ userDecks, admin }) {
  console.log("decklist rendered");
  const [deckList, setDeckList] = useState(userDecks);

  useEffect(() => {
    if (admin) return getRealTimeDeckList(setDeckList);
  }, [admin]);

  const renderDecks = () => {
    if (!deckList || (Array.isArray(deckList) && deckList.length === 0))
      return (
        <Text color="gray.600" fontSize={{ base: "lg", md: "2xl" }}>
          There is no Decks!
        </Text>
      );

    return deckList.map((deck, i) => (
      <DeckPreview key={i} deckData={deck} id={i + 1} />
    ));
  };

  return (
    <Container maxW={{ base: "md", md: "4xl" }}>
      <Stack spacing={{ base: 4, md: 5 }} py={{ base: 8, md: 12 }}>
        <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
          Decks
        </Heading>
        {admin && <DeckForm />}
        {renderDecks()}
      </Stack>
    </Container>
  );
}
