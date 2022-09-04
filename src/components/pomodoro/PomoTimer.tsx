import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { PomoActions, usePomodoro } from '../../context/PomoContext'
import { formatPomodoro } from '../../utils/formats'

const STUDY_TIME = 25 * 60
const BREAK_TIME = 5 * 60

export default function PomoTimer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    state: { currentTime, isRunning },
    dispatch,
  } = usePomodoro()

  function Buttons() {
    if (!currentTime)
      return (
        <Button
          onClick={() => {
            dispatch({ type: PomoActions.START, payload: STUDY_TIME })
          }}
        >
          Start
        </Button>
      )

    return (
      <Box>
        <Button
          onClick={() =>
            dispatch({
              type: isRunning ? PomoActions.PAUSE : PomoActions.RESUME,
            })
          }
        >
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
        <Button onClick={() => dispatch({ type: PomoActions.RESET })}>
          Reset
        </Button>
      </Box>
    )
  }
  useEffect(() => {
    if (currentTime === null || !isRunning) return
    if (currentTime === 0) {
      toast.success('Time up! Take a break.', {
        icon: '🎉',
      })
      dispatch({ type: PomoActions.RESET, payload: BREAK_TIME })
    }
    const interval = setInterval(() => {
      dispatch({ type: PomoActions.DECREASE })
    }, 1000)
    return () => clearInterval(interval)
  }, [currentTime, isRunning])

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pomodoro Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="5xl">
              {formatPomodoro(currentTime ?? STUDY_TIME)}
            </Text>
            <Buttons />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
