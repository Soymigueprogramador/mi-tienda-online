// Importacion elementos de react router dom.
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importacion del archivo appLayout.
import AppLayout from '../../Layout/AppLayout/AppLayout.jsx';

// Importacion de las paginas.
import Home from '../../pages/Home/Home.jsx';
import ProductDetail from '../../pages/ProductDetail/ProductDetail.jsx';
import Shop from '../../pages/Shop/Shop.jsx';
import Checkout from '../../pages/Checkout/Checkout.jsx';

const Router = () => {
  return (
    <>
        <BrowserRouter>

            <Routes>
                <Route path="/" element={ < AppLayout /> }>
                  <Route index element={ < Home /> } />
                  <Route path="shop" element={ < Shop /> } />
                  <Route path="product/:id" element={ < ProductDetail /> } />
                  <Route path="checkout" element={ < Checkout /> } />
                </Route>

            </Routes>

        </BrowserRouter>
    </>
  )
}

export default Router
