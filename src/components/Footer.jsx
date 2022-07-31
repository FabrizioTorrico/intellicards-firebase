import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Center bgGradient="linear(main.600, main.500)" h={200}>
        {" "}
      </Center>
      <Box bg="gray.900" color="gray.200">
        <Container
          as={Stack}
          maxW={"4xl"}
          py={8}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © 2022 Intellicards. All rights reserved. Web Design & Development
            by Fabrizio Torrico.
          </Text>
          <Stack direction={"row"} spacing={3} fontSize="3xl">
            <chakra.button
              label={"Twitter"}
              _hover={{ color: "twitter.400", transform: "scale(1.2)" }}
            >
              <FaTwitter />
            </chakra.button>
            <chakra.button
              label={"YouTube"}
              _hover={{ color: "red.400", transform: "scale(1.2)" }}
            >
              <FaYoutube />
            </chakra.button>
            <chakra.button
              label={"Instagram"}
              _hover={{ color: "purple.400", transform: "scale(1.2)" }}
            >
              <FaInstagram />
            </chakra.button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
