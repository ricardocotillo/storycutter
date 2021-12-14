import React from 'react'
import { CSSTransition } from 'react-transition-group'
import useButtonData from '../common/utils'

type RoundedButtonProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  position?: 'right-bottom' | 'left-bottom' | 'right-top' | 'left-top'
}

const RoundedButton = (props : RoundedButtonProps) => {
  const { children, position, onClick } = props
  const { clicked, rippleStyle, buttonRef, spanRef, setClicked, handleClick } = useButtonData(onClick)

  const getPosition = (p? : string) => {
    let className = null
    switch (p) {
      case 'left-bottom':
        className = 'left-3 bottom-5'
        break
      case 'right-top':
        className = 'right-3 top-5'
        break
      case 'left-top':
        className = 'left-3 top-5'
        break
      default:
        className = 'right-3 bottom-5'
        break
    }
    return className
  }

  return (
    <div className={`absolute ${getPosition(position)} rounded-full overflow-hidden`}>
      <button ref={buttonRef} onClick={handleClick} className={`relative w-12 h-12 flex justify-center items-center bg-indigo-500`} >
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
    </div>
  )
}

export default RoundedButton