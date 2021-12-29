import { Flex, Spacer, Text, Button, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex py={6} px={32} as="nav">
      <Heading size="md" color="main.purple">
        Intellicards
      </Heading>
      <Spacer />
      <Text> Otro texto (inicio de sesion y eso)</Text>
    </Flex>
  );
}
