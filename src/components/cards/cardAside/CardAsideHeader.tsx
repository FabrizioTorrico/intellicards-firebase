import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Flex, Link } from '@chakra-ui/react'
import { useCard } from '@context/CardContext'
import { useRouter } from 'next/router'

export default function CardNavBar() {
  const router = useRouter()
  const { cardListOpen, setCardListOpen } = useCard()
  const arrowStyles = { color: 'gray.400', cursor: 'pointer' }
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      {cardListOpen && (
        <Flex
          alignItems={'center'}
          cursor="pointer"
          onClick={() => router.back()}
        >
          <Link>Go back to User</Link>
        </Flex>
      )}
      <div></div>
      {cardListOpen ? (
        <ArrowLeftIcon
          {...arrowStyles}
          onClick={() => setCardListOpen(false)}
        />
      ) : (
        <ArrowRightIcon
          {...arrowStyles}
          onClick={() => setCardListOpen(true)}
        />
      )}
    </Flex>
  )
}
