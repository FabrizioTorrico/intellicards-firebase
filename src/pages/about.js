import Header from "../components/Header";
import Layout from "../hocs/Layout";
import Image from "../components/Image";
import { Box, Container, Text, Stack } from "@chakra-ui/react";
import aboutImage from "../../public/img/friends.jpg";
export default function AboutPage() {
  return (
    <Layout title="About">
      <Header
        title={
          <>
            About{" "}
            <Text as={"span"} color={"main.500"}>
              Us
            </Text>
          </>
        }
        description="We believe that everyone has the power to transform their own and their environments future. Our job is to guide you in the right direction and bring the clarity and transparency you need to make that change."
      />
      <Box borderRadius={"md"}>
        <Image src={aboutImage} />
      </Box>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 8, md: 14 }}
        bg="gray.100"
      >
        <Container maxW={"5xl"}></Container>
      </Stack>
    </Layout>
  );
}
