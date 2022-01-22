import { Heading, Text, HStack, Container } from "@chakra-ui/react";
export default function ({ title, description }) {
  return (
    <Container maxW={"5xl"} py="4rem">
      <HStack alignItems="center">
        <Heading fontSize={{ base: "3xl", md: "5xl" }} flex={1}>
          {title}
        </Heading>
        <Text flex={1} fontSize={"xl"}>
          {description}
        </Text>
      </HStack>
    </Container>
  );
}
