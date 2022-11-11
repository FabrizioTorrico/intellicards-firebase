import { Search2Icon } from '@chakra-ui/icons'
import {
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { algoliaIndex } from '@database/algolia'
import { UserData } from '@models/users'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import useClickHandler from './ClickHandler'

interface AlgoliaUser extends Partial<UserData> {
  objectID: string
}
export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<AlgoliaUser[]>([])

  const outsideRef = useClickHandler({
    onOutsideClick: () => setQuery(''),
  })

  useEffect(() => {
    const handleSearch = async (query: string) => {
      if (query === '') {
        setResults([])
        return
      }

      const { hits } = await algoliaIndex.search<AlgoliaUser>(query, {
        hitsPerPage: 5,
      })

      setResults(hits)
    }

    handleSearch(query)
  }, [query])

  return (
    <InputGroup mx="4rem" ref={outsideRef}>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="main.600" />
      </InputLeftElement>
      <Input
        type="search"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />

      {query !== '' && (
        <List
          position={'absolute'}
          top={12}
          bg="white"
          width={'100%'}
          borderRadius="md"
          p={2}
          boxShadow={'lg'}
        >
          {results.length === 0 ? (
            <Text>No users found</Text>
          ) : (
            results.map((user) => (
              <NextLink href={user.objectID} key={user.objectID}>
                <LinkBox
                  cursor={'pointer'}
                  borderRadius="md"
                  p={2}
                  _hover={{
                    bg: 'gray.200',
                  }}
                >
                  <ListItem display={'flex'} alignItems="center" gap={4}>
                    <Avatar
                      src={user.photo_URL}
                      size="sm"
                      name={user.username}
                    />
                    {user.username}
                  </ListItem>
                </LinkBox>
              </NextLink>
            ))
          )}
        </List>
      )}
    </InputGroup>
  )
}
