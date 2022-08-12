import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Divider from '../Divider'
import MarkDown from '../MarkDown'
import { useCard } from './CardContext'
import styles from '../../styles/Cards.module.scss'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

function CardContent() {
  const { cards, selectedCard, setSelectedCard } = useCard()
  const card = cards[selectedCard]
  const [showBack, setShowBack] = useState(false)
  const [triggerAnimation, setTriggerAnimation] = useState(false)

  function Arrow({ direction }) {
    return (
      <Flex
        as="button"
        h={12}
        w={8}
        bg={
          (direction === 'left' && selectedCard === 0) ||
          (direction === 'right' && selectedCard === cards.length - 1)
            ? 'gray.500'
            : 'gray.800'
        }
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
        onClick={() => {
          if (direction === 'left') {
            const newPos = selectedCard - 1
            if (newPos < 0) return
            setSelectedCard(newPos)
          } else {
            const newPos = selectedCard + 1
            if (newPos > cards.length - 1) return
            setSelectedCard(newPos)
          }
        }}
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
    <>
      <Arrow direction="left" />
      <Arrow direction="right" />
      <Box
        py={16}
        px={24}
        h="70vh"
        className={triggerAnimation ? styles.fade_in : ''}
        onAnimationEnd={() => setTriggerAnimation(false)}
        overflow={'auto'}
      >
        <MarkDown>{showBack ? card?.back : card?.front}</MarkDown>
      </Box>
      <Divider width="100%" borderWidth="2px" />
      <Flex h="15vh" mx={8} alignItems="center">
        <Button
          colorScheme="main"
          onClick={() => {
            if (!triggerAnimation) {
              setShowBack((state) => !state)
              setTriggerAnimation(true)
            }
          }}
        >
          {showBack ? 'Show Front' : 'Show Back'}
        </Button>
        <Spacer />
        {showBack && (
          <Flex
            alignItems={'center'}
            gap={2}
            className={triggerAnimation ? styles.fade_in : ''}
          >
            <Text>Do you know the answer ? </Text>
            <Button colorScheme={'green'}>Yes</Button>
            <Button colorScheme={'red'}>No</Button>
            <Button colorScheme={'gray'}>Almost</Button>
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default CardContent
