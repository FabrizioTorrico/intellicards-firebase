import {
  Flex,
  Container,
  Stack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import scroll from "../scroll";

export default function Hero({ title, text }) {
  return (
    <Container maxW={"5xl"} minH={"60vh"} pt="15vh">
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 8, md: 14 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          {title}
        </Heading>
        <Text
          color={"gray.500"}
          maxW={"3xl"}
          fontSize={{ base: "md", md: "2xl" }}
        >
          {text}
        </Text>
        <Stack spacing={6} direction={"row"}>
          <a href="/" onClick={(e) => scroll("start", e)}>
            <Button rounded={"full"} px={6} colorScheme={"main"}>
              Start now
            </Button>
          </a>
          <a href="/" onClick={(e) => scroll("about", e)}>
            <Button rounded={"full"} px={6}>
              Learn more
            </Button>
          </a>
        </Stack>
        <Flex w={"full"}></Flex>
      </Stack>
    </Container>
  );
}
