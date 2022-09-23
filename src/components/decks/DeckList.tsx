import Container from '../../lib/Container'
import { Text, Stack, Heading } from '@chakra-ui/react'
import DeckPreview from './DeckPreview'
import DeckForm from './DeckForm'
import { useEffect } from 'react'
import { getRealTimeDeckList } from '../../database/firestore'
import { useDeck } from '@context/DeckContext'

export default function DeckList({ userDecks, admin }) {
  const { decks, setDecks } = useDeck()

  useEffect(() => {
    setDecks(userDecks)
  }, [])

  useEffect(() => {
    if (admin) {
      return getRealTimeDeckList(setDecks)
    }
  }, [admin])

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
        {admin && <DeckForm />}
        {renderDecks()}
      </Stack>
    </Container>
  )
}
