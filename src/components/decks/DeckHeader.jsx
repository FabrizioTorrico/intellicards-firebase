import Container from '../../lib/Container'
import Header from '../Header'
import NextLink from 'next/link'
import { Button, Box, Text, Link, Grid, GridItem } from '@chakra-ui/react'
import styles from '../../styles/Home.module.scss'
import { getRealTimeDeck, getRealTimeHeart } from '../../firebase/firestore'
import HeartButton from '../HeartButton'
import { useState, useEffect } from 'react'
import usePlay from '../play/PlayContext'

function DeckStats({ deckUid, deckId, heartCount }) {
  const { setPlayActive } = usePlay()
  const [myHeart, setMyHeart] = useState(null)
  useEffect(() => {
    return getRealTimeHeart(deckUid, deckId, setMyHeart)
  }, [])

  return (
    <Grid templateColumns="1fr 1fr" fontSize={'xl'} gap={6}>
      <GridItem>
        <HeartButton
          deckUid={deckUid}
          deckId={deckId}
          myHeart={myHeart}
          heartCount={heartCount}
        />
      </GridItem>
      <GridItem>
        <Button
          colorScheme="main.yellow"
          width="100%"
          onClick={() => setPlayActive(true)}
        >
          Play now
        </Button>
      </GridItem>
    </Grid>
  )
}

/**
 * uses the deckData and deckUid to get real time deck data
 * @param {props} props
 */
export default function DeckHeader({ deckData, deckUid, canPlay, admin }) {
  const [realTimeDeck, setRealTimeDeck] = useState(deckData)
  const { title, username, heartCount, deckId } = realTimeDeck

  useEffect(() => {
    return getRealTimeDeck(deckUid, deckId, setRealTimeDeck)
  }, [])

  return (
    <Box
      bgGradient="linear(main.600, main.500)"
      w="100%"
      color="white"
      position="relative"
    >
      <Container>
        <Text mb="2rem" fontSize="xl">
          Created by{' '}
          <NextLink href={`/${username}`}>
            <Link>@{username}</Link>
          </NextLink>
        </Text>
        <Header
          title={title}
          secondary={
            <DeckStats
              deckUid={deckUid}
              deckId={deckId}
              heartCount={heartCount}
              canPlay={canPlay}
            />
          }
        ></Header>
      </Container>
      <div className={styles.wave2} id="card-form">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={styles['shape-fill']}
          ></path>
        </svg>
      </div>
    </Box>
  )
}
