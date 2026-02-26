import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../../Layout/AppLayout/AppLayout.jsx";
import Home from "../../pages/Home/Home.jsx";
import ProductDetail from "../../pages/ProductDetail/ProductDetail.jsx";
import Shop from "../../pages/Shop/Shop.jsx";
import Checkout from "../../pages/Checkout/Checkout.jsx";
import OrderSuccess from "../../features/cart/pages/OrderSuccess/OrderSuccess.jsx";
import Orders from '../../features/orders/pages/orders/Orders.jsx';
import OrderDetail from '../../features/orders/pages/OrderDetail/OrderDetail.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />

          <Route path="checkout">
            <Route index element={<Checkout />} />
            <Route path="order-success" element={<OrderSuccess />} />
          </Route>

          <Route path="orders" element={<Orders />} />
          <Route path="/orders/:id" element={ <OrderDetail/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;