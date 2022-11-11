import algoliasearch from 'algoliasearch'

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
)

export const algoliaIndex = client.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX
)
