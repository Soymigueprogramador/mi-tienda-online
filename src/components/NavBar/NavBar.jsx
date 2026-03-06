// Importación de Link para navegación interna dentro de la SPA.
// Permite cambiar de ruta sin recargar la página.
import { Link } from "react-router-dom";

// Hook de React para manejar estado local dentro del componente.
import { useState } from "react";

// Componente que muestra el ícono del carrito y el contador de productos.
import CartWidget from "../CartWidget/CartWidget.jsx";

// Importación de estilos utilizando CSS Modules.
import style from "./NavBar.module.scss";


/**
 * NavBar
 *
 * Componente responsable de la navegación principal del sitio.
 * Incluye:
 * - Logo que redirige al Home
 * - Menú de navegación
 * - Botón hamburguesa para versión mobile
 * - Acceso rápido al carrito
 */
const NavBar = () => {

  /**
   * Estado que controla si el menú móvil está abierto o cerrado.
   * true  → menú visible
   * false → menú oculto
   */
  const [menuOpen, setMenuOpen] = useState(false);


  /**
   * Alterna el estado del menú hamburguesa.
   * Si está cerrado lo abre, si está abierto lo cierra.
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  /**
   * Cierra el menú.
   * Se utiliza cuando el usuario hace click en un link
   * para evitar que el menú quede abierto en mobile.
   */
  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (

    // Contenedor principal de la barra de navegación
    <header className={style.header}>

      {/* Logo del sitio que redirige a la página principal */}
      <Link to="/" className={style.logo}>
        Tienda online 🏪
      </Link>


      {/* ------------------------------------------------
         BOTÓN HAMBURGUESA
         Visible principalmente en dispositivos móviles
         ------------------------------------------------ */}

      <button
        className={style.menuButton}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        ☰
      </button>


      {/* ------------------------------------------------
         MENÚ DE NAVEGACIÓN
         Se le agrega la clase "open" cuando el menú
         está activo en mobile
         ------------------------------------------------ */}

      <nav
        className={`
          ${style.nav}
          ${menuOpen ? style.open : ""}
        `}
      >

        {/* Link a la página principal */}
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        {/* Link a la tienda */}
        <Link to="/shop" onClick={closeMenu}>
          Shop
        </Link>

        {/* Link a la página de órdenes del usuario */}
        <Link to="/orders" onClick={closeMenu}>
          Mis compras
        </Link>

        {/* Link a la página de contacto */}
        <Link to="/contact" onClick={closeMenu}>
          Contacto
        </Link>

      </nav>


      {/* ------------------------------------------------
         WIDGET DEL CARRITO
         Muestra icono y cantidad de productos agregados
         ------------------------------------------------ */}

      <div className={style.cart}>
        <CartWidget />
      </div>

    </header>
  );
};


// Exportación del componente para usarlo en el layout principal
export default NavBar;