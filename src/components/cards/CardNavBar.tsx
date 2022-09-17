import { ArrowBackIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { Flex, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function CardNavBar() {
  const router = useRouter()
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex
        alignItems={'center'}
        cursor="pointer"
        onClick={() => router.back()}
      >
        {/* <ArrowBackIcon h={5} w={5} /> */}
        <Link>Go back to Deck</Link>
      </Flex>
      <ArrowLeftIcon color={'gray.400'} cursor="pointer" />
    </Flex>
  )
}
