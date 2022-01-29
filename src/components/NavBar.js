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
import { useSelector, useDispatch } from "react-redux";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import scroll from "./scroll";
import { logout } from "../actions/auth";

const links = ["Blog", "Help", "About"];

const NavLink = ({ children, link }) => (
  <NextLink href={link.toLowerCase()}>
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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== "undefined") {
      dispatch(logout());
    }
  };

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
        <NextLink href={"/#"}>
          <a>
            <Heading size="md" color="main.500">
              Intellicards
            </Heading>
          </a>
        </NextLink>

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
