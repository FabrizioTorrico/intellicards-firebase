import Header from "../components/Header";
import Layout from "../hocs/Layout";
import Container from "../hocs/Container";
import Image from "../components/Image";
import { Box, Text, Stack, Heading } from "@chakra-ui/react";
import aboutImage from "../../public/img/friends.jpg";

export default function AboutPage() {
  return (
    <Layout title="About">
      <Container>
        <Header
          title={
            <>
              About{" "}
              <Text as={"span"} color={"main.500"}>
                Us
              </Text>
            </>
          }
          secondary="We believe that everyone has the power to transform their own and their environments future. Our job is to guide you in the right direction and bring the clarity and transparency you need to make that change."
        />
        <Image src={aboutImage} borderRadius="2xl" />
      </Container>
      <Container bg="gray.100">
        <Heading fontSize={"3xl"} as="h3" mb="5" color="main.500">
          Our Story
        </Heading>
      </Container>
    </Layout>
  );
}
