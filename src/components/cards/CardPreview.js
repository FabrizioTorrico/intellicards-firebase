import { GridItem, Box, Text } from "@chakra-ui/react";
import React from "react";
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
    const spans = Math.ceil(height / 10) + 1;

    this.setState({ spans });
  };

  render() {
    return (
      <GridItem w="250px" gridRowEnd={`span ${this.state.spans}`}>
        <Box
          p={6}
          border="2px"
          borderColor="gray.400"
          borderRadius="15px"
          ref={this.cardRef}
        >
          <Text>{this.props.title}</Text>
        </Box>
      </GridItem>
    );
  }
}
