import React, { useState } from 'react'
import Video from './components/video'
import CutterForm from './components/cutterForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const App = () => {

  const [ data, setData ] = useState<any[] | null>(null)
  const [ loading, setLoading ] = useState(false)
  const [ src, setSrc ] = useState<string | null>(null)
  const [ split, setSplit ] = useState<boolean>(false)

  const onSubmit = async (e : any) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target)
    const url = e.target.getAttribute('action')
    axios.post(url, form)
      .then(res => {
        setData(res.data)
        setLoading(false)
        setSplit(true)
        toast.success('Video split successfuly')
      })
      .catch(err => {
        toast.error(err.response.data.error)
        setLoading(false)
      })
  }

  const videoWrapper = (videos : JSX.Element[]) => {
    return (
      <div className='flex flex-col flex-wrap md:flex-row justify-center'>
        { videos }
      </div>
    )
  }

  const handleFile : (file: File) => void = (file : File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setSrc(reader.result as string)
    }
  }

  const conditionalForm : () => (JSX.Element | undefined) = () => {
    if(!loading && !split){
      return <CutterForm onSubmit={onSubmit} onFile={handleFile} />
    }
  }

  return (
    <div className="flex flex-col justify-center items-stretch h-auto md:h-screen container mx-auto">
      { conditionalForm() }
      {loading ?
        <div className='w-full h-40 flex justify-center items-center'><FontAwesomeIcon icon='spinner' className='text-3xl text-indigo-500' spin /></div>
        : data && videoWrapper(data.map(s => <Video showBtn src={s} />))}
      {src && !split && <Video className='w-full md:w-96 mx-auto' src={src} />}
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App
