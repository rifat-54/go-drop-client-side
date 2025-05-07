import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto'>

   <RouterProvider router={routes}></RouterProvider>
    </div>
  </StrictMode>,
)
