import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { usePomodoro } from '../../context/PomoContext'
import { PomoActions } from '../../models/pomotimer'
import { formatTimer } from '../../utils/formats'

function Arrow({
  direction,
  onClick,
  disabled,
}: {
  direction: string
  onClick?: () => void
  disabled: boolean
}) {
  return (
    <Flex
      as="button"
      h="fit-content"
      p="0.5rem"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top="0"
      bottom="0"
      margin="auto"
      left={direction === 'left' ? 6 : null}
      right={direction !== 'left' ? 6 : null}
      zIndex={40}
      cursor="pointer"
      onClick={onClick}
      disabled={disabled}
    >
      {direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </Flex>
  )
}
export default function PomoTimer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    state: { currentTime, isRunning, timer },
    dispatch,
  } = usePomodoro()
  const formattedTime = formatTimer(currentTime ?? timer.time * 1000 * 60)

  function handleStart() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification')
    } else {
      Notification.requestPermission()
      dispatch({ type: PomoActions.START })
    }
  }

  function ActionButtons() {
    if (!currentTime)
      return (
        <Button colorScheme={'main'} onClick={handleStart}>
          Start
        </Button>
      )

    return (
      <>
        <Button
          onClick={() =>
            dispatch({
              type: isRunning ? PomoActions.PAUSE : PomoActions.RESUME,
            })
          }
          mr={'3'}
        >
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
        <Button onClick={() => dispatch({ type: PomoActions.RESET })}>
          Reset
        </Button>
      </>
    )
  }

  useEffect(() => {
    if (!isRunning) return
    if (currentTime === 0) {
      new Notification(timer.label)
      toast.success(timer.label, {
        icon: timer.icon,
      })
      dispatch({ type: PomoActions.RESET })
    }
    const interval = setInterval(() => {
      dispatch({ type: PomoActions.DECREASE })
    }, 1000)
    return () => clearInterval(interval)
  }, [currentTime, isRunning])

  return (
    <>
      <Button onClick={onOpen} pos="relative" colorScheme={'main'}>
        {formattedTime}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text color="main.500">Pomodoro Timer</Text>
          </ModalHeader>
          <ModalCloseButton />
          <Flex direction={'column'} textAlign="center">
            <ModalBody>
              {isRunning && <Text color="#f45d324">{timer.message}</Text>}
              <Text fontSize="6xl" fontWeight={'semibold'}>
                {formattedTime}
              </Text>
              <Arrow
                direction="left"
                disabled={isRunning}
                onClick={() => dispatch({ type: PomoActions.PREV_TIMER })}
              />
              <Arrow
                direction="right"
                disabled={isRunning}
                onClick={() => dispatch({ type: PomoActions.NEXT_TIMER })}
              />
              <ModalFooter>
                <ActionButtons />
              </ModalFooter>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
