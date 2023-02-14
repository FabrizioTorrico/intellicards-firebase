import Container from '../../lib/Container'
import { Text, Stack, Heading } from '@chakra-ui/react'
import DeckPreview from './DeckPreview'
import DeckForm from './DeckForm'
import { useEffect } from 'react'
import { getRealTimeDeckList } from '../../database/decks'
import { useDeck } from '@context/DeckContext'
import { useAuth } from '@context/AuthContext'

export default function DeckList({ userDecks }) {
  const { isAdmin } = useAuth()
  const { decks, setDecks } = useDeck()

  useEffect(() => {
    setDecks(userDecks)
  }, [])

  useEffect(() => {
    if (isAdmin) {
      return getRealTimeDeckList(setDecks)
    }
  }, [isAdmin])

  const renderDecks = () => {
    if (!decks || (Array.isArray(decks) && decks.length === 0))
      return (
        <Text color="gray.600" fontSize={{ base: 'lg', md: '2xl' }}>
          There is no Decks!
        </Text>
      )

    return decks.map((deck, i) => (
      <DeckPreview key={i} deckData={deck} id={i + 1} />
    ))
  }

  return (
    <Container maxW={{ base: 'md', md: '4xl' }}>
      <Stack spacing={{ base: 4, md: 5 }} py={{ base: 8, md: 12 }}>
        <Heading fontWeight={600} fontSize={'3xl'} lineHeight={'110%'}>
          Decks
        </Heading>
        {isAdmin && <DeckForm />}
        {renderDecks()}
      </Stack>
    </Container>
  )
}
