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
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
<<<<<<< HEAD
import { HamburgerIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import NextLink from "next/link";
import scroll from "./scroll";
=======
import { useSelector, useDispatch } from "react-redux";
import { HamburgerIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import NextLink from "next/link";
import scroll from "./scroll";
import { logout } from "../state/auth/authActions";
>>>>>>> eb6522005b1f23b3249d00dad9b83f1e63545a5e

const links = ["Blog", "Help", "About"];

const NavLink = ({ children, link }) => (
  <NextLink href={`/${link.toLowerCase()}`}>
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

export default function NavBar({ home }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = false;

  return (
    <Box
      py={3}
      px={{ base: 6, md: 32 }}
      w="100%"
      pos="fixed"
      bg="white"
      zIndex="9999"
      boxShadow={home ? "" : "lg"}
    >
      <Flex alignItems={"center"}>
        <NextLink href={isAuthenticated ? "/decks" : "/#"}>
          <a>
            <Heading size="md" color="main.500">
              Intellicards
            </Heading>
          </a>
        </NextLink>

        {isAuthenticated ? (
          <InputGroup mx="4rem">
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="main.600" />}
            />
            <Input type="search" placeholder="Search for Decks" />
          </InputGroup>
        ) : (
          <Spacer />
        )}

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
          {links.map((link) => (
            <NavLink key={link} link={link}>
              {link}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <Button
              rounded={"full"}
              colorScheme={"main"}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          ) : (
            <NextLink href="/#login">
              <a>
                <Button
                  rounded={"full"}
                  colorScheme={"main"}
                  onClick={(e) => {
                    home && scroll("login", e);
                  }}
                >
                  Start now
                </Button>
              </a>
            </NextLink>
          )}
        </Stack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {links.map((link) => (
              <NavLink key={link} link={link}>
                {link}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
