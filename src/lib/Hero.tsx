import { Box, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Container from './Container'

interface Hero {
  title: string | ReactNode
  secondary?: string
}
export default function Hero({ title, secondary }: Hero) {
  return (
    <Box bgGradient="linear(main.600, main.500)" w="100%">
      <Container maxW={{ base: 'md', md: '4xl' }}>
        <Box bg="white" w="100%" borderRadius={'10px'} boxShadow={'2xl'}>
          <Stack
            spacing={{ base: 8, md: 10 }}
            p={{ base: 8, md: 14 }}
            direction={{ base: 'column', md: 'row' }}
            alignItems={'center'}
          >
            {title}
            {secondary}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
