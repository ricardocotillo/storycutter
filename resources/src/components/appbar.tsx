import React from 'react'
import Button from './button'

interface AppbarProps {
  onAction?: (action: string) => void
}

const Appbar = (props : AppbarProps) => {
  const { onAction } = props
  return (
    <div className='w-full h-12 shadow-md bg-white flex justify-end items-center'>
      <Button onClick={() => onAction ? onAction('help') : null} className='text-indigo-600 font-semibold text-sm'>HELP</Button>
    </div>
  )
}

export default Appbar