import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

interface ModalProps {
  className?: string
  type?: 'bottom' | 'fullscreen'
  open?: boolean
  children?: React.ReactNode
}

const Modal = ({ className, type='bottom', open=false, children } : ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  return (
    <CSSTransition
      in={open}
      unmountOnExit={true}
      timeout={400}
      classNames={{
        appear: 'h-0',
        appearActive: 'h-0',
        appearDone: 'h-0',
        enter: 'h-0',
        enterActive: `${type == 'bottom' ? 'h-screen-1/2' : 'h-screen'} transition-all duration-400`,
        enterDone: type == 'bottom' ? 'h-screen-1/2' : 'h-screen',
        exit: type == 'bottom' ? 'h-screen-1/2' : 'h-screen',
        exitActive: 'h-0 transition-all duration-400',
        exitDone: 'h-0',
      }}
    >
      <div ref={modalRef} className={`fixed w-full bottom-0 ${className}`}>
        {children}
      </div>
    </CSSTransition>
  )
}

export default Modal