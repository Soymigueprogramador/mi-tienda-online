import style from "./OrderDetail.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateOrder } from "../../utils/orderStorage.js";
import { useCart } from "../../../cart/context/CartContext.jsx";
import { useToast } from "../../../ui/context/ToastContext.jsx";

const STORAGE_KEY = "orders";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addManyToCart } = useCart();
  const { showToast } = useToast();

  /**
   * 🔎 Cargar orden
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const orders = JSON.parse(stored);
        const foundOrder = orders.find((o) => String(o.id) === String(id));
        setOrder(foundOrder || null);
      }
    } catch (error) {
      console.error("Error al obtener la orden", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  /**
   * ⚠️ Mostrar toast SOLO cuando la orden pasa a cancelada
   * (Nunca en el render)
   */
  useEffect(() => {
    if (order?.status === "cancelled") {
      showToast("La orden fue cancelada", "error");
    }
  }, [order?.status, showToast]);

  if (loading) return <p>Cargando detalles de la orden...</p>;

  if (!order) {
    return (
      <section className={style.container}>
        <h2>Orden no encontrada</h2>
        <button onClick={() => navigate("/orders")}>
          Volver al historial
        </button>
      </section>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleString("es-AR");

  /**
   * ❌ Cancelar orden
   */
  const handleCancelOrder = () => {
    const updated = { ...order, status: "cancelled" };
    updateOrder(updated);
    setOrder(updated);
  };

  /**
   * 🔁 Reordenar
   */
  const handleReorder = () => {
    addManyToCart(order.items);
    showToast("Productos agregados nuevamente al carrito", "success");
    navigate("/shop");
  };

  const status = order.status || "pending";

  return (
    <section className={style.container}>
      <h2>Detalle de la Orden #{order.id}</h2>

      <div className={style.info}>
        <p>
          <strong>Fecha:</strong> {formattedDate}
        </p>

        <p>
          <strong>Total pagado:</strong>{" "}
          {order.total.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>

        <p>
          <strong>Estado:</strong>{" "}
          <span className={`${style.status} ${style[status]}`}>
            {status === "pending" ? "Pendiente" : "Cancelada"}
          </span>
        </p>
      </div>

      <h3>Datos del comprador</h3>
      <div className={style.customer}>
        <p><strong>Nombre:</strong> {order.custom?.name}</p>
        <p><strong>Email:</strong> {order.custom?.email}</p>
        <p><strong>Dirección:</strong> {order.custom?.address}</p>
      </div>

      <h3>Productos</h3>
      <ul className={style.productList}>
        {order.items?.map((item) => (
          <li key={item.id}>
            {item.title} × {item.quantity} —{" "}
            {item.price.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/orders")}>
        Volver al historial
      </button>

      <button onClick={handleReorder} className={style.reorder}>
        Volver a comprar
      </button>

      {status === "pending" && (
        <button onClick={handleCancelOrder} className={style.cancel}>
          Cancelar orden
        </button>
      )}
    </section>
  );
};

export default OrderDetail;