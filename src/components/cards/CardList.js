import Container from "../../hocs/Container";
import { Text, Stack, Heading, Box } from "@chakra-ui/react";
import CardPreview from "./CardPreview";
import CardForm from "./CardForm";
import { useEffect, useRef, useState } from "react";

export default function CardList({ cards, deckId, admin }) {
  const [top, setTop] = useState(0);
  useEffect(() => {
    setTop(document.querySelector("#navbar").clientHeight);
  }, []);

  function renderCards() {
    // if (!cards || (Array.isArray(cards) && cards.length === 0))
    //   return (
    //     <Text color="gray.600" fontSize={{ base: "lg", md: "2xl" }}>
    //       There is no Cards!
    //     </Text>
    //   );

    return cards.map((card, i) => (
      <CardPreview key={i} deckId={deckId} cardData={card} admin={admin} />
    ));
  }

  return (
    <Box
      maxW={{ base: "md", md: "2xl" }}
      position="fixed"
      top={top + "px"}
      left={0}
      bg="white"
      zIndex={50}
      py={8}
      px={12}
    >
      {/* <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
        Cards
      </Heading> */}
      {/* {admin && <CardForm />} */}
      {renderCards()}
    </Box>
  );
}
