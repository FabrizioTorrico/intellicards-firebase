import { createContext, useContext, useEffect, useReducer } from 'react'

export enum PomoActions {
  RETRIEVE,
  START,
  RESUME,
  PAUSE,
  RESET,
  DECREASE,
}

interface PomoAction {
  type: PomoActions
  payload?: number
}

interface PomoState {
  currentTime: number | null
  isRunning: boolean
}

function setIsRunning(isRunning: boolean) {
  sessionStorage.setItem('isRunning', isRunning.toString())
  return isRunning
}

function runningParser() {
  const isRunning = sessionStorage.getItem('isRunning')
  if (!isRunning) return false
  return isRunning === 'true'
}

function pomoReducer(state: PomoState, action: PomoAction) {
  switch (action.type) {
    case PomoActions.START:
      return {
        ...state,
        currentTime: action.payload,
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
      return {
        ...state,
        currentTime: action.payload,
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
        currentTime: action.payload,
        isRunning: runningParser(),
      }

    default:
      throw new Error('Action not supported')
  }
}

interface ContextProps {
  state: PomoState
  dispatch: React.Dispatch<PomoAction>
}

const DEFAULT_STATE = {
  currentTime: null,
  isRunning: false,
}
const PomodoroContext = createContext<ContextProps>({
  state: DEFAULT_STATE,
  dispatch: () => null,
})

export const PomodoroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pomoReducer, DEFAULT_STATE)

  useEffect(() => {
    const storedTime = sessionStorage.getItem('pomoTime')
    dispatch({
      type: PomoActions.RETRIEVE,
      payload: storedTime ? parseInt(storedTime) : null,
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
