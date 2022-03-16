import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Option,
  ButtonGroup,
  IconButton,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import FocusLock from "react-focus-lock";

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const Form = ({ firstFieldRef, onCancel, title, back, type }) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="Front"
        id="front"
        ref={firstFieldRef}
        defaultValue={title}
      />
      <TextInput label="Back" id="back" defaultValue={back} />
      <FormLabel htmlFor="type">Type</FormLabel>
      <Select id="type">
        <option value="basic">Basic</option>
        <option value="Perfect">Perfect</option>
      </Select>
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="main">Save</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default function CardUpdate({ children, title, back, type }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form
            firstFieldRef={firstFieldRef}
            onCancel={onClose}
            title={title}
            back={back}
            type={type}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
}
