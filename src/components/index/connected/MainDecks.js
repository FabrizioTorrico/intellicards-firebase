import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Container from "../../../hocs/Container";
export default function MainDecks({ title, text }) {
  return (
    <Box bgGradient="linear(main.600, main.500)" w="100%" h="40vh">
      <Container>
        <InputGroup colorScheme="main">
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="main.600" />}
          />
          <Input
            type="search"
            placeholder="Search for Decks"
            bg="white"
            color={"main.600"}
          />
        </InputGroup>
      </Container>
      <Container pt={"0"}>
        <Box
          bg="white"
          w="100%"
          h="20vh"
          borderRadius={"10px"}
          boxShadow={"2xl"}
        >
          <Stack
            spacing={{ base: 8, md: 10 }}
            p={{ base: 8, md: 14 }}
            direction={"row"}
            alignItems={"center"}
          >
            <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
              {title}
            </Heading>
            <Text color="gray.500" fontSize={"xl"}>
              {" "}
              Ready for another studying lesson?
            </Text>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
