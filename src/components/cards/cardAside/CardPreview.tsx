import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useAuth } from '@context/AuthContext'
import { deleteCard } from '@database/cards'
import { Card } from '@models/cards'
import { toast } from 'react-hot-toast'
import { useCard } from '../../../context/CardContext'

export default function CardPreview({
  index,
  card,
  deckId,
}: {
  index: number
  card: Card
  deckId: string
}) {
  const { front, cardId } = card
  const { cards, selectedCard, setSelectedCard, setCreateCard } = useCard()
  const { isAdmin } = useAuth()

  const deleteHandler = (e) => {
    e.stopPropagation()
    toast
      .promise(
        deleteCard(deckId, cardId),
        {
          loading: 'Deleting...',
          success: <b>Card Deleted!</b>,
          error: <b>Could not delete.</b>,
        },
        {
          success: {
            icon: '🗑',
          },
        }
      )
      .then(() => {
        if (selectedCard === cards.length - 1) {
          setSelectedCard((prev) => prev - 1)
        }
      })
      .catch(() => null)
  }

  const editHandler = (e) => {
    e.stopPropagation()
    setSelectedCard(index)
    setCreateCard(true)
  }

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
        {front.split('\n', 1)[0]}
      </Text>
      {isAdmin && (
        <Menu>
          <MenuButton
            ml={'auto'}
            height={8}
            minWidth={2}
            as={IconButton}
            aria-label="Options"
            border="none"
            onClick={(e) => e.stopPropagation()}
            // _hover={{ bg: 'transparent' }}
            icon={
              <svg
                height={20}
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            }
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<DeleteIcon />} onClick={(e) => deleteHandler(e)}>
              Delete Card
            </MenuItem>
            <MenuItem icon={<EditIcon />} onClick={(e) => editHandler(e)}>
              Edit Card
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  )
}
