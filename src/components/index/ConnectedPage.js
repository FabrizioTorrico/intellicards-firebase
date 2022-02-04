import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import MainDecks from "./connected/MainDecks";

export default function ConnectedPage() {
  const user = useSelector((state) => state.user);

  return (
    <MainDecks
      title={
        <>
          Main{" "}
          <Text as={"span"} color={"main.500"}>
            Decks
          </Text>
        </>
      }
      text="A simple and light web application to learn getting fun"
    ></MainDecks>
  );
}
