import {
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";
<<<<<<< HEAD
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = false;
=======
import ConnectedPage from "../components/index/ConnectedPage";
import { useRouter } from "next/router";

export default function Home() {
  const loading = useSelector((state) => state.auth.loading);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
>>>>>>> eb6522005b1f23b3249d00dad9b83f1e63545a5e

  if (typeof window !== "undefined" && isAuthenticated) router.push("/decks");
  return (
    <>
      <Layout home>
        <DisconnectedPage />
      </Layout>

<<<<<<< HEAD
      {/* <Modal isOpen={loading} isCentered>
=======
      <Modal isOpen={loading} isCentered>
>>>>>>> eb6522005b1f23b3249d00dad9b83f1e63545a5e
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
<<<<<<< HEAD
      </Modal> */}
=======
      </Modal>
>>>>>>> eb6522005b1f23b3249d00dad9b83f1e63545a5e
    </>
  );
}
