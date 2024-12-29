import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" toastOptions={{
      duration: 3000,
      style: {
        background: '#333',
        color: '#fff',
      },
    }} />
    <App />
  </React.StrictMode>,
)