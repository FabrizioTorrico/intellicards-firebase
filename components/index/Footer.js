import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Center,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <>
      <Center bg="main.purple" h={200} color="white">
        {" "}
        Alguna imagen de fondo fijada
      </Center>
      <Box bg="gray.900" color="gray.200">
        <Container
          as={Stack}
          maxW={"4xl"}
          py={8}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © 2021 Intellicards. All rights reserved. Web Design & Development
            by Fabrizio Torrico.
          </Text>
          <Stack direction={"row"} spacing={3} fontSize="2xl">
            <SocialButton label={"Twitter"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
