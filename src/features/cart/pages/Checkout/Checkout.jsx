import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import { saveOrder } from "../../features/orders/utils/orderStorage";
import style from "./Checkout.module.scss";

const Checkout = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Datos del carrito
  const { items, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;

    const orderId = crypto.randomUUID();

    const order = {
      id: orderId,
      items: items.map((item) => ({ ...item })),
      total: totalPrice,
      createdAt: new Date().toISOString(),
      customer: form,
      status: "pending",
    };

    saveOrder(order);
    clearCart();

    // 🔴 Paso 3 de la Tarea 12
    navigate(`/orders/${orderId}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (items.length === 0) {
    return <p className={style.empty}>Tu carrito está vacío</p>;
  }

  return (
    <section className={style.container}>
      <h1>Checkout</h1>

      <section className={style.form}>
        <h2>Datos de compra</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Dirección de envío"
          value={form.address}
          onChange={handleChange}
        />
      </section>

      <footer className={style.summary}>
        <h2>Total: ${totalPrice}</h2>

        <button className={style.buy} onClick={handleCheckout}>
          Finalizar compra
        </button>
      </footer>
    </section>
  );
};

export default Checkout;