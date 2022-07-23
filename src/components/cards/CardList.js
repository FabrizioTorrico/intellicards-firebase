import { Box, Flex } from '@chakra-ui/react'
import CardPreview from './CardPreview'
import { useCard } from './CardContext'

export default function CardList({ deckId, admin }) {
  const { cards } = useCard()
  // const [top, setTop] = useState(0);
  // useEffect(() => {
  //   setTop(document.querySelector("#navbar").clientHeight);
  // }, []);

  /* function renderCards() {
    // if (!cards || (Array.isArray(cards) && cards.length === 0))
    //   return (
    //     <Text color="gray.600" fontSize={{ base: "lg", md: "2xl" }}>
    //       There is no Cards!
    //     </Text>
    //   );

    return 
    ));
  }
 */
  return (
    <Box
      position="fixed"
      // h={"100vh - 64px"}
      // top={top + "px"}
      // left={0}
      bg="white"
      zIndex={50}
      w={80}
      h={'85vh'}
      overflow={'auto'}
    >
      {/* <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
        Cards
      </Heading> */}
      {/* {admin && <CardForm />} */}
      <Flex py={8} px={6} gap={6} direction={'column'}>
        {cards.map((card, i) => (
          <CardPreview
            key={i}
            index={i}
            deckId={deckId}
            cardData={card}
            admin={admin}
          />
        ))}
      </Flex>
    </Box>
  )
}
