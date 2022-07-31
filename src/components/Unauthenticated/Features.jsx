import { Box, Stack, Text, Heading, Spacer } from '@chakra-ui/react'
import FeatureCard from './FeatureCard'

export default function Features({ title, text, featureCardsText }) {
  return (
    <Box
      position={'relative'}
      _before={{
        content: "''",
        position: 'absolute',
        top: '-80px',
        left: 0,
        width: '100%',
        height: '150%',
        backgroundColor: 'rgba(255,184,63,.28)',
        clipPath: 'polygon(0% 0%,100% 480px,100% 100%,0% calc(100% - 480px))',
        zIndex: '-1',
      }}
    >
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 16 }}
        mx={{ base: 16, lg: 40 }}
        py={{ base: 20, md: 24 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            data-aos="fade-down"
          >
            {title}
          </Heading>
          <Text
            fontSize={'2xl'}
            as="h3"
            color={'gray.500'}
            data-aos="fade-right"
          >
            {text}
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }}>
            <Spacer />
            {/* TODO:  aca va una imagen o carita qsy */}
          </Stack>
        </Stack>
        <Stack flex={1} spacing={{ base: 4 }}>
          {featureCardsText.map((cardText, i) => (
            <FeatureCard text={cardText} key={i} />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
