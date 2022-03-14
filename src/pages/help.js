import Layout from "../hocs/Layout";
import Header from "../components/Header";
import Container from "../hocs/Container";
import { Text, Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
const SearchBar = () => {
  return (
    <InputGroup color="main.500">
      <InputLeftElement children={<Search2Icon />} />
      <Input placeholder="How can we help?" borderColor="main.500" />
    </InputGroup>
  );
};

export default function () {
  return (
    <Layout title="Help">
      <Container>
        <Header
          title={
            <>
              Support{" "}
              <Text as={"span"} color={"main.500"}>
                Center
              </Text>
            </>
          }
          secondary={SearchBar()}
        />
      </Container>
    </Layout>
  );
}
