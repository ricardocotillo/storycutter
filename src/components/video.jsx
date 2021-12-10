import React from 'react'

const Video = props => {
  const { src } = props

  return (
    <div class="w-full p-4">
      <video class="w-full" src={ src } controls></video>
      <a href={src} download className='bg-indigo-600 text-white w-full py-2 block text-center'>Download</a>
    </div>
  )
}

export default Video