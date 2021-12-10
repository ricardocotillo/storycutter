import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface CutterFormProps {
  onSubmit: React.FormEventHandler,
  onFile: (file: File) => void
}

const CutterForm = (props : CutterFormProps) => {
  const { onSubmit, onFile } = props

  const [ loading, setLoading ] = useState<Boolean>(false)

  const [ length, setLength ] = useState<number>(10)

  const allowedExt : String[] = ['mp4', 'webm', 'opgg']

  const inputRef = useRef<HTMLInputElement>(null)

  const intervalMS = 60 * 60 * 1000

  const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
      r && setInterval(() => {
        r.update()
      }, intervalMS)
    }
  })

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    if (input.files && input.files.length > 0) {
      setLoading(true)
      const file = input.files[0]
      const ext = file.name.split('.').pop()
      let error = false

      if (!allowedExt.some(v => v == ext)) {
        toast.warning('Only video files are allowed')
        input.value = ''
        error = true
      }

      // Note larger than 20MB
      if (file.size > 20971520) {
        toast.warning('File is to big. Max allowed: 20MB')
        error = true
      }

      if (!error) {
        onFile(file)
      }

      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='p-4' action="/video/" method="post">
      <div className='w-full h-40 border-2 border-dashed border-gray-500 relative'>
        <input ref={inputRef} onChange={onChange} className='w-full h-full opacity-0 cursor-pointer' type="file" name="video" id="video" />
        {loading ? 
          <FontAwesomeIcon
            icon='spinner'
            className='absolute left-1/2 top-1/2 text-4xl text-indigo-500 -translate-x-1/2 -translate-y-1/2'
            spin
          /> :
          <FontAwesomeIcon
            onClick={() => inputRef.current?.click()}
            icon='upload'
            className='absolute left-1/2 top-1/2 text-4xl text-gray-500 cursor-pointer -translate-x-1/2 -translate-y-1/2'
          />
          }
      </div>
      <div className='flex justify-between mt-3'>
        <input type="hidden" value={length} name="length" id="length" />
        <div
          onClick={() => setLength(10)}
          className={`p-2 font-bold rounded-sm cursor-pointer ${length == 10 ? 'bg-indigo-600 text-white text-lg' : 'bg-gray-200 text-gray-800'}`}
        >
          10s
        </div>
        <div
          onClick={() => setLength(15)}
          className={`p-2 font-bold rounded-sm cursor-pointer ${length == 15 ? 'bg-indigo-600 text-white text-lg' : 'bg-gray-200 text-gray-800'}`}
        >
          15s
        </div>
        <div
          onClick={() => setLength(30)}
          className={`p-2 font-bold rounded-sm cursor-pointer ${length == 30 ? 'bg-indigo-600 text-white text-lg' : 'bg-gray-200 text-gray-800'}`}
        >
          30s
        </div>
      </div>
      <button className='px-4 py-2 w-full bg-indigo-600 text-white mt-3' type="submit">Submit</button>
    </form>
  )
}

export default CutterForm