export function formatPomodoro(time: number) {
  const minutes = Math.floor(time / 60)
  let seconds: string | number = time % 60
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return `${minutes}:${seconds}`
}
