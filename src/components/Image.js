import NextImage from "next/image";
import { chakra } from "@chakra-ui/react";

const Image = chakra(NextImage, {
  baseStyle: { maxH: 10, maxW: 10 },
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
    ].includes(prop),
});

export default Image;
