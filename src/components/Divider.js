import { Center } from "@chakra-ui/react";

export default function Divider({ my }) {
  return (
    <Center my={my}>
      <hr
        style={{
          width: "90%",
          borderWidth: "1px",
        }}
      />
    </Center>
  );
}
