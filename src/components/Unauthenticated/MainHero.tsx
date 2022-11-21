import { Flex, Container, Stack, Text, Button, Heading } from '@chakra-ui/react'
import scroll from '../../utils/scroll'

export default function MainHero({ title, text }) {
  return (
    <Container maxW={'5xl'} pt={12} as={'section'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={4}
      >
        <Heading
          as={'h1'}
          fontWeight={600}
          fontSize={{ sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          {title}
        </Heading>
        <Text
          color={'gray.500'}
          maxW={'3xl'}
          fontSize={{ base: 'md', md: '2xl' }}
        >
          {text}
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'main'}
            onClick={(e) => scroll('login', e)}
          >
            Start now
          </Button>

          <Button rounded={'full'} px={6} onClick={(e) => scroll('about', e)}>
            Learn more
          </Button>
        </Stack>
        <Flex w={'full'}></Flex>
      </Stack>
    </Container>
  )
}
