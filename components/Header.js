import {
  Flex,
  Spacer,
  Text,
  Button,
  Heading,
  useDisclosure,
  IconButton,
  Stack,
  Link,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import scroll from "./scroll";

const Links = ["Blog", "Help", "Team"];

const NavLink = ({ children }) => (
  <NextLink href={"/#"}>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.200",
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      py={3}
      px={{ base: 6, md: 32 }}
      w="100%"
      pos="fixed"
      bg="white"
      zIndex="10"
    >
      <Flex alignItems={"center"}>
        <Heading size="md" color="main.500">
          Intellicards
        </Heading>

        <Spacer />

        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          bg="white"
        />

        <Stack
          as={"nav"}
          display={{ base: "none", md: "flex" }}
          direction={"row"}
          alignItems={"center"}
        >
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
          <a href="/" onClick={(e) => scroll("start", e)}>
            <Button rounded={"full"} colorScheme={"main"}>
              Start now
            </Button>
          </a>
        </Stack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
