import { Toaster } from 'react-hot-toast'
import ContextProviders from '../context/ContextProviders'
import '../styles/globals.scss'
function MyApp({ Component, pageProps }) {
  return (
    <ContextProviders>
      <Component {...pageProps} />
      <Toaster />
    </ContextProviders>
  )
}

export default MyApp
