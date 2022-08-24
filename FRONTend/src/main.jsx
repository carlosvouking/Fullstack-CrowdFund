import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { FundMeProvider } from "./context/FundMeContext";  


ReactDOM.createRoot(document.getElementById('root')).render(
 /* 
 FundMeProvider will serve to envelop our whole App...
 So dat our entire App will have access to the data we pass into the 'value=' obj of the FundMeProvider.
 */
  <FundMeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </FundMeProvider>
)
