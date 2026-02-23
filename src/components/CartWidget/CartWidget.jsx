import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import style from "./CartWidget.module.scss";

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/checkout" className={style.cart}>
      <span className={style.icon}>🛒</span>
      {totalItems > 0 && <span className={style.badge}>{totalItems}</span>}
    </Link>
  );
};

export default CartWidget;