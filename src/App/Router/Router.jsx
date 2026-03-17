// Importación de los componentes principales de React Router
// BrowserRouter gestiona el historial de navegación del navegador
// Routes actúa como contenedor de todas las rutas definidas
// Route permite declarar cada ruta individual de la aplicación
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout principal de la aplicación.
// Este componente normalmente contiene la estructura global
// (navbar, footer, etc.) y un <Outlet /> donde se renderizan
// las páginas correspondientes a cada ruta hija.
import AppLayout from "../../Layout/AppLayout/AppLayout.jsx";

// Páginas principales de la aplicación
import Home from "../../pages/Home/Home.jsx"; // Página de inicio
import ProductDetail from "../../pages/ProductDetail/ProductDetail.jsx"; // Vista detallada de un producto
import Shop from "../../pages/Shop/Shop.jsx"; // Catálogo de productos
import Checkout from "../../pages/Checkout/Checkout.jsx"; // Proceso de compra

// Página que se muestra cuando una orden se completa exitosamente
import OrderSuccess from "../../features/cart/pages/OrderSuccess/OrderSuccess.jsx";

// Páginas relacionadas con la gestión de órdenes del usuario
import Orders from '../../features/orders/pages/orders/Orders.jsx'; // Listado de órdenes
import OrderDetail from '../../features/orders/pages/OrderDetail/OrderDetail.jsx'; // Detalle de una orden específica

// Página mostrada cuando el usuario intenta acceder a una ruta inexistente
import NotFound from '../../pages/NotFound/NotFound.jsx'

// Página de contacto del sitio
import Contact from '../../pages/Contact/Contact.jsx'

// Página de login del sitio
import Login from '../../pages/Login/Login.jsx'


// Componente encargado de definir la configuración de rutas de la aplicación.
// Centraliza la navegación y organiza las páginas dentro de un layout común.
const Router = () => {
  return (
    // BrowserRouter habilita el sistema de navegación basado en el historial
    // del navegador (HTML5 History API).
    <BrowserRouter>

      {/* Contenedor que agrupa todas las rutas de la aplicación */}
      <Routes>

        {/*
          Ruta raíz de la aplicación.
          Renderiza AppLayout, que actúa como layout principal
          y contiene un <Outlet /> para mostrar las rutas hijas.
        */}
        <Route path="/" element={<AppLayout />}>

          {/* Ruta index: corresponde a "/" y renderiza la página de inicio */}
          <Route index element={<Home />} />

          {/* Ruta para el catálogo de productos */}
          <Route path="shop" element={<Shop />} />

          {/*
            Ruta dinámica para el detalle de producto.
            :id representa el identificador del producto
            obtenido desde la URL.
          */}
          <Route path="product/:id" element={<ProductDetail />} />

          {/*
            Grupo de rutas relacionadas con el proceso de checkout.
            Permite estructurar subrutas dentro del flujo de compra.
          */}
          <Route path="checkout">

            {/* Página principal del proceso de pago */}
            <Route index element={<Checkout />} />

            {/* Página mostrada después de completar exitosamente una compra */}
            <Route path="order-success" element={<OrderSuccess />} />
          </Route>

          {/* Página que muestra el listado de órdenes del usuario */}
          <Route path="orders" element={<Orders />} />

          {/*
            Ruta dinámica para visualizar el detalle de una orden específica.
            El parámetro :id identifica la orden seleccionada.
          */}
          <Route path="/orders/:id" element={<OrderDetail />} />

          {/* Página de contacto del sitio */}
          <Route path="/contact" element={<Contact />} />

          {/* Ruta a la pagina del login */}
          <Route path="/login" element={ <Login /> } />

          {/*
            Ruta comodín.
            Captura cualquier URL que no coincida con las rutas definidas
            y renderiza la página de error 404.
          */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// Exportación del router para ser utilizado en el punto de entrada de la aplicación
export default Router;