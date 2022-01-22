import { Stack, Container } from "@chakra-ui/react";

export default function ({ children, bg }) {
  return (
    <Stack align={"center"} py={{ base: 8, md: 16 }} bg={bg}>
      <Container maxW={"5xl"}>{children}</Container>
    </Stack>
  );
}
