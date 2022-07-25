import { Box, Flex } from '@chakra-ui/react'
import CardPreview from './CardPreview'
import CardPreviewAdmin from './CardPreviewAdmin'
import { useCard } from './CardContext'

export default function CardList({ deckId, admin }) {
  const { cards } = useCard()

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
        {cards.map((card, i) => (
          <CardPreview key={i} index={i} deckId={deckId} cardData={card} />
        ))}
      </Flex>
    </Box>
  )
}
