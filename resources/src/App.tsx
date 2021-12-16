import React, { useState } from 'react'
import Video from './components/video'
import CutterForm from './components/cutterForm'
import Loader from './components/loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useRegisterSW } from 'virtual:pwa-register/react'
import Appbar from './components/appbar'
import Modal from './components/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const App = () => {
  const [ openModal, setOpenModal ] = useState<boolean>(false)
  const [ data, setData ] = useState<any[] | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)

  const onSubmit : React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const url = e.currentTarget.getAttribute('action')
    if (url && e.currentTarget.video.value) {
      setLoading(true)
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
    } else {
      toast.info('Please, upload a video')
    }
  }

  const videoWrapper = (videos : JSX.Element[]) => {
    return (
      <div className='flex flex-col flex-wrap md:flex-row justify-center'>
        { videos }
      </div>
    )
  }

  const onAction = (action: string) => {
    if (action === 'help') {
      setOpenModal(true)
    }
  }

  const intervalMS = 60 * 60 * 1000

  useRegisterSW({
    onRegistered(r) {
      r && setInterval(() => {
        r.update()
      }, intervalMS)
    }
  })

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <React.Fragment>
      <Appbar onAction={onAction} />
      <div className="container mx-auto pt-4">
        <h1 className='font-bold text-2xl text-center'>STORY <span className='text-gray-400'>CUTTER</span></h1>
        <p className='text-center mt-4 text-sm text-gray-400 px-2'>Cut your long videos into beautiful stories, share on Instagram, WhatsApp, Facebook, Snapchat and more!</p>
        <CutterForm onSubmit={onSubmit} />
        { data && videoWrapper(data.map(s => <Video showBtn src={s} />)) }
      </div>
      <Modal
        type='fullscreen'
        open={openModal}
        onClose={closeModal}
        className='bg-white border-t border-gray-200'
      >
        <div className='h-full flex flex-col justify-around'>
          <div className='text-center'>
            <FontAwesomeIcon icon='upload' className='text-indigo-500 text-4xl' />
            <p className='text-sm text-gray-400'>Upload the video you can to split</p>
          </div>
          <div className='text-center'>
            <FontAwesomeIcon icon='ruler-horizontal' className='text-amber-500 text-4xl' />
            <p className='text-sm text-gray-400'>Choose the length of the resulting clips</p>
          </div>
          <div className='text-center'>
            <FontAwesomeIcon icon='download' className='text-green-500 text-4xl' />
            <p className='text-sm text-gray-400'>Download your newly cut clips</p>
          </div>
        </div>
      </Modal>
      { loading && <Loader /> }
      <ToastContainer position="bottom-left" />
    </React.Fragment>
  );
}

export default App
