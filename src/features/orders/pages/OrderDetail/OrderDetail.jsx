import style from "./OrderDetail.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../../cart/context/CartContext.jsx";
import { useToast } from "../../../ui/context/ToastContext.jsx";

// ✅ ahora usamos la capa service
import {
  getOrderById,
  updateOrderStatus,
} from "../../../../services/orderService/orderService.js";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addManyToCart } = useCart();
  const { showToast } = useToast();

  /* ---------------- FETCH ORDER ---------------- */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error("Error obteniendo la orden", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  /* ---------------- CANCEL ORDER ---------------- */
  const handleCancelOrder = async () => {
    try {
      const updated = await updateOrderStatus(order.id, "cancelled");
      setOrder(updated);
      showToast("Orden cancelada", "error");
    } catch (error) {
      console.error(error);
      showToast("Error al cancelar la orden", "error");
    }
  };

  /* ---------------- REORDER ---------------- */
  const handleReorder = () => {
    addManyToCart(order.items);
    showToast("Productos agregados nuevamente al carrito", "success");
    navigate("/shop");
  };

  /* ---------------- UI STATES ---------------- */

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
  const status = order.status || "pending";

  return (
    <section className={style.container}>
      <h2>Detalle de la Orden #{order.id}</h2>

      <div className={style.info}>
        <p><strong>Fecha:</strong> {formattedDate}</p>

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
        <p><strong>Nombre:</strong> {order.customer?.name}</p>
        <p><strong>Email:</strong> {order.customer?.email}</p>
        <p><strong>Dirección:</strong> {order.customer?.address}</p>
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