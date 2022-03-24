import {
  Box,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../firebase/auth";
import { createDeck } from "../../firebase/firestore";
import toast from "react-hot-toast";
export default function DeckForm() {
  const [deckName, setDeckName] = useState("");
  const [error, setError] = useState("");
  const { currentUserData } = useAuth();

  const onDeckNameChange = (e) => {
    setDeckName(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    console.log("watefuk");
    e.preventDefault();
    if (deckName.length > 80) {
      setError("Max length is 80 char");
      return;
    }
    toast.promise(createDeck(currentUserData.username, deckName), {
      success: <b>Deck created!</b>,
      loading: <b>Creating deck...</b>,
      error: <b>Could not create.</b>,
    });
  };

  return (
    <Box border="2px" borderColor={"gray.300"} borderRadius="10px" p={4}>
      <form onSubmit={handleSubmit}>
        <Flex alignItems={"center"}>
          <FormControl isInvalid={error} flex={3}>
            <Input
              autoComplete="off"
              id={"deck"}
              placeholder={"My new deck name"}
              fontSize="xl"
              p={4}
              border="none"
              value={deckName}
              onChange={onDeckNameChange}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button type="submit" flex={1} colorScheme={"main"} heigh={"100%"}>
            Create New Deck
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
