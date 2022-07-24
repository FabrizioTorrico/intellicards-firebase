import { CloseIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import {
  Circle,
  Box,
  Flex,
  Text,
  Button,
  Center,
  Spacer,
} from '@chakra-ui/react'
import usePlay from './PlayContext'
import { useState } from 'react'
import MarkDown from '../MarkDown'
import Divider from '../Divider'
import styles from '../../styles/Play.module.scss'
import PlayForm from './PlayForm'

export default function CardPlay({ cards, deckData }) {
  const { setPlayActive } = usePlay()
  // const [finished, setFinished] = useState(false);
  const [cardIndex, setCardIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)

  function handleFlip() {
    setShowBack(!showBack)
  }

  function handleIndex() {
    if (cardIndex < cards.length - 1) setCardIndex(cardIndex + 1)
    else setPlayActive(false) /* setFinished(true); */
  }
  console.log(cardIndex)
  return (
    <Box minH={'100vh'} bg={'main.500'} p={6}>
      <Flex gap={3} alignItems={'center'} mb={'3rem'}>
        <Circle
          size="40px"
          bg="white"
          color="gray.900"
          onClick={() => setPlayActive(false)}
          _hover={{ cursor: 'pointer' }}
        >
          <CloseIcon />
        </Circle>

        <Text fontSize={'1.5rem'} fontColor={'gray.900'}>
          By @{deckData.username}
        </Text>
      </Flex>
      <Center>
        <Box className={styles['flip-card-outer']}>
          <Box
            className={`${styles['flip-card-inner']} ${
              showBack ? styles.showBack : ''
            }`}
          >
            <Box className={`${styles.card} ${styles.front}`}>
              <MarkDown>{cards[cardIndex].front}</MarkDown>
              <Divider my={4} />
              <Button
                textAlign={'center'}
                rightIcon={<ArrowForwardIcon />}
                onClick={handleFlip}
              >
                <Text>Show answer</Text>
              </Button>
            </Box>
            <Box className={`${styles.card} ${styles.back}`}>
              <MarkDown>{cards[cardIndex].back}</MarkDown>
              <Divider my={4} />
              <Flex gap={'20px'}>
                <Button rightIcon={<ArrowBackIcon />} onClick={handleFlip}>
                  <Text>Go Back</Text>
                </Button>
                <Spacer />
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => {
                    handleFlip()
                    handleIndex()
                  }}
                  colorScheme={'main'}
                >
                  <Text>Continue</Text>
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Center>
      <PlayForm />
    </Box>
  )
}
