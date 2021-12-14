import { MouseEventHandler, useRef, useState } from "react"
import { RippleStyle } from "./models"

const useButtonData = (onClick? : MouseEventHandler<HTMLButtonElement>) => {
  const [ clicked, setClicked ] = useState<boolean>(false)

  const [ rippleStyle, setRippleStyle ] = useState<RippleStyle>({})

  const buttonRef = useRef<HTMLButtonElement>(null)

  const spanRef = useRef<HTMLSpanElement>(null)

  const handleClick : React.MouseEventHandler<HTMLButtonElement> = e => {
    const btn = buttonRef.current
    if (btn) {
      const diameter = Math.max(btn.clientWidth, btn.clientHeight)
      const radius = diameter / 2
      const style = {
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: `${e.clientX - (btn.offsetLeft + radius)}px`,
        top: `${e.clientY - (btn.offsetTop + radius)}px`
      }
      setRippleStyle(style)
    }
    setClicked(true)
    if (onClick) {
      onClick(e)
    }
  }

  return { clicked, rippleStyle, buttonRef, spanRef, setClicked, handleClick }
}

export default useButtonData