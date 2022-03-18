import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Option,
  ButtonGroup,
  IconButton,
  Button,
  Stack,
  useDisclosure,
  useOutsideClick,
  Collapse,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import FocusLock from "react-focus-lock";
import CardContext from "./CardContext";
import Divider from "../Divider";
import ImageUploader from "../ImageUploader.js";
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <Textarea
        ref={ref}
        id={props.id}
        placeholder={props.label}
        border={"0px"}
        focusBorderColor={"transparent"}
        fontSize={"2xl"}
        {...props}
      />
    </FormControl>
  );
});

export default function CardForm() {
  const { cardEdit, setCardEdit } = useContext(CardContext);
  const frontRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useOutsideClick({
    ref: frontRef,
    handler: () => onClose(),
  });
  return (
    <Box
      border="2px"
      borderColor={"gray.300"}
      borderRadius="10px"
      ref={frontRef}
      p={4}
    >
      <form>
        <TextInput
          label={isOpen ? "Front" : "Create New Card"}
          id="front"
          defaultValue={cardEdit.front || ""}
          onClick={onOpen}
        />
        <Collapse in={isOpen}>
          <Stack spacing={4}>
            <Divider />
            <TextInput
              label="Back"
              id="back"
              defaultValue={cardEdit.back || ""}
            />
            <FormControl px={4}>
              <FormLabel id="type">Type: </FormLabel>
              <Select id="type">
                <option value="basic">Basic</option>
                <option value="Perfect">Perfect</option>
              </Select>
              <ImageUploader accept={"image/*"} multiple>
                <Button>clickeame</Button>
              </ImageUploader>
            </FormControl>
          </Stack>
        </Collapse>
      </form>
    </Box>
  );
}
