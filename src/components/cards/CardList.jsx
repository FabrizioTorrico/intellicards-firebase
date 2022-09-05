import { Box, Flex, Text } from '@chakra-ui/react'
import CardPreview from './CardPreview'
import CardPreviewAdmin from './CardPreviewAdmin'
import { useCard } from './../../context/CardContext'
import styles from '../../styles/Animations.module.scss'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { getRealTimeCardList } from '../../firebase/firestore'
import { useEffect } from 'react'

export default function CardList({ deckId, admin }) {
  const { cards, setCards } = useCard()

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
            className={styles.bounceX}
          />
        </Flex>
      )

    // deck with cards
    return cards.map((card, i) => (
      <CardPreview key={i} index={i} deckId={deckId} cardData={card} />
    ))
  }

  return (
    <Box
      as="aside"
      position={{ md: 'fixed' }}
      left={0}
      top={'4rem'}
      bg="white"
      zIndex={40}
      w={{ md: 80 }}
      h={'85vh'}
      overflow={'auto'}
      boxShadow="lg"
    >
      <Flex py={8} px={6} gap={6} direction={'column'}>
        {admin && <CardPreviewAdmin />}
        {renderCardList()}
      </Flex>
    </Box>
  )
}
