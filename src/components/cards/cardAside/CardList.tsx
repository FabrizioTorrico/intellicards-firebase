import animate from '@styles/Animations.module.scss'
import { Box, Flex, Text } from '@chakra-ui/react'
import CardPreview from '../CardPreview'
import CardPreviewAdmin from '../CardPreviewAdmin'
import DeckAside from './CardAsideHeader'
import { useCard } from '../../../context/CardContext'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { getRealTimeCardList } from '../../../database/firestore'
import { useEffect, useState } from 'react'

export default function CardList({ deckId, admin }) {
  const { cards, setCards, cardListOpen } = useCard()
  useEffect(() => {
    if (admin) {
      return getRealTimeCardList(deckId, setCards)
    }
  }, [admin])

  const renderCardList = () => {
    // no cards condition
    if (admin && (!cards || (Array.isArray(cards) && cards.length === 0)))
      return (
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
      )

    // deck with cards
    return cards.map((card, i) => (
      <CardPreview key={i} index={i} cardData={card} />
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
            {admin && <CardPreviewAdmin />}
            {renderCardList()}
          </>
        )}
      </Flex>
    </Box>
  )
}
