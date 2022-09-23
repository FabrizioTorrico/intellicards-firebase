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
  isRunning: boolean
  timer: Timer
  _timerIndex: number
  _finishDate: Date | null
}

export interface PomoContext {
  state: PomoState
  dispatch: React.Dispatch<PomoAction>
}

export enum PomoStorage {
  CURRENT_TIME = 'pomotimer_current_time',
  TIMER_INDEX = 'pomotimer_timer_index',
  IS_RUNNING = 'pomotimer_is_running',
  FINISH_DATE = 'pomotimer_finish_date',
}
