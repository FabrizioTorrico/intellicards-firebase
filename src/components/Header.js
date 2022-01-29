import { Heading, Text, Stack, Box } from "@chakra-ui/react";
export default function ({ title, description }) {
  return (
    <Box pb="4rem">
      <Stack direction={{ base: "column", md: "row" }} alignItems="center">
        <Heading fontSize="5xl" flex={1}>
          {title}
        </Heading>
        <Text flex={1} fontSize={"xl"}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
}
