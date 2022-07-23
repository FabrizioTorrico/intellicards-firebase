import {
  Button,
  IconButton,
  Text,
  Box,
  Flex,
  Spacer,
  useDisclosure,
  Collapse,
  ButtonGroup,
} from '@chakra-ui/react'
import { TriangleDownIcon, DeleteIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import Divider from '../Divider'
import MarkDown from '../MarkDown'
import { deleteCard } from '../../firebase/firestore'
import toast from 'react-hot-toast'
import { useCard } from './CardContext'

export default function CardPreview({ cardData, deckId, index, admin }) {
  const { front /* , back, type , cardId*/ } = cardData
  const { selectedCard, setSelectedCard } = useCard()

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
      onClick={() => setSelectedCard(index)}
    >
      <Text
        fontWeight={600}
        fontSize={'lg'}
        lineHeight={'110%'}
        color="gray.500"
      >
        {index}
      </Text>
      <Text fontWeight={500} lineHeight={'110%'} noOfLines={2}>
        {front}
      </Text>
      {/* <ButtonGroup>
          {admin && (
            <IconButton
              icon={<DeleteIcon />}
              type="button"
              onClick={deleteHandler}
            />
          )}
        </ButtonGroup> */}
    </Flex>
  )
}
