import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./orders.module.scss";

import OrderCard from "../../components/OrderCard/OrderCard.jsx";

// ✅ ahora usamos el service (fake API)
import { getOrders } from "../../../../services/orderService/orderService.js";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ORDERS ---------------- */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(); // ← ahora es async
        setOrders(data);
      } catch (error) {
        console.error("Error obteniendo órdenes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <section className={style.container}>
        <p>Cargando órdenes...</p>
      </section>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
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

  /* ---------------- RENDER ---------------- */
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