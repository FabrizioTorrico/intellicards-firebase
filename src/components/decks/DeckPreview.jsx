import { IoHeartOutline } from 'react-icons/io5'
import { Text, Box, Flex, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'

/**
 * @component with the given deckData, it creates a deck preview attached with a link to its ID
 * @property {object} deckData
 * @property {string} deckData.title deck Title
 * @property {number} deckData.heartCount deck heart count
 * @property {string} deckData.username deck creator
 * @param {props} props
 */
export default function DeckPreview({ deckData, id }) {
  const { title, deckId, heartCount, username } = deckData

  return (
    <NextLink href={`/${username}/decks/${deckId}`}>
      <a>
        <Box
          border="2px"
          borderColor={'gray.300'}
          borderRadius="10px"
          _hover={{
            borderColor: 'main.500',
            color: 'main.500',
            transition: 'all 0.2s',
          }}
        >
          <Flex
            p={{ base: 4, md: 8 }}
            gap={{ base: 4, md: 8 }}
            alignItems="center"
            justifyContent={'center'}
          >
            <Text
              fontWeight={600}
              fontSize={'3xl'}
              lineHeight={'110%'}
              color="gray.500"
            >
              {id}
            </Text>

            <Text fontWeight={600} fontSize={{ base: 'lg', md: '2xl' }}>
              {title}
            </Text>

            <Spacer />
            <Box position="relative" top="2px">
              <IoHeartOutline size={'32px'} />
            </Box>
            <Text fontSize="2rem">{heartCount}</Text>
          </Flex>
        </Box>
      </a>
    </NextLink>
  )
}
