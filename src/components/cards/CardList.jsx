import { Box, Flex, Text } from '@chakra-ui/react'
import CardPreview from './CardPreview'
import CardPreviewAdmin from './CardPreviewAdmin'
import { useCard } from './CardContext'
import styles from '../../styles/Animations.module.scss'
import { ArrowForwardIcon } from '@chakra-ui/icons'
export default function CardList({ deckId, admin }) {
  const { cards } = useCard()

  const renderCardList = () => {
    if (!cards || (Array.isArray(cards) && cards.length === 0))
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

    return cards.map((card, i) => (
      <CardPreview key={i} index={i} deckId={deckId} cardData={card} />
    ))
  }
  return (
    <Box
      position="fixed"
      bg="white"
      zIndex={50}
      w={80}
      h={'85vh'}
      overflow={'auto'}
    >
      <Flex py={8} px={6} gap={6} direction={'column'}>
        {admin && <CardPreviewAdmin />}
        {renderCardList()}
      </Flex>
    </Box>
  )
}
