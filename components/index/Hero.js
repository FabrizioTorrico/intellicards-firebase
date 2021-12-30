import {
  Flex,
  Container,
  Stack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

export default function Hero({ title, text }) {
  return (
    <Container maxW={"5xl"} /* backgroundImage="url('/images/kyuubi.png') "*/>
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
          <Button rounded={"full"} px={6} colorScheme={"main"}>
            Start now
          </Button>
          <Button rounded={"full"} px={6}>
            Learn more
          </Button>
        </Stack>
        <Flex w={"full"}></Flex>
      </Stack>
    </Container>
  );
}
