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

export default function CardPreview({ cardData, id }) {
  const { front, back, type } = cardData;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box border="2px" borderColor={"gray.300"} borderRadius="10px">
      <Flex
        p={{ base: 4, md: 8 }}
        gap={{ base: 4, md: 8 }}
        alignItems="center"
        justifyContent={"center"}
      >
        <Text fontWeight={600} fontSize={{ base: "lg", md: "2xl" }}>
          {front}
        </Text>

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
