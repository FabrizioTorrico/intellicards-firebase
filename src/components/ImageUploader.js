import { useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  Input,
  Spinner,
  Code,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoCamera } from "react-icons/io5";
import { uploadImageToStorage } from "../firebase/storage";
import { useContext } from "react";
import CardContext from "./cards/CardContext";

/**
 * reacts conditionally if there is a downloadURL, it allows uploading images and checking erros
 * @param {props} props
 * @property {function} setError sets the error to parent component
 * @property {function} clearErrors clears the error to parent component
 */
export default function ImageUploader({ setError, clearErrors }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [copied, setCopied] = useState(false);

  //for replacing default styling and replacing it with chakra ui
  const handleClick = () => inputRef.current?.click();

  const uploadFile = async (e) => {
    setUploading(true);
    clearErrors("image");
    const file = e.target.files[0];
    if (!file) return;
    console.log(file);

    //check fileMB
    const fileMB = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 5;
    if (fileMB > MAX_FILE_SIZE) {
      setError("image", { message: "Max file size is 5mb" });
    }

    uploadImageToStorage(file, setDownloadURL, setUploading);
  };

  return downloadURL ? (
    <InputGroup>
      <Image
        src={downloadURL}
        maxW={{ base: "0px", md: "128px" }}
        maxH={"128px"}
      />
      <Button
        onClick={() => {
          navigator.clipboard.writeText(`![alt](${downloadURL})`);
          setCopied(true);
        }}
      >
        {copied ? "copied!" : "Get Image Link"}
      </Button>
    </InputGroup>
  ) : (
    <InputGroup maxW={{ base: "", md: "50%" }}>
      <Input
        type={"file"}
        id="image"
        accept={"image/*"}
        hidden
        ref={inputRef}
        onChange={uploadFile}
      />

      <Button
        isDisabled={uploading}
        onClick={handleClick}
        leftIcon={uploading ? <Spinner /> : <IoCamera size={"32px"} />}
      >
        Upload Image
      </Button>
    </InputGroup>
  );
}
