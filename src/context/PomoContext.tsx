import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  PomoAction,
  PomoActions,
  PomoContext,
  PomoState,
  PomoStorage,
  Timer,
} from '../models/pomotimer'

const timers: Timer[] = [
  {
    time: 25,
    label: 'Time up! Take a break.',
    icon: '🎉',
    message: 'Time to Focus!',
  },
  {
    time: 5,
    label: 'Time up! Back to work.',
    message: 'Time to Take a Break!',
  },
  {
    time: 15,
    label: 'Time up! Back to work.',
    message: 'Time to Take a Long Break!',
  },
]

const { IS_RUNNING, CURRENT_TIME, TIMER_INDEX, FINISH_DATE } = PomoStorage

const DEFAULT_STATE = {
  currentTime: null,
  isRunning: false,
  timer: timers[0],
  _timerIndex: 0,
  _finishDate: null,
}

function setIsRunning(isRunning: boolean) {
  sessionStorage.setItem(IS_RUNNING, isRunning.toString())
  return isRunning
}

function retrieveRunning() {
  const isRunning = sessionStorage.getItem(IS_RUNNING)
  if (!isRunning) return false
  return isRunning === 'true'
}

function retrieveCurrentTime() {
  const pomoTime = sessionStorage.getItem(CURRENT_TIME)
  if (!pomoTime) return null
  return parseInt(pomoTime)
}

function retrieveTimerIndex() {
  const timerIndex = sessionStorage.getItem(TIMER_INDEX)
  if (!timerIndex) return 0
  return parseInt(timerIndex)
}

function retrieveFinishDate() {
  const timerIndex = sessionStorage.getItem(FINISH_DATE)
  if (!timerIndex) return null
  return new Date(timerIndex)
}

function pomoReducer(state: PomoState, action: PomoAction): PomoState {
  switch (action.type) {
    case PomoActions.START:
      const finishDate = new Date()
      finishDate.setMinutes(finishDate.getMinutes() + state.timer.time)
      sessionStorage.setItem(FINISH_DATE, finishDate.toString())

      return {
        ...state,
        _finishDate: finishDate,
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
      sessionStorage.removeItem(CURRENT_TIME)
      return {
        ...state,
        currentTime: null,
        isRunning: setIsRunning(false),
      }
    case PomoActions.DECREASE:
      const newTime = state._finishDate.getTime() - new Date().getTime()
      sessionStorage.setItem(CURRENT_TIME, newTime.toString())

      return {
        ...state,
        currentTime: newTime,
      }
    case PomoActions.RETRIEVE:
      return {
        _finishDate: retrieveFinishDate(),
        currentTime: retrieveCurrentTime(),
        isRunning: retrieveRunning(),
        _timerIndex: retrieveTimerIndex(),
        timer: timers[retrieveTimerIndex()],
      }
    case PomoActions.NEXT_TIMER:
      let newIndex = state._timerIndex + 1
      newIndex = newIndex >= timers.length ? 0 : newIndex
      sessionStorage.setItem(TIMER_INDEX, newIndex.toString())
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
      sessionStorage.setItem(TIMER_INDEX, prevIndex.toString())
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
