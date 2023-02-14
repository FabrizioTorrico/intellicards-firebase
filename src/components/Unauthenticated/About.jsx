import styles from '../../styles/Home.module.scss'
import { Box, Stack, Flex, Heading, Button, Text } from '@chakra-ui/react'
import Image from '../../lib/Image'
import scroll from '../../utils/scroll'

export default function About({ title, text }) {
  return (
    <Box
      bgGradient="linear(main.600, main.500)"
      w="100%"
      color="white"
      id="about"
      as={'section'}
    >
      <div className={styles.wave}>
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

      <Stack
        align={'center'}
        spacing={{ base: 8, md: 24 }}
        mx={{ base: 8, lg: 32 }}
        pb={{ base: 20, md: 24 }}
        pt={{ base: 10, md: 14 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex flex={1}>
          <Box boxSize={{ base: 'xs', lg: 'md' }} pos="relative">
            <Image
              src={'/img/learning-image.png'}
              layout="fill"
              objectFit="contain"
              alt="studying image"
            />
          </Box>
        </Flex>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            {title}
          </Heading>
          <Text fontSize="lg">{text}</Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              onClick={(e) => scroll('login', e)}
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'main.yellow'}
            >
              Get started
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
