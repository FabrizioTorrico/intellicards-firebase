import Container from "../../hocs/Container";
import { Text, Stack, Heading } from "@chakra-ui/react";
import CardPreview from "./CardPreview";
import CardForm from "./CardForm";

export default function CardList({ cards, deckId, admin }) {
  function renderDecks() {
    if (!cards || (Array.isArray(cards) && cards.length === 0))
      return (
        <Text color="gray.600" fontSize={{ base: "lg", md: "2xl" }}>
          There is no Cards!
        </Text>
      );

    return cards.map((card, i) => (
      <CardPreview key={i} deckId={deckId} cardData={card} admin={admin} />
    ));
  }

  return (
    <Container maxW={{ base: "md", md: "4xl" }}>
      <Stack spacing={{ base: 4, md: 5 }} py={{ base: 8, md: 12 }}>
        <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
          Cards
        </Heading>
        {admin && <CardForm />}
        {renderDecks()}
      </Stack>
    </Container>
  );
}
