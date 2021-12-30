import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Login() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      my={{ base: 0, md: 16 }}
      _before={{
        content: "''",
        background: "transparent no-repeat center center scroll",
        height: "1000px",
        width: "100%",
        backgroundSize: "contain",
        backgroundImage: "url('/fondologin.png')",
        position: "absolute",
        zIndex: "-1",
      }}
    >
      <Stack spacing={8} maxW={"lg"} py={{ base: 0, md: 12 }} px={6}>
        <Stack align={"center"} textAlign={"center"}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            data-aos="fade-down"
          >
            Ready to{" "}
            <Text as="span" color="main.500">
              Reach
            </Text>{" "}
            your goals?
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"2xl"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <NextLink href="/#">
                  <Link color={"main.600"}>Forgot password?</Link>
                </NextLink>
              </Stack>
              <Button colorScheme={"main.yellow"} color={"white"}>
                Log in
              </Button>
              <hr class="solid" />
              <Button colorScheme={"main"} color={"white"}>
                Create new account
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
