import { Heading, Stack, Box, ResponsiveValue } from '@chakra-ui/react'

/**
 * Takes the title and secondary to do a responsive header resusable
 */

interface HeaderProps {
  title: string
  secondary?: string
  pb: string
  py: string
  textAlign: ResponsiveValue<CanvasTextAlign>
}

export default function Header({
  title,
  secondary,
  pb,
  py,
  textAlign,
}: HeaderProps) {
  return (
    <Box pb={'4rem'} py={py} textAlign={textAlign}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        spacing={'3rem'}
      >
        <Heading fontSize="5xl" flex={1}>
          {title}
        </Heading>
        <Box flex={1} fontSize={'xl'}>
          {secondary}
        </Box>
      </Stack>
    </Box>
  )
}
