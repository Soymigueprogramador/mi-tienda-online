import style from "./OrderSuccess.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getOrders } from "../../../../features/orders/utils/orderStorage.js";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 1️⃣ El orderId viene desde navigate("/checkout/order-success", { state })
   */
  const orderId = location.state?.orderId;

  /**
   * 2️⃣ Si alguien entra manualmente a la URL,
   * lo redirigimos correctamente
   */
  useEffect(() => {
    if (!orderId) {
      navigate("/shop");
    }
  }, [orderId, navigate]);

  /**
   * 3️⃣ Leer órdenes guardadas
   */
  const orders = getOrders();

  /**
   * 4️⃣ Buscar la orden correspondiente
   */
  const order = useMemo(() => {
    return orders.find((o) => o.id === orderId);
  }, [orders, orderId]);

  /**
   * Mientras redirige o busca, no renderizamos nada
   */
  if (!order) return null;

  /**
   * 5️⃣ Datos derivados para mostrar
   */
  const totalItems = order.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // ✅ usar la propiedad correcta
  const formattedDate = new Date(order.date).toLocaleString();

  /**
   * 6️⃣ Render final
   */
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