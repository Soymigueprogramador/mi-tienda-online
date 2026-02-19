import { Outlet } from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const AppLayout = () => {
  return (
    <>
        <NavBar />

        <main>

            <Outlet />
            
        </main>

        <Footer />
    </>
  )
}

export default AppLayout
