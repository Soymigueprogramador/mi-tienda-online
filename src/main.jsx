import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss';
import Router from './app/Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
