import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import Hero from "../Hero";
export default function ConnectedPage() {
  const user = useSelector((state) => state.user);

  return (
    <>
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

      <DeckList />
    </>
  );
}
