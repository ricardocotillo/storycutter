import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

interface ButtonProps {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

interface RippleStyle {
  width?: string
  height?: string
  left?: string
  top?: string
}

const Button = (props: ButtonProps) => {
  const { className, type, children, onClick } = props

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

  return (
    <button ref={buttonRef} onClick={handleClick} className={`px-4 py-2 rounded-sm relative overflow-hidden ${className}`} type={type}>
      { children }
      <CSSTransition
        nodeRef={spanRef}
        in={clicked}
        timeout={300}
        onEntered={() => setClicked(false)}
        unmountOnExit={true}
        classNames={{
          appear: 'scale-0 opacity-30',
          appearActive: 'scale-0 opacity-0',
          appearDone: 'scale-0 opacity-0',
          enter: 'scale-0 opacity-30',
          enterActive: 'scale-4 opacity-0 transition-all duration-300',
          enterDone: 'scale-0 opacity-0',
          exit: 'scale-0 opacity-0',
          exitActive: 'scale-0 opacity-0',
          exitDone: 'scale-0 opacity-0',
        }}
      >
        <span ref={spanRef} className='absolute rounded-full bg-white' style={rippleStyle}></span>
      </CSSTransition>
    </button>
  )
}

export default Button