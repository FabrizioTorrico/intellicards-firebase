import { IoHeartOutline, IoTrash } from "react-icons/io5";
import { Button, IconButton, Text, Box, Flex, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export default function DeckPreview({ deckData, id }) {
  const { created_at, title, deckId, heart_count, username } = deckData;

  return (
    <NextLink href={`/${username}/decks/${deckId}`}>
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
