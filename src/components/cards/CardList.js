import { Box, Heading, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import Container from "../../hocs/Container";
import CardPreview from "./CardPreview";
export default function CardList({ deckCards, deckName, admin }) {
  return (
    <Container py={{ base: 14, md: 24 }}>
      <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"} my={5}>
        Cards
      </Heading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        autoRows={"10px"}
        overflow="hidden"
        justifyItems={{ base: "center", md: "baseline" }}
      >
        {!deckCards || (Array.isArray(deckCards) && deckCards.length === 0) ? (
          <GridItem gridRowEnd={"span 4"}>
            <Text fontSize="2xl" color="gray.600">
              There is no cards!
            </Text>
          </GridItem>
        ) : (
          deckCards.map((card, i) => (
            <CardPreview {...card} key={i} deckName={deckName} />
          ))
        )}
      </Grid>
    </Container>
  );
}
