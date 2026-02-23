import style from "./OrderSuccess.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderId = state?.orderId;

  return (
    <>
      <section className={style.container}>
        <h1>¡Compra realizada con éxito! 🎉</h1>

        <p>Tu numero de orden es:</p>
        <strong className={style.orderId}>{orderId}</strong>

        <button onClick={() => navigate("/shop")}>Volver a la tienda</button>
      </section>
    </>
  );
};

export default OrderSuccess;