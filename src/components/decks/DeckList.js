import Container from "../../hocs/Container";
import { Text, Box, Stack, Heading } from "@chakra-ui/react";
import Deck from "./Deck";
export default function DeckList({ userDecks }) {
  const renderDecks = () => {
    console.log(userDecks);
    if (!userDecks || userDecks === []) return;
    return userDecks.map((deck, i) => (
      <Deck key={deck.creation_date} id={i} title={deck.title} />
    ));
  };

  return (
    <Container>
      <Stack spacing={{ base: 4, md: 5 }} py={{ base: 8, md: 14 }}>
        <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
          My Decks
        </Heading>
        {renderDecks()}
      </Stack>
    </Container>
  );
}
