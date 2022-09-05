import { AddIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import { useCard } from './../../context/CardContext'

export default function CardPreview() {
  const { setCreateCard } = useCard()

  return (
    <Flex
      bg={'main.500'}
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
      _hover={{ bg: 'main.600' }}
      onClick={() => setCreateCard(true)}
    >
      <Flex
        fontWeight={600}
        fontSize={'lg'}
        lineHeight={'110%'}
        color={'white'}
      >
        <AddIcon h={3} w={3} />
      </Flex>
      <Text fontWeight={500} lineHeight={'110%'} noOfLines={2} color={'white'}>
        {'Create new Card'}
      </Text>
    </Flex>
  )
}
