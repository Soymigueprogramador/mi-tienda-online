import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import style from "./CartWidget.module.scss";

const CartWidget = () => {
  // 🔹 Obtenemos el total de productos del contexto global
  const { totalItems } = useCart();

  return (
    <Link to="/checkout" className={style.cart}>
      🛒

      {/* 🔹 Badge condicional (solo aparece si hay productos) */}
      {totalItems > 0 && (
        <span className={style.badge}>
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;