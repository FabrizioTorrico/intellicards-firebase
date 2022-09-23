/**  recieves time in date format */
export function formatTimer(time: number) {
  const minutes = Math.floor(time / (1000 * 60))
  let seconds: string | number = Math.floor((time / 1000) % 60)
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return `${minutes}:${seconds}`
}
