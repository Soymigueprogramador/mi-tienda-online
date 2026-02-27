import style from './OrderDetail.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//const ORDERS_STORAGE_KEY = "ecommerce_orders_v1";
const STORAGE_KEY = "orders";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const orders = JSON.parse(stored);
        const foundOrder = orders.find(o => String(o.id) === String(id));
        setOrder(foundOrder || null);
      }
    } catch (error) {
      console.error('Error al obtener la orden', error);
    } finally {
      setLoading(false);
    }
  }, [id]); // Agregamos 'id' como dependencia por buena práctica

  // 1. Manejo de carga
  if (loading) return <p>Cargando detalles de la orden...</p>;

  // 2. Manejo de orden no encontrada
  if (!order) {
    return (
      <section className={style.container}>
        <h2>Orden no encontrada</h2>
        <button onClick={() => navigate("/orders")}>Volver al historial</button>
      </section>
    );
  }

  // 3. Formateo de fecha (ahora es seguro porque 'order' existe)
  const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <section className={style.container}>
      <h2>Detalle de la Orden #{order.id}</h2>

      <div className={style.info}>
        <p><strong>Fecha:</strong> {formattedDate}</p>
        <p><strong>Total pagado:</strong> ${order.total}</p>
      </div>

      <h3> Datos del comprador </h3>
      <div className={style.customer}>
      <p><strong> Nombre: { order.custom?.name } </strong></p>
      <p><strong> Nombre: { order.custom?.email } </strong></p>
      <p><strong> Nombre: { order.custom?.address } </strong></p>
      </div>

      <h3>Productos</h3>
      <ul className={style.productList}>
        {order.items?.map((item) => (
          <li key={item.id}>
            {item.title} × {item.quantity} — ${item.price}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/orders")}>
        Volver al historial
      </button>
    </section>
  );
};

export default OrderDetail;