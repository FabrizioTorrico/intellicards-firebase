import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  PomoAction,
  PomoActions,
  PomoContext,
  PomoState,
  Timer,
} from '../models/pomotimer'

const timers: Timer[] = [
  {
    time: 25 * 60,
    label: 'Time up! Take a break.',
    icon: '🎉',
    message: 'Time to Focus!',
  },
  {
    time: 5 * 60,
    label: 'Time up! Back to work.',
    message: 'Time to Take a Break!',
  },
  {
    time: 15 * 60,
    label: 'Time up! Back to work.',
    message: 'Time to Take a Long Break!',
  },
]

const DEFAULT_STATE = {
  currentTime: null,
  _timerIndex: 0,
  isRunning: false,
  timer: timers[0],
}

function setIsRunning(isRunning: boolean) {
  sessionStorage.setItem('isRunning', isRunning.toString())
  return isRunning
}

function retrieveRunning() {
  const isRunning = sessionStorage.getItem('isRunning')
  if (!isRunning) return false
  return isRunning === 'true'
}

function retrieveCurrentTime() {
  const pomoTime = sessionStorage.getItem('pomoTime')
  if (!pomoTime) return null
  return parseInt(pomoTime)
}

function retrieveTimerIndex() {
  const timerIndex = sessionStorage.getItem('timerIndex')
  if (!timerIndex) return 0
  return parseInt(timerIndex)
}

function pomoReducer(state: PomoState, action: PomoAction) {
  switch (action.type) {
    case PomoActions.START:
      return {
        ...state,
        currentTime: state.timer.time,
        isRunning: setIsRunning(true),
      }
    case PomoActions.RESUME:
      return {
        ...state,
        isRunning: setIsRunning(true),
      }
    case PomoActions.PAUSE:
      return {
        ...state,
        isRunning: setIsRunning(false),
      }
    case PomoActions.RESET:
      sessionStorage.removeItem('pomoTime')
      return {
        ...state,
        currentTime: null,
        isRunning: setIsRunning(false),
      }
    case PomoActions.DECREASE:
      const newTime = state.currentTime - 1
      sessionStorage.setItem('pomoTime', newTime.toString())
      return {
        ...state,
        currentTime: newTime,
      }
    case PomoActions.RETRIEVE:
      return {
        ...state,
        currentTime: retrieveCurrentTime(),
        isRunning: retrieveRunning(),
        _timerIndex: retrieveTimerIndex(),
        timer: timers[retrieveTimerIndex()],
      }
    case PomoActions.NEXT_TIMER:
      let newIndex = state._timerIndex + 1
      newIndex = newIndex >= timers.length ? 0 : newIndex
      sessionStorage.setItem('timerIndex', newIndex.toString())
      return {
        ...state,
        _timerIndex: newIndex,
        timer: timers[newIndex],
        currentTime: null,
        isRunning: setIsRunning(false),
      }
    case PomoActions.PREV_TIMER:
      let prevIndex = state._timerIndex - 1
      prevIndex = prevIndex < 0 ? timers.length - 1 : prevIndex
      sessionStorage.setItem('timerIndex', prevIndex.toString())
      return {
        ...state,
        _timerIndex: prevIndex,
        timer: timers[prevIndex],
        currentTime: null,
        isRunning: setIsRunning(false),
      }
    default:
      throw new Error('Action not supported')
  }
}

const PomodoroContext = createContext<PomoContext>({
  state: DEFAULT_STATE,
  dispatch: () => null,
})

export const PomodoroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pomoReducer, DEFAULT_STATE)

  useEffect(() => {
    dispatch({
      type: PomoActions.RETRIEVE,
    })
  }, [])

  return (
    <PomodoroContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export const usePomodoro = () => useContext(PomodoroContext)
