import Head from "next/head";
import Image from "next/image";
import Hero from "../components/index/Hero";
import About from "../components/index/About";
import Features from "../components/index/Features";
import Login from "../components/index/Login";
import Footer from "../components/index/Footer";
import { Text, Heading } from "@chakra-ui/react";
const featureCardsText = [
  "Create and Edit Cards",
  "Share and download resumes",
  "Pomodoro technique",
  "Communities for your subjects",
  "Blog and comments for decks",
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Intellicards!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Hero
        title={
          <>
            Learn fast with{" "}
            <Text as={"span"} color={"main.500"}>
              Intellicards!
            </Text>
          </>
        }
        text="A simple and light web application to learn getting fun"
      ></Hero>

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
      <Footer />
    </div>
  );
}
