import { Stack, Container } from '@chakra-ui/react'

/**
 * @param {{ children: JSX.Element}} [Props]
 * @returns the children component aligned and with global padding
 */
export default function CustomContainer({
  children,
  bg,
  py,
  pt = { base: 8, md: 16 },
  pb = { base: 8, md: 16 },
  maxW = { base: 'xl', md: '4xl' },
}) {
  return (
    <Stack align={'center'} pt={pt} pb={pb} bg={bg} py={py}>
      <Container maxW={maxW}>{children}</Container>
    </Stack>
  )
}
