import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
import React, { useState } from "react";
import FocusLock from "react-focus-lock";
import CardContext from "./CardContext";
import Divider from "../Divider";
import ImageUploader from "../ImageUploader.js";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createCard } from "../../firebase/firestore";
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl id={props.id} isInvalid={props.errors[props.id]}>
      <Textarea
        id={props.id}
        placeholder={props.label}
        _placeholder={{ fontSize: "xl" }}
        {...props}
        ref={ref}
      />
      <FormErrorMessage>{props.errors[props.id]?.message}</FormErrorMessage>
    </FormControl>
  );
});

export default function CardForm() {
  const [cardEdit, setCardEdit] = useState({ front: "", back: "" });
  const frontRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useOutsideClick({
    ref: frontRef,
    handler: () => onClose(),
  });
  const router = useRouter();
  const { deckId } = router.query;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    toast
      .promise(createCard(deckId, data), {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      })
      .then(() => {
        setCardEdit({ front: "", back: "", type: "basic" });
        onClose();
      });
  };

  return (
    <Box
      border="2px"
      borderColor={"gray.300"}
      borderRadius="10px"
      ref={frontRef}
      p={4}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("front", { required: "front is required" })}
          errors={errors}
          label={isOpen ? "Front" : "Create New Card"}
          id="front"
          defaultValue={cardEdit.front || ""}
          onClick={onOpen}
        />
        <Collapse in={isOpen}>
          <Stack spacing={4}>
            <Divider />
            <TextInput
              {...register("back", { required: "back is required" })}
              errors={errors}
              label="Back"
              id="back"
              defaultValue={cardEdit.back || ""}
            />
            <Divider />
            <Stack direction={"row"} px={4}>
              <FormControl>
                <FormLabel htmlFor="type">Type: </FormLabel>
                <Select
                  id="type"
                  maxW={{ base: "", md: "50%" }}
                  {...register("type")}
                >
                  <option value="basic">Basic</option>
                  <option value="Perfect">Perfect</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={errors.image}>
                <FormLabel htmlFor="image">Image: </FormLabel>
                <ImageUploader setError={setError} clearErrors={clearErrors} />
                <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
              </FormControl>
            </Stack>

            <Button colorScheme="main" size={"md"} type="submit">
              Create new card
            </Button>
          </Stack>
        </Collapse>
      </form>
    </Box>
  );
}
