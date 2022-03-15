import { Stack, Container } from "@chakra-ui/react";

export default function ({ children, bg, pt, pb, maxW, py }) {
  return (
    <Stack
      align={"center"}
      pt={pt ? pt : { base: 8, md: 16 }}
      pb={pb ? pb : { base: 8, md: 16 }}
      bg={bg}
      py={py}
    >
      <Container maxW={maxW ? maxW : { base: "xl", md: "4xl" }}>
        {children}
      </Container>
    </Stack>
  );
}
