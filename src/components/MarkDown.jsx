import ReactMarkdown from 'react-markdown'
import { chakra, Link, Table, TableContainer, Box } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import remarkGfm from 'remark-gfm'
import Image from './Image'

const ChakraMarkDown = chakra(ReactMarkdown)

const markdownTheme = {
  a: ({ children }) => {
    return (
      <Link href="https://chakra-ui.com" isExternal>
        {children} <ExternalLinkIcon mx="2px" translateY={'10px'} />
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
    return (
      <Box boxSize={'xs'} pos="relative">
        <Image {...props} layout="fill" objectFit="contain" />
      </Box>
    )
    /* return <Image
        src={downloadURL}
        maxW={{ base: '0px', md: '128px' }}
        maxH={'128px'}
        alt=""
      /> */
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
