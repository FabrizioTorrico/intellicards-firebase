import Layout from "../../hocs/Layout";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";
import Hero from "../../components/Hero";
import DeckList from "../../components/decks/DeckList";

export default function Decks() {
  const user = useSelector((state) => state.user);
  const userDecks = user.decks;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Layout priv>
      <Hero
        title={
          <>
            Main{" "}
            <Text as={"span"} color={"main.500"}>
              Decks
            </Text>
          </>
        }
        text="Ready for another studying lesson?"
      ></Hero>

      <DeckList userDecks={userDecks} />
    </Layout>
  );
}
