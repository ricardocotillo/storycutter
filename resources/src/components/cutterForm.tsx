import React, { useState, useRef } from 'react'
import Video from '../components/video'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import Button from './button';

interface CutterFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>,
}

const CutterForm = (props : CutterFormProps) => {
  const { onSubmit } = props

  const [ loading, setLoading ] = useState<boolean>(false)

  const [ length, setLength ] = useState<number>(10)

  const [ src, setSrc ] = useState<string | null>(null)

  const allowedExt : String[] = ['mp4', 'webm', 'opgg']

  const inputRef = useRef<HTMLInputElement>(null)

  const formRef = useRef<HTMLFormElement>(null)

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    if (input.files && input.files.length > 0) {
      setLoading(true)
      const file = input.files[0]
      const err = validateFile(file)
      if (err) {
        toast.warning(err)
        input.value = ''
      } else {
        handleFile(file)
      }
      setLoading(false)
    }
  }

  const onReset : React.FormEventHandler<HTMLFormElement> = e => {
    setSrc(null)
    setLength(10)
  }

  const handleFile : (file: File) => void = (file : File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setSrc(reader.result as string)
    }
  }

  const validateFile : (file: File) => string | null = (file : File) => {
    const ext : string | undefined = file.name.split('.').pop()
    let error : string | null = null

    if (!allowedExt.some(v => v === ext)) {
      error = 'Only video files are allowed'
    }

    // Note larger than 20MB
    if (file.size > 20971520) {
      error = 'File is to big. Max allowed: 20MB'
    }
    return error
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onReset={onReset} className='p-4' action="/video/" method="post">
      <div className={`w-full h-40 border-2 border-dashed border-gray-500 relative ${src && 'hidden'}`}>
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
      {src && <Video className='w-full md:w-96 mx-auto mb-3' src={src} />}
      <div className={`flex justify-between mt-3`}>
        <input type="hidden" value={length} name="length" id="length" />
        <div
          onClick={() => setLength(10)}
          className={`p-2 font-bold rounded-sm cursor-pointer transition-all ${length == 10 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}`}
        >
          10s
        </div>
        <div
          onClick={() => setLength(15)}
          className={`p-2 font-bold rounded-sm cursor-pointer transition-all ${length == 15 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}`}
        >
          15s
        </div>
        <div
          onClick={() => setLength(30)}
          className={`p-2 font-bold rounded-sm cursor-pointer transition-all ${length == 30 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}`}
        >
          30s
        </div>
      </div>
      {/* <button className='px-4 py-2 w-full rounded-sm text-white mt-3 bg-indigo-600' type="submit">Submit</button> */}
      <Button className='w-full text-white bg-indigo-600 mt-3' type='submit' >Submit</Button>
      <Button className='w-full text-white bg-orange-500 mt-3' type='reset'>Reset</Button>
    </form>
  )
}

export default CutterForm