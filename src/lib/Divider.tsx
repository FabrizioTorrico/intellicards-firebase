import { Center } from '@chakra-ui/react'

export default function Divider({ my, width = '90%', borderWidth = '1px' }) {
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
