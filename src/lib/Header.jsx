import { Heading, Stack, Box } from '@chakra-ui/react'
/**
 * Takes the title and secondary to do a responsive header resusable
 * @param {props} props
 * @property {String} title
 * @property {String} secondary
 * @property {Number} pb padding bottom
 * @property {Number} py padding on y axis
 * @returns
 */
export default function Header({ title, secondary, pb, py, textAlign="inherit" }) {
  return (
    <Box
      pb={'4rem'}
      py={py}
      textAlign={textAlign}
    >
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
