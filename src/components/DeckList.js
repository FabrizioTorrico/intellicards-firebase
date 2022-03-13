import Container from "../hocs/Container";
import {
  Text,
  Box,
  Stack,
  Heading,
  Flex,
  transition,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoHeartOutline } from "react-icons/io5";

function Deck({ deckData, id, admin }) {
  const { created_at, title, query, heart_count, username } = deckData;

  return (
    <NextLink href={`/${username}/decks/${query}`}>
      <a>
        <Box
          border="2px"
          borderColor={"gray.300"}
          borderRadius="10px"
          _hover={{
            borderColor: "main.500",
            color: "main.500",
            transition: "all 0.2s",
          }}
        >
          <Flex
            p={{ base: 4, md: 8 }}
            gap={{ base: 4, md: 8 }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Text
              fontWeight={600}
              fontSize={"3xl"}
              lineHeight={"110%"}
              color="gray.500"
            >
              {id}
            </Text>
            <Text fontWeight={600} fontSize={{ base: "lg", md: "2xl" }}>
              {title}
            </Text>
            <Spacer />
            <Box position="relative" top="2px">
              <IoHeartOutline size={"32px"} />
            </Box>
            <Text fontSize="2rem">{heart_count}</Text>
          </Flex>
        </Box>
      </a>
    </NextLink>
  );
}

export default function DeckList({ userDecks }) {
  console.log(userDecks);

  const renderDecks = () => {
    console.log(userDecks);

    if (!userDecks || userDecks === []) return;
    return userDecks.map((deck, i) => (
      <Deck key={i} deckData={deck} id={i + 1} />
    ));
  };

  return (
    <Container maxW={{ base: "md", md: "4xl" }}>
      <Stack spacing={{ base: 4, md: 5 }} py={{ base: 8, md: 14 }}>
        <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
          Decks
        </Heading>
        {renderDecks()}
      </Stack>
    </Container>
  );
}
