import React from 'react'

interface VideoProps {
  src: string,
  showBtn?: boolean,
  className?: string,
}

const Video = (props : VideoProps) => {
  const { src, showBtn, className } = props

  return (
    <div className={className ?? 'w-full p-4'}>
      <video className='w-full' src={ src } controls></video>
      {
        showBtn && <a href={src} download className='bg-indigo-600 text-white w-full py-2 block text-center'>Download</a>
      }
    </div>
  )
}

export default Video