import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";
import ConnectedPage from "../components/index/ConnectedPage";
import { useRouter } from "next/router";

export default function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const router = useRouter();

  if (typeof window !== "undefined" && isAuthenticated) router.push("/decks");

  return (
    <>
      <Layout home>
        <DisconnectedPage />
      </Layout>

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
