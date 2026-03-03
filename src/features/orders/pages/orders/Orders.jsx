import { useNavigate } from "react-router-dom";
import style from "./orders.module.scss";

import OrderCard from "../../components/OrderCard/OrderCard.jsx";
import { useOrders } from "../../hooks/useOrders.js";

const Orders = () => {
  const navigate = useNavigate();

  const { orders, loading, error, refresh } = useOrders();

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <section className={style.container}>
        <p>Cargando órdenes...</p>
      </section>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <section className={style.container}>
        <p>{error}</p>
        <button onClick={refresh}>Reintentar</button>
      </section>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (!orders.length) {
    return (
      <section className={style.empty}>
        <h1>No realizaste ninguna compra</h1>
        <p>Cuando compres algo te lo vamos a mostrar aquí</p>
        <button onClick={() => navigate("/shop")}>
          Ir a la tienda
        </button>
      </section>
    );
  }

  /* ---------------- SORT ---------------- */
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className={style.container}>
      <h1 className={style.title}>Mis compras</h1>

      <div className={style.list}>
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
};

export default Orders;