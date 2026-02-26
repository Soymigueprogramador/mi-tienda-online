import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart.js";
import { saveOrder } from "../../features/orders/utils/orderStorage.js";
import style from "./Checkout.module.scss";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { items, increment, decrement, removeFromCart, clearCart, totalPrice } =
    useCart();

  /* ---------------- VALIDACIÓN ---------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre del comprador es obligatorio";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email del comprador es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email es inválido";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "La dirección de entrega es obligatoria o el producto no podrá ser entregado";
    }

    setErrors(newErrors);

    // true si NO hay errores
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- CHECKOUT ---------------- */
  const handleCheckout = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const orderId = crypto.randomUUID();

    const order = {
      id: orderId,
      items: items.map((item) => ({ ...item })),
      total: totalPrice,
      createdAt: new Date().toISOString(),
      customer: {
        name: form.name,
        email: form.email,
        address: form.address,
      },
    };

    // simulación request HTTP
    setTimeout(() => {
      saveOrder(order);
      clearCart();

      setForm({
        name: "",
        email: "",
        address: "",
      });

      navigate("/checkout/order-success", {
        state: { orderId },
      });
    }, 1000);
  };

  /* ---------------- HANDLERS ---------------- */
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

  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.address.trim() !== "";

  return (
    <section className={style.container}>
      <h1>Checkout</h1>

      <div className={style.list}>
        {items.map((item) => (
          <article key={item.id} className={style.item}>
            <img src={item.image} alt={item.title} />

            <div className={style.info}>
              <h3>{item.title}</h3>
              <span>${item.price}</span>
            </div>

            <div className={style.quantity}>
              <button onClick={() => decrement(item.id)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>

            <button onClick={() => removeFromCart(item.id)}>
              Eliminar producto
            </button>
          </article>
        ))}
      </div>

      <section className={style.form}>
        <h2>Datos de la compra</h2>

        <input
          type="text"
          name="name"
          placeholder="Ingresa tu nombre"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className={style.errors}>{errors.name}</span>}

        <input
          type="email"
          name="email"
          placeholder="Ingresa tu email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className={style.errors}>{errors.email}</span>}

        <input
          type="text"
          name="address"
          placeholder="Ingresa la dirección de entrega"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && (
          <span className={style.errors}>{errors.address}</span>
        )}
      </section>

      <footer className={style.summary}>
        <h2>Total: ${totalPrice}</h2>

        <button onClick={clearCart}>Vaciar carrito</button>

        <button
          className={style.buy}
          onClick={handleCheckout}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Procesando compra..." : "Finalizar compra"}
        </button>
      </footer>
    </section>
  );
};

export default Checkout;