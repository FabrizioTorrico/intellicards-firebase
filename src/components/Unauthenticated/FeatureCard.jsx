import { Box, Flex, Center, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export default function FeatureCard({ text }) {
  return (
    <Flex
      //   maxW={"320px"}
      w={'full'}
      boxShadow={'lg'}
      rounded={'md'}
      align={'center'}
      bg="main.500"
      data-aos="fade-left"
    >
      <Center h="3rem" bg="white" p="2rem">
        <CheckIcon />
      </Center>

      <Box color="white" p={1} ml={6} pr={4}>
        <Text fontSize="lg">{text}</Text>
      </Box>
    </Flex>
  )
}
