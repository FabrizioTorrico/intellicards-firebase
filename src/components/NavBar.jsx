import {
  Flex,
  Spacer,
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
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import scroll from './scroll'
import { logout, useAuth } from '../firebase/auth'

const links = ['Blog', 'Help', 'About']

const NavLink = ({ children, link }) => (
  <NextLink href={`/${link.toLowerCase()}`} passHref>
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.200',
      }}
    >
      {children}
    </Link>
  </NextLink>
)

/**
 * It's the main navBar, changes on auth and user Data, and it's responsive. POSITION FIXED
 * @param {boolean} home  checks the home for scrolling on click instead of routing and specific design
 */
export default function NavBar({ home }) {
  const { currentUser, currentUserData } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isAuthenticated = Boolean(currentUser)

  return (
    <Box
      id="navbar"
      py={3}
      px={{ base: 6, md: 10 }}
      w="100%"
      pos="fixed"
      bg="white"
      zIndex="50"
      boxShadow={home ? '' : 'lg'}
    >
      <Flex alignItems={'center'}>
        <NextLink
          href={currentUserData ? `/${currentUserData.username}` : '/#'}
        >
          <a>
            <Heading size="md" color="main.500">
              Intellicards
            </Heading>
          </a>
        </NextLink>

        {isAuthenticated ? (
          <InputGroup mx="4rem">
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="main.600" />
            </InputLeftElement>
            <Input type="search" placeholder="Search" />
          </InputGroup>
        ) : (
          <Spacer />
        )}

        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          bg="white"
        />

        <Stack
          as={'nav'}
          display={{ base: 'none', md: 'flex' }}
          direction={'row'}
          alignItems={'center'}
        >
          {links.map((link) => (
            <NavLink key={link} link={link}>
              {link}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <Button rounded={'full'} colorScheme={'main'} onClick={logout}>
              Logout
            </Button>
          ) : (
            <NextLink href="/#login">
              <a>
                <Button
                  rounded={'full'}
                  colorScheme={'main'}
                  onClick={(e) => {
                    home && scroll('login', e)
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
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {links.map((link) => (
              <NavLink key={link} link={link}>
                {link}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <Button rounded={'full'} colorScheme={'main'} onClick={logout}>
                Logout
              </Button>
            ) : (
              <NextLink href="/#login">
                <a>
                  <Button
                    rounded={'full'}
                    colorScheme={'main'}
                    onClick={(e) => {
                      home && scroll('login', e)
                    }}
                  >
                    Start now
                  </Button>
                </a>
              </NextLink>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
