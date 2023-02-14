import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from '@chakra-ui/react'
import MainHero from './MainHero'
import About from './About'
import Features from './Features'
import Login from './Login'

// You can change all the Index page info from here
export default function DisconnectedPage({ loading }: { loading?: boolean }) {
  const featureCardsText = [
    'Create and Edit Flash Cards',
    'Share summaries with one click',
    'Pomodoro technique',
    'Lightweight text editor',
    'Connect with friends and passionate users (soon)',
  ]

  return (
    <>
      <MainHero
        title={
          <>
            Learn fast with{' '}
            <Text as={'span'} color={'main.500'}>
              Intellicards!
            </Text>
          </>
        }
        text="A simple and light app to learning and mastering any subject or skill quickly by getting fun and using the practical knowledge of neuroscience."
      />

      <About
        title="Use the best part of yourself "
        text="
Our specialists modeled tools to improve your ability to establish and remember concepts. You can easily keep your studies up to date using our learning and practice techniques"
      />

      <Features
        title={
          <>
            Optimized <br />
            <Text as={'span'} color={'main.500'}>
              Features
            </Text>
          </>
        }
        text="Our team is always up to date with what's new in learning.
        use these techniques while we implement new features!"
        featureCardsText={featureCardsText}
      />

      <Login />

      <Modal isOpen={loading} onClose={() => null} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Center py={'4rem'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="main.500"
              size="xl"
            />
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}
