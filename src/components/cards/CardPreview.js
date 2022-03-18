import {
  Button,
  IconButton,
  Text,
  Box,
  Flex,
  Spacer,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Divider from "../Divider";
import MarkDown from "../MarkDown";
export default function CardPreview({ cardData, id }) {
  const { front, back, type } = cardData;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box border="2px" borderColor={"gray.300"} borderRadius="10px">
      <Flex
        className="card"
        p={{ base: 4, md: 8 }}
        gap={{ base: 4, md: 8 }}
        alignItems="center"
        justifyContent={"center"}
        maxH={isOpen ? "" : "150px"}
        overflow={"hidden"}
        transition={"all 2s"}
      >
        <MarkDown maxW={"80%"}>{front}</MarkDown>

        <Spacer />
        <IconButton icon={<TriangleDownIcon />} onClick={onToggle} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Divider />
        <Box p={{ base: 4, md: 8 }} gap={{ base: 4, md: 8 }}>
          <Text>{back}</Text>
        </Box>
      </Collapse>
    </Box>
  );
}
