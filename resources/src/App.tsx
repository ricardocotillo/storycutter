import React, { useState } from 'react'
import Video from './components/video'
import CutterForm from './components/cutterForm'
import Loader from './components/loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useRegisterSW } from 'virtual:pwa-register/react'

const App = () => {

  const [ data, setData ] = useState<any[] | null>(null)
  const [ loading, setLoading ] = useState<boolean>(true)

  const onSubmit = async (e : any) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target)
    const url = e.target.getAttribute('action')
    axios.post(url, form)
      .then(res => {
        setData(res.data)
        setLoading(false)
        toast.success('Video split successfully')
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

  const intervalMS = 60 * 60 * 1000

  const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
      r && setInterval(() => {
        r.update()
      }, intervalMS)
    }
  })

  return (
    <div className="container mx-auto pt-4">
      <h1 className='font-bold text-2xl text-center'>STORY <span className='text-gray-400'>CUTTER</span></h1>
      <p className='text-center mt-4 text-sm text-gray-400 px-2'>Cut your long videos into beautiful stories, share on Instagram, WhatsApp, Facebook, Snapchat and more!</p>
      <CutterForm onSubmit={onSubmit} />
      { data && videoWrapper(data.map(s => <Video showBtn src={s} />)) }
      <ToastContainer position="bottom-left" />
      { loading && <Loader /> }
    </div>
  );
}

export default App
