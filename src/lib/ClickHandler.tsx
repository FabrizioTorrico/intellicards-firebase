import { useEffect, useRef } from 'react'

interface ClickHandler {
  onClick?: () => void
  onOutsideClick?: () => void
}
export default function useClickHandler({
  onClick,
  onOutsideClick,
}: ClickHandler) {
  const outsideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (!outsideRef.current) return

      if (outsideRef.current.contains(event.target)) {
        onClick?.()
        return
      }

      onOutsideClick?.()
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [outsideRef])

  return outsideRef
}
