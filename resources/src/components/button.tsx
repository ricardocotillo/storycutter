import React from 'react'
import { CSSTransition } from 'react-transition-group'
import useButtonData from '../common/utils'

type ButtonProps = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  const { className, type, children, onClick } = props

  const { clicked, rippleStyle, buttonRef, spanRef, setClicked, handleClick } = useButtonData(onClick)

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
          appear: 'scale-0 opacity-20',
          appearActive: 'scale-0 opacity-0',
          appearDone: 'scale-0 opacity-0',
          enter: 'scale-0 opacity-20',
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