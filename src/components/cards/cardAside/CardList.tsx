import animate from '@styles/Animations.module.scss'
import { Box, Flex, Text } from '@chakra-ui/react'
import CardPreview from './CardPreview'
import CardPreviewAdmin from './CardPreviewAdmin'
import DeckAside from './CardAsideHeader'
import { useCard } from '../../../context/CardContext'
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons'
import { getRealTimeCardList } from '@database/cards'
import { useEffect } from 'react'
import { useAuth } from '@context/AuthContext'

export default function CardList({ deckId }) {
  const { cards, setCards, cardListOpen } = useCard()
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (isAdmin) {
      return getRealTimeCardList(deckId, setCards)
    }
  }, [isAdmin])

  const renderCardList = () => {
    // no cards condition
    if (!cards || (Array.isArray(cards) && cards.length === 0)) {
      return isAdmin ? (
        <Flex flexDirection={'column'} alignItems={'center'} gap={6}>
          <Text color="gray.600" fontSize={{ base: 'lg', md: '2xl' }}>
            Create your first card!
          </Text>
          <ArrowForwardIcon
            color="gray.600"
            w={8}
            h={8}
            className={animate.bounceX}
          />
        </Flex>
      ) : (
        <Flex flexDirection={'column'} alignItems={'center'} gap={6}>
          <Text color="gray.600" fontSize={{ base: 'lg', md: '2xl' }}>
            This deck has no cards
          </Text>
          <CloseIcon color="gray.600" w={8} h={8} />
        </Flex>
      )
    }

    // deck with cards
    return cards.map((card, i) => (
      <CardPreview key={i} index={i} card={card} deckId={deckId} />
    ))
  }

  return (
    <Box
      as="aside"
      transition={'width 1s'}
      position={{ md: 'fixed' }}
      left={0}
      top={'4rem'}
      bg="white"
      zIndex={40}
      w={{ md: cardListOpen ? 80 : 16 }}
      h={'calc(100vh - var(--nav-height))'}
      overflow={'auto'}
      boxShadow="lg"
    >
      <Flex py={8} px={6} gap={6} direction={'column'}>
        <DeckAside />
        {cardListOpen && (
          <>
            {isAdmin && <CardPreviewAdmin />}
            {renderCardList()}
          </>
        )}
      </Flex>
    </Box>
  )
}
