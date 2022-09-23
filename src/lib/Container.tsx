import { Stack, Container, ChakraProps } from '@chakra-ui/react'
import React from 'react'

/**
 * @returns the children component aligned and with global padding
 */
interface ContainerProps {
  children: React.ReactNode
  pt?: ChakraProps['pt']
  pb?: ChakraProps['pb']
  maxW?: ChakraProps['maxW']
}
export default function CustomContainer({
  children,
  pt = { base: 8, md: 16 },
  pb = { base: 8, md: 16 },
  maxW = { base: 'xl', md: '4xl' },
  ...props
}: ContainerProps) {
  return (
    <Stack align={'center'} pt={pt} pb={pb} {...props}>
      <Container maxW={maxW}>{children}</Container>
    </Stack>
  )
}
