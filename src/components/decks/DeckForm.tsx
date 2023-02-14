import {
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '@context/AuthContext'
import { createDeck } from '@database/decks'
import toast from 'react-hot-toast'
import { useDeck } from '@context/DeckContext'

export default function DeckForm() {
  const { decks } = useDeck()
  const [deckName, setDeckName] = useState('')
  const [error, setError] = useState('')
  const { currentUserData } = useAuth()

  const onDeckNameChange = (e) => {
    setDeckName(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const deckNameFormatted = deckName.trim()
    if (deckNameFormatted.length < 2) {
      setError('Min length is 2 characters')
      return
    }
    if (deckNameFormatted.length > 80) {
      setError('Max length is 80 characters')
      return
    }
    if (decks.some((deck) => deck.title === deckNameFormatted)) {
      setError('This deck name already exists')
      return
    }
    toast.promise(createDeck(currentUserData.username, deckNameFormatted), {
      success: <b>Deck created!</b>,
      loading: <b>Creating deck...</b>,
      error: <b>Could not create.</b>,
    })
    setDeckName('')
  }

  return (
    <Box border="2px" borderColor={'gray.300'} borderRadius="10px" p={4}>
      <form onSubmit={handleSubmit}>
        <Flex alignItems={'flex-start'} gap={8}>
          <FormControl isInvalid={!!error} flex={3}>
            <Input
              focusBorderColor="white"
              errorBorderColor="white"
              autoComplete="off"
              id={'deck'}
              placeholder={'My new deck name'}
              fontSize="xl"
              p={4}
              border="none"
              value={deckName}
              onChange={onDeckNameChange}
            />
            <FormErrorMessage pl={4}>{error}</FormErrorMessage>
          </FormControl>
          <Button type="submit" flex={1} colorScheme={'main'}>
            Create New Deck
          </Button>
        </Flex>
      </form>
    </Box>
  )
}
