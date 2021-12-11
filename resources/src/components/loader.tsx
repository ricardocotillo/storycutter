import React, { useState } from "react";
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loader = () => {
  const [ slide, setSlide ] = useState(0)
  const slides = [
    'We are processing the video...',
    'This is taking longer than expected...',
    'Just a few more seconds...',
  ]

  const changeSlide = () => {
    const ns = slide === slides.length - 1 ? 0 : slide + 1
    setSlide(ns)
  }

  setInterval(changeSlide, 6000)

  return (
    <div className='fixed inset-0 bg-white overflow-hidden'>
      <SwitchTransition>
        <CSSTransition
          key={slide}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false)
          }}
          classNames={{
            appear: 'translate-x-full',
            appearActive: 'translate-x-full',
            appearDone: 'translate-x-full',
            enter: 'translate-x-full',
            enterActive: 'translate-x-0 transition-transform duration-700',
            enterDone: 'translate-x-0',
            exit: 'translate-x-0',
            exitActive: '-translate-x-full transition-transform duration-700',
            exitDone: '-translate-x-full',
          }}
        >
          <p className='w-full text-center px-2 absolute top-1/2 -translate-y-1/2'>{ slides[slide] }</p>
        </CSSTransition>
      </SwitchTransition>
      <div className='absolute w-full top-1/3 flex justify-center'>
        <FontAwesomeIcon className='text-4xl text-indigo-500' icon='spinner' spin />
      </div>
    </div>
  )
}

export default Loader