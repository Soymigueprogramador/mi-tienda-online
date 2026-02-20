import { Outlet } from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import ProductCard from "../../features/products/components/ProductCard.jsx";

const AppLayout = () => {
  return (
    <>
        <NavBar />

        <main>

            <Outlet />
            <ProductCard />

        </main>

        <Footer />
    </>
  )
}

export default AppLayout
