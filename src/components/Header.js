import { Heading, Text, Stack, Box } from "@chakra-ui/react";
export default function ({ title, secondary, pb, py, textAlign }) {
  return (
    <Box
      pb={"4rem"}
      py={py ? py : null}
      textAlign={textAlign ? textAlign : "inherit"}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        spacing={"6rem"}
      >
        <Heading fontSize="5xl" flex={1}>
          {title}
        </Heading>
        <Box flex={1} fontSize={"xl"}>
          {secondary}
        </Box>
      </Stack>
    </Box>
  );
}
