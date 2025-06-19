import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import NavRoutes from './NavRoutes.jsx'
import Navbar from './components/Navbar.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <NavRoutes />
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
)
