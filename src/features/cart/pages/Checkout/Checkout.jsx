import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
//import { saveOrder } from "../../features/orders/utils/orderStorage";
import style from "./Checkout.module.scss";
import { createOrder, createPreference } from '../../../../services/Api/Api.js'

/* ------------------------------------------------ */
/* COMPONENTE: CHECKOUT */
/* ------------------------------------------------ */

const Checkout = () => {

  /* ------------------------------------------------ */
  /* HOOK DE NAVEGACIÓN */
  /* ------------------------------------------------ */

  const navigate = useNavigate();


  /* ------------------------------------------------ */
  /* ESTADO DEL FORMULARIO */
  /* ------------------------------------------------ */

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });


  /* ------------------------------------------------ */
  /* DATOS DEL CARRITO */
  /* ------------------------------------------------ */

  const { items, clearCart, totalPrice } = useCart();


  /* ------------------------------------------------ */
  /* MANEJO DE FINALIZACIÓN DE COMPRA (INTEGRADO CON BACKEND)
  /* ------------------------------------------------ */

  const handleCheckout = async () => {

    /* Evita procesar si el carrito está vacío */
    if (items.length === 0) return;

    try {

      /* Convertimos los items del carrito al formato del backend */

      const formattedItems = items.map((product) => ({
        productId: product._id || product.id,
        name: product.title || product.name,
        price: product.price,
        quantity: product.quantity
      }));


      /* Crear orden en el backend */

      const order = await createOrder({
        items: formattedItems,
        total: totalPrice,
        customer: form
      });


      /* Crear preferencia de pago en MercadoPago */

      const preference = await createPreference({
        items: formattedItems,
        orderId: order._id
      });


      /* Limpiar carrito antes de redirigir */

      clearCart();


      /* Redirigir al checkout de MercadoPago */

      window.location.href =
        `https://www.mercadopago.com/checkout/v1/redirect?pref_id=${preference.id}`;

    } catch (error) {

      console.error("Error en checkout:", error);

    }

  };


  /* ------------------------------------------------ */
  /* MANEJO DE CAMBIOS EN EL FORMULARIO */
  /* ------------------------------------------------ */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* ------------------------------------------------ */
  /* ESTADO VACÍO DEL CARRITO */
  /* ------------------------------------------------ */

  if (items.length === 0) {
    return <p className={style.empty}>Tu carrito está vacío</p>;
  }


  /* ------------------------------------------------ */
  /* RENDER DEL COMPONENTE */
  /* ------------------------------------------------ */

  return (
    <section className={style.container}>

      <h1>Checkout</h1>

      {/* ---------------- FORMULARIO ---------------- */}

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

      {/* ---------------- RESUMEN DE COMPRA ---------------- */}

      <footer className={style.summary}>

        <h2>Total: ${totalPrice}</h2>

        <button
          className={style.buy}
          onClick={handleCheckout}
        >
          Finalizar compra
        </button>

      </footer>

    </section>
  );
};

export default Checkout;