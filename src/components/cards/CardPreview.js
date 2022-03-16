import {
  GridItem,
  Flex,
  Spacer,
  Text,
  IconButton,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
// import { deleteCard, updateCard } from "../../firebase/firestore";
import { IoTrashOutline, IoCreateOutline } from "react-icons/io5";
import CardUpdate from "./CardUpdate";
export default class CardPreview extends React.Component {
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
    this.state = { spans: 0 };
  }
  componentDidMount() {
    this.setPans();
  }

  setPans = () => {
    const height = this.cardRef.current.clientHeight;
    const spans = Math.ceil(height / 10) + 3;

    this.setState({ spans });
  };

  render() {
    console.log(this.props);
    return (
      <GridItem w={"250px"} gridRowEnd={`span ${this.state.spans}`}>
        <Box
          p={6}
          border="2px"
          borderColor="gray.300"
          borderRadius="15px"
          ref={this.cardRef}
        >
          <Text fontWeight={600} fontSize={"xl"} textAlign="center" mb={3}>
            {this.props.title.charAt(0).toUpperCase() +
              this.props.title.slice(1)}
          </Text>
          <br />
          <Flex justifyContent={"center"} alignContent={"center"}>
            <CardUpdate {...this.props}>
              <IconButton icon={<IoCreateOutline />} mr={2} />
            </CardUpdate>

            <IconButton colorScheme={"red"} icon={<IoTrashOutline />} />
          </Flex>
        </Box>
      </GridItem>
    );
  }
}
