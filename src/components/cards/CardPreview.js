import {
  Button,
  IconButton,
  Text,
  Box,
  Flex,
  Spacer,
  useDisclosure,
  Collapse,
  ButtonGroup,
} from "@chakra-ui/react";
import { TriangleDownIcon, DeleteIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Divider from "../Divider";
import MarkDown from "../MarkDown";
import { deleteCard } from "../../firebase/firestore";
import toast from "react-hot-toast";
export default function CardPreview({ cardData, deckId, admin }) {
  const { front, back, type, cardId } = cardData;
  const { isOpen, onToggle } = useDisclosure();
  const deleteHandler = () => {
    toast.promise(
      deleteCard(deckId, cardId),
      {
        loading: "Deleting...",
        success: <b>card Deleted!</b>,
        error: <b>Could not delete.</b>,
      },
      {
        success: {
          icon: "🗑",
        },
      }
    );
  };
  return (
    <Box border="2px" borderColor={"gray.300"} borderRadius="10px">
      <Flex
        className="card"
        p={{ base: 4, md: 8 }}
        gap={{ base: 4, md: 8 }}
        alignItems="center"
        justifyContent={"center"}
        overflow={"hidden"}
        transition={"all 2s"}
        maxHeight={isOpen ? "" : "150px"}
      >
        <MarkDown maxW={{ base: "70%", md: "80%" }}>{front}</MarkDown>
        <Spacer />
        <ButtonGroup>
          {admin && (
            <IconButton
              icon={<DeleteIcon />}
              type="button"
              onClick={deleteHandler}
            />
          )}

          <IconButton icon={<TriangleDownIcon />} onClick={onToggle} />
        </ButtonGroup>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Divider />
        <Box p={{ base: 4, md: 8 }} gap={{ base: 4, md: 8 }}>
          <MarkDown>{back}</MarkDown>
        </Box>
      </Collapse>
    </Box>
  );
}
