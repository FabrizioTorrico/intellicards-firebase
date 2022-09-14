export enum PomoActions {
  RETRIEVE,
  START,
  RESUME,
  PAUSE,
  RESET,
  DECREASE,
  NEXT_TIMER,
  PREV_TIMER,
}

export interface PomoAction {
  type: PomoActions
  payload?: number
}

export interface Timer {
  label: string
  time: number
  icon?: string
  message: string
}

export interface PomoState {
  currentTime: number | null
  _timerIndex: number
  isRunning: boolean
  timer: Timer
}

export interface PomoContext {
  state: PomoState
  dispatch: React.Dispatch<PomoAction>
}
