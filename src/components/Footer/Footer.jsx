import { Link } from "react-router-dom";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>© 2026 Mi Online Shop</p>

      <div className={style.links}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p className={style.made}>
        Desarrollado con React
      </p>
    </footer>
  );
};

export default Footer;