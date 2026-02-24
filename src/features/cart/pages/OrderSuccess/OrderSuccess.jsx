import style from "./OrderSuccess.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getOrders } from "../../../../features/orders/utils/orderStorage.js";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  /**
   * 🔐 Protección de acceso directo
   */
  useEffect(() => {
    if (!orderId) {
      navigate("/shop", { replace: true });
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  /**
   * Leer órdenes guardadas
   */
  const orders = getOrders();

  const order = useMemo(() => {
    return orders.find(o => o.id === orderId);
  }, [orders, orderId]);

  if (!order) return null;

  /**
   * Datos derivados
   */
  const totalItems = order.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <section className={style.container}>
      <h1>¡Compra realizada con éxito!</h1>

      <div className={style.summary}>
        <p><strong>Número de orden:</strong> {order.id}</p>
        <p><strong>Productos comprados:</strong> {totalItems}</p>
        <p><strong>Total pagado:</strong> ${order.total}</p>
        <p><strong>Fecha:</strong> {formattedDate}</p>
      </div>

      <button onClick={() => navigate("/shop")}>
        Seguir comprando
      </button>
    </section>
  );
};

export default OrderSuccess;