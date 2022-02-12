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
import Container from "../hocs/Container";
export default function Hero({ title, text }) {
  return (
    <Box bgGradient="linear(main.600, main.500)" w="100%" h="20vh">
      <Container maxW="2xl">
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
              {text}
            </Text>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
