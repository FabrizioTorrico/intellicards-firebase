import { useEffect } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "../components/Header";

const theme = extendTheme({
  colors: {
    main: {
      gradient: "linear(main.600, main.500)",
      500: "#7659FF",
      600: "#7298D9",
      yellow: {
        500: "#ffb83f",
        600: "#e5a02b",
      },
    },

    orange: "#F9B384",
    blue: "#2dc9dc",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 200,
      delay: 50,
      duration: 500,
    });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
