import { useEffect } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthProvider } from "../firebase/auth";
import { Toaster } from "react-hot-toast";
import CardContext from "../components/cards/CardContext";
import { useState } from "react";

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
      orange: "#F9B384",
      blue: "#2dc9dc",
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

function MyApp({ Component, pageProps }) {
  const [cardEdit, setCardEdit] = useState({
    front: "",
    back: "",
    type: "basic",
  });

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
      <AuthProvider>
        <CardContext.Provider value={{ cardEdit, setCardEdit }}>
          <Component {...pageProps} />
          <Toaster />
        </CardContext.Provider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
