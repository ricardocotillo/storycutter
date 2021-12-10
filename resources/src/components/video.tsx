import React from 'react'

interface VideoProps {
  src: string
}

const Video = (props : VideoProps) => {
  const { src } = props

  return (
    <div className='w-full p-4'>
      <video className='w-full' src={ src } controls></video>
      <a href={src} download className='bg-indigo-600 text-white w-full py-2 block text-center'>Download</a>
    </div>
  )
}

export default Video