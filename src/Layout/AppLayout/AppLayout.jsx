import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CartDrawer from "../../features/cart/components/CartDrawer/CartDrawer.jsx";

const AppLayout = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      

      <main>
        <NavBar onCartClick={() => setCartOpen(true)} />

        <Outlet />

        <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      </main>

      <Footer />
    </>
  );
};

export default AppLayout;