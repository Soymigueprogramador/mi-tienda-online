import style from "./OrderSuccess.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getOrders } from "../../../../features/orders/utils/orderStorage.js";

const STORAGE_KEY = "orders";

const OrderSuccess = () => {
  const [ valid, setValid ] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  /**
   * 🔐 Protección de acceso directo
   */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if( !stored ) {
      navigate("/");
      return
    }

    const orders = JSON.parse(stored);

    if( !orders ) {
      navigate("/");
      return
    }

    setValid(true);
  }, [navigate]);

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

  if( !order ) {
    return <p> Orden no encontrada </p>
  }

  if( !valid ) return null;

  return (
    <section className={style.container}>
      <h1>¡Compra realizada con éxito!</h1>

      <div className={style.summary}>
        <p><strong>Número de orden:</strong> {order.id}</p>
        <p><strong>Productos comprados:</strong> {totalItems}</p>
        <p><strong>Total pagado:</strong> ${order.total}</p>
        <p><strong>Fecha:</strong> {formattedDate}</p>

        <hr />

        <h2> Datos del comprador </h2>
        <p>
          <strong>
            Nombre: { order.customer.name }
          </strong>
        </p>

        <p>
          <strong>
            Email: { order.customer.email }
          </strong>
        </p>

        <p>
          <strong>
            Direccion de entrega: { order.customer.address }
          </strong>
        </p>
      </div>

      <button onClick={() => navigate("/shop")}>
        Seguir comprando
      </button>
    </section>
  );
};

export default OrderSuccess;