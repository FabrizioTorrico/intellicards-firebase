import {
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import MainHero from "./MainHero";
import About from "./About";
import Features from "./Features";
import Login from "./Login";

// You can change all the Index page info from here
export default function DisconnectedPage({ loading }) {
  const featureCardsText = [
    "Create and Edit Flash Cards",
    "Share and download summaries",
    "Pomodoro technique",
    "Communities for your subjects",
    "Markdown on every card type",
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

      <Modal isOpen={loading} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Center py={"4rem"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="main.500"
              size="xl"
            />
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}