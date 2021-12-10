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

  const onSubmit = async (e : any) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target)
    const url = e.target.getAttribute('action')
    axios.post(url, form)
      .then(res => {
        setData(res.data)
        setLoading(false)
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

  return (
    <div className="flex flex-col justify-center items-center h-auto md:h-screen container mx-auto">
      <CutterForm onSubmit={onSubmit} />
      {loading ?
        <div className='w-40 h-40 flex justify-center items-center'><FontAwesomeIcon icon='spinner' className='text-3xl text-indigo-500' spin /></div>
        : data && videoWrapper(data.map(s => <Video src={s} />))}
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App
