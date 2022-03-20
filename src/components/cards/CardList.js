import Container from "../../hocs/Container";
import { Text, Stack, Heading } from "@chakra-ui/react";
import CardPreview from "./CardPreview";
import CardForm from "./CardForm";
import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../firebase/auth";
import { db } from "../../firebase";
export default function CardList({ deckCards, deckId, admin }) {
  const [cards, setCards] = useState(deckCards);
  const { uid } = useAuth().currentUser;

  useEffect(() => {
    const userRef = doc(db, "users", uid);
    const deckRef = doc(userRef, "decks", deckId);
    const cardsCollection = collection(deckRef, "cards");

    const unsubscribe = onSnapshot(cardsCollection, (querySnapshot) => {
      console.log(querySnapshot);
      setCards(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          cardId: doc.id,
        }))
      );
    });
    return unsubscribe;
  }, []);

  function renderDecks() {
    if (!cards || (Array.isArray(cards) && cards.length === 0))
      return (
        <Text color="gray.600" fontSize={{ base: "lg", md: "2xl" }}>
          There is no Cards!
        </Text>
      );

    return cards.map((card, i) => (
      <CardPreview key={i} deckId={deckId} cardData={card} admin={admin} />
    ));
  }

  return (
    <Container maxW={{ base: "md", md: "4xl" }}>
      <Stack spacing={{ base: 4, md: 5 }} py={{ base: 8, md: 12 }}>
        <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
          Cards
        </Heading>
        {admin && <CardForm />}
        {renderDecks()}
      </Stack>
    </Container>
  );
}
