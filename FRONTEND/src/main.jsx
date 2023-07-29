import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
 import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { Provider } from 'react-redux'
import { apiSlice} from './app/api/apiSlice'
import {store} from './app/store.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
    
    
  </React.StrictMode>,
)
