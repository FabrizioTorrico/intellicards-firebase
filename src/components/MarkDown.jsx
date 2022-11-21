import ReactMarkdown from 'react-markdown'
import {
  chakra,
  Link,
  Table,
  TableContainer,
  Box,
  Text,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import remarkGfm from 'remark-gfm'
import Image from '../lib/Image'

const ChakraMarkDown = chakra(ReactMarkdown)

const markdownTheme = {
  a: (props) => {
    return (
      <Link href={props.href} isExternal>
        {props.children} <ExternalLinkIcon mx="2px" translateY={'10px'} />
      </Link>
    )
  },
  table: ({ children }) => {
    return (
      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius={'12px'}
        mb={4}
      >
        <Table variant="simple">{children}</Table>
      </TableContainer>
    )
  },
  img: (props) => {
    const domainAllowed = 'https://firebasestorage.googleapis.com'
    const urlAllowed = props.src.indexOf(domainAllowed) !== -1

    return urlAllowed ? (
      <Box boxSize={'xs'} pos="relative">
        <Image {...props} layout="fill" objectFit="contain" />
      </Box>
    ) : (
      <Text>This Image domain is not allowed!</Text>
    )
  },
}

const MarkDown = ({ children, ...props }) => (
  <ChakraMarkDown
    {...props}
    components={ChakraUIRenderer(markdownTheme)}
    remarkPlugins={[remarkGfm]}
    skipHtml
  >
    {children?.replace(/\n/gi, '  ' + '\n')}
  </ChakraMarkDown>
)

export default MarkDown
