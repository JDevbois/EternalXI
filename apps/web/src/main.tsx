import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from '@/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: '#1a1008',
          color: '#f5efe6',
          fontFamily: 'Roboto Slab, serif',
          fontSize: '14px',
          border: '2px solid #8B6914',
        },
      }}
    />
  </StrictMode>
)
