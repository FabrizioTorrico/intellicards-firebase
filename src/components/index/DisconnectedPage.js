import { Text, Heading } from "@chakra-ui/react";
import Image from "next/image";
import MainHero from "./disconnected/MainHero";
import About from "./disconnected/About";
import Features from "./disconnected/Features";
import Login from "./disconnected/Login";

export default function DisconnectedPage() {
  const featureCardsText = [
    "Create and Edit Flash Cards",
    "Share and download summaries",
    "Pomodoro technique",
    "Communities for your subjects",
    "Blog and comments for decks",
  ];

  return (
    <>
      <MainHero
        title={
          <>
            Learn fast with{" "}
            <Text as={"span"} color={"main.500"}>
              Intellicards!
            </Text>
          </>
        }
        text="A simple and light web application to learn getting fun"
      ></MainHero>

      <About
        title="Use the best part of yourself "
        text="
Our specialists modeled tools to improve your ability to establish and remember concepts. You can easily keep your studies up to date using our learning and practice techniques"
      />

      <Features
        title={
          <>
            Optimized <br />
            <Text as={"span"} color={"main.500"}>
              Features
            </Text>
          </>
        }
        text="We dispose of a lot of useful features you can opt to get your
results faster!"
        featureCardsText={featureCardsText}
      />
      <Login />
    </>
  );
}
