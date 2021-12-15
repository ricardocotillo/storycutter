import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

interface ModalProps {
  className?: string
  type?: 'bottom' | 'fullscreen'
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const Modal = ({ className, type='bottom', open=false, onClose, children } : ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  return (
    <CSSTransition
      in={open}
      timeout={400}
      mountOnEnter={true}
      classNames={{
        appear: 'translate-y-full',
        appearActive: 'translate-y-full',
        appearDone: 'translate-y-full',
        enter: `translate-y-full ${type == 'bottom' ? 'h-screen-1/2' : 'h-screen'}`,
        enterActive: `translate-y-0 ${type == 'bottom' ? 'h-screen-1/2' : 'h-screen'} transition-all duration-400`,
        enterDone: `${type == 'bottom' ? 'h-screen-1/2' : 'h-screen'}`,
        exit: `${type == 'bottom' ? 'h-screen-1/2' : 'h-screen'}`,
        exitActive: `translate-y-full ${type == 'bottom' ? 'h-screen-1/2' : 'h-screen'} transition-all duration-400`,
        exitDone: `translate-y-full ${type == 'bottom' ? 'h-screen-1/2' : 'h-screen'}`,
      }}
    >
      <div ref={modalRef} className={`fixed w-full bottom-0 ${className}`}>
        <FontAwesomeIcon icon='times' className='absolute top-3 right-3 cursor-pointer' onClick={onClose} />
        {children}
      </div>
    </CSSTransition>
  )
}

export default Modal