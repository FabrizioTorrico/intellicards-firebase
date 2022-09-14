import { useEffect } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { AuthProvider } from '../firebase/auth'
import { PlayProvider } from './PlayContext'
import { CardProvider } from './CardContext'
import { PomodoroProvider } from './PomoContext'

const theme = extendTheme({
  colors: {
    main: {
      gradient: 'linear(main.600, main.500)',
      500: '#7659FF',
      600: '#7298D9',
      yellow: {
        500: '#ffb83f',
        600: '#e5a02b',
      },
      orange: '#F9B384',
      blue: '#2dc9dc',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default function ContextProviders({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 200,
      delay: 50,
      duration: 500,
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <PlayProvider>
          <PomodoroProvider>
            <CardProvider>{children}</CardProvider>
          </PomodoroProvider>
        </PlayProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
