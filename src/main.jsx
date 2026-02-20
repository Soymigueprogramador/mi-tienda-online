import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss';
import Router from './app/Router/Router.jsx';
import { CartProvider } from './features/cart/context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <Router />
    </CartProvider>
  </StrictMode>,
)
