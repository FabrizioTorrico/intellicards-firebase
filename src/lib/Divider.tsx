import { Center, ChakraProps } from '@chakra-ui/react'

interface DividerProps {
  my?: ChakraProps['my']
  width?: string
  borderWidth?: string
}

export default function Divider({
  my,
  width = '90%',
  borderWidth = '1px',
}: DividerProps) {
  return (
    <Center my={my}>
      <hr
        style={{
          width,
          borderWidth,
        }}
      />
    </Center>
  )
}
