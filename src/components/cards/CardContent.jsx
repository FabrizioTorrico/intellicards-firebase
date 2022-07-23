import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import Divider from '../Divider'
import MarkDown from '../MarkDown'
import { useCard } from './CardContext'

function CardContent() {
  const { selectedCard, cards } = useCard()
  const card = cards[selectedCard]

  function Arrow({ direction }) {
    return (
      <Flex
        h={12}
        w={8}
        bg="gray.800"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top="0"
        bottom="0"
        margin="auto"
        left={direction === 'left' ? 0 : null}
        right={direction !== 'left' ? 0 : null}
        opacity={0.7}
        zIndex={40}
        cursor="pointer"
      >
        {direction === 'left' ? (
          <ArrowBackIcon w={4} h={4} color="white" />
        ) : (
          <ArrowForwardIcon w={4} h={4} color="white" />
        )}
      </Flex>
    )
  }
  return (
    <Box ml={80} h="85vh" position="relative">
      <Arrow direction="left" />
      <Arrow direction="right" />
      <MarkDown p={24} h="86%">
        {card?.front}
      </MarkDown>
      <Divider width="100%" borderWidth="2px" />
      <Flex h="14%" ml={8} alignItems="center">
        <Button colorScheme="main">Show answer</Button>
      </Flex>
    </Box>
  )
}

export default CardContent
