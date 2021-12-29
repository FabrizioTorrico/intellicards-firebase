import { Box, Flex, Center, Text } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
export default function FeatureCard({ text }) {
  return (
    <Flex
      //   maxW={"320px"}
      w={"full"}
      boxShadow={"lg"}
      rounded={"md"}
      align={"center"}
      bg="main.purple"
    >
      <Center h="3rem" bg="white" p="2rem" mr="1.5rem">
        <CheckIcon />
      </Center>

      <Box color="white">
        <Text fontSize="lg">{text}</Text>
      </Box>
    </Flex>
  );
}
