import { Link } from "react-router-dom";
import { useState } from "react";
import CartWidget from "../CartWidget/CartWidget.jsx";
import style from "./NavBar.module.scss";

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={style.header}>

      <Link to="/" className={style.logo}>
        Tienda online 🏪
      </Link>

      {/* BOTON HAMBURGUESA */}

      <button
        className={style.menuButton}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* NAV */}

      <nav className={`${style.nav} ${menuOpen ? style.open : ""}`}>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/shop" onClick={closeMenu}>
          Shop
        </Link>

        <Link to="/orders" onClick={closeMenu}>
          Mis compras
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          Contacto
        </Link>

      </nav>

      <div className={style.cart}>
        <CartWidget />
      </div>

    </header>
  );
};

export default NavBar;