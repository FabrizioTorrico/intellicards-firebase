import { useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  Input,
} from "@chakra-ui/react";

export default function FileUpload(props) {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef();

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <Input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={inputRef}
      />
      {children}
    </InputGroup>
  );
}
