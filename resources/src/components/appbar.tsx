import React from 'react'
import Button from './button'

const Appbar = () => {
  return (
    <div className='w-full h-12 shadow-md bg-white flex justify-end items-center'>
      <Button className='text-indigo-600 font-semibold text-sm'>HELP</Button>
    </div>
  )
}

export default Appbar