import { Box, Heading, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import Container from "../../hocs/Container";
import Card from "./CardPreview";

export default function CardList({ deckCards }) {
  return (
    <Container py={{ base: 14, md: 24 }}>
      <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"} my={5}>
        Cards
      </Heading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        autoRows={"10px"}
        overflow="hidden"
        justifyItems={["center", "baseline"]}
      >
        {!deckCards || (Array.isArray(deckCards) && deckCards.length === 0) ? (
          <GridItem gridRowEnd={"span 4"}>
            <Text fontSize="2xl">There is no cards!</Text>
          </GridItem>
        ) : (
          deckCards.map((card, i) => <Card title={card.title} key={i} />)
        )}
      </Grid>
    </Container>
  );
}
