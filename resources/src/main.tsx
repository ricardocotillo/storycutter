import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload, faQuestion, faRulerHorizontal, faSpinner, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner, faUpload, faQuestion, faRulerHorizontal, faDownload, faTimes)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)