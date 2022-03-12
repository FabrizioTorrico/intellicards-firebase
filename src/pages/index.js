import {
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";
import { useRouter } from "next/router";

export default function Home() {

  return (
    <>
      <Layout home>
        <DisconnectedPage />
      </Layout>

      {/* <Modal isOpen={loading} isCentered>
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
      </Modal> */}
    </>
  );
}
