import { Box, Flex, Text, transition } from "@chakra-ui/react";
import NextLink from "next/link";
export default function Deck({ title, i }) {
  return (
    <NextLink href="decks/[id]" as={`decks/${title}`}>
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
          >
            <Text
              fontWeight={600}
              fontSize={"3xl"}
              lineHeight={"110%"}
              color="gray.500"
            >
              {i}
            </Text>
            <Text fontWeight={600} fontSize={"2xl"}>
              {title}
            </Text>
          </Flex>
        </Box>
      </a>
    </NextLink>
  );
}
