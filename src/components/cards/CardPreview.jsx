import { Flex, Text } from '@chakra-ui/react'
import { useCard } from './CardContext'

export default function CardPreview({ deckId, index, cardData }) {
  const { front /* back, type , cardId */ } = cardData
  const { selectedCard, setSelectedCard, setCreateCard } = useCard()

  /* const deleteHandler = () => {
    toast.promise(
      deleteCard(deckId, cardId),
      {
        loading: 'Deleting...',
        success: <b>card Deleted!</b>,
        error: <b>Could not delete.</b>,
      },
      {
        success: {
          icon: '🗑',
        },
      }
    )
  } */
  return (
    <Flex
      bg={selectedCard === index ? 'gray.200' : 'white'}
      py={4}
      px={4}
      gap={{ base: 4 }}
      alignItems="center"
      overflow={'hidden'}
      border="2px"
      borderColor={'gray.300'}
      borderRadius="12px"
      cursor="pointer"
      transition={'0.3s'}
      _hover={{ bg: 'gray.300' }}
      onClick={() => {
        setSelectedCard(index)
        setCreateCard(false)
      }}
    >
      <Flex
        fontWeight={600}
        fontSize={'lg'}
        lineHeight={'110%'}
        color={'gray.500'}
      >
        {index}
      </Flex>
      <Text
        fontWeight={500}
        lineHeight={'110%'}
        noOfLines={2}
        color={'gray.900'}
      >
        {front}
      </Text>
    </Flex>
  )
}
