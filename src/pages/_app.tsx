import { Toaster } from 'react-hot-toast'
import ContextProviders from '../context/ContextProviders'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProviders>
      <Component {...pageProps} />
      <Toaster />
    </ContextProviders>
  )
}

export default MyApp
