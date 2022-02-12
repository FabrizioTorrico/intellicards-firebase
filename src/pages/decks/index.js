import Layout from "../../hocs/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import Hero from "../../components/Hero";
import DeckList from "../../components/decks/DeckList";

export default function Decks() {
  const user = useSelector((state) => state.user);
  const userDecks = user.decks;

  return (
    <Layout>
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
