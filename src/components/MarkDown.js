import ReactMarkdown from 'react-markdown'
import { chakra, Link, Table, TableContainer } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import remarkGfm from 'remark-gfm'

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
}

const MarkDown = ({ children, props }) => (
  <ChakraMarkDown
    components={ChakraUIRenderer(markdownTheme)}
    remarkPlugins={[remarkGfm]}
    skipHtml
  >
    {children}
  </ChakraMarkDown>
)

export default MarkDown
