import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import { saveOrder } from "../../features/orders/utils/orderStorage";
import style from "./Checkout.module.scss";

/* ------------------------------------------------ */
/* COMPONENTE: CHECKOUT */
/* ------------------------------------------------ */
/*
Responsabilidad del componente:

• Recoger los datos del comprador
• Mostrar el total de la compra
• Generar una orden
• Guardarla en storage
• Vaciar el carrito
• Redirigir al detalle de la orden creada
*/

const Checkout = () => {

  /* ------------------------------------------------ */
  /* HOOK DE NAVEGACIÓN */
  /* ------------------------------------------------ */

  /*
  Permite redirigir programáticamente
  después de completar la compra.
  */
  const navigate = useNavigate();


  /* ------------------------------------------------ */
  /* ESTADO DEL FORMULARIO */
  /* ------------------------------------------------ */

  /*
  Almacena los datos del cliente
  necesarios para completar la compra.
  */
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });


  /* ------------------------------------------------ */
  /* DATOS DEL CARRITO */
  /* ------------------------------------------------ */

  /*
  Se consumen desde el CartContext mediante
  el custom hook useCart.
  */
  const { items, clearCart, totalPrice } = useCart();


  /* ------------------------------------------------ */
  /* MANEJO DE FINALIZACIÓN DE COMPRA */
  /* ------------------------------------------------ */

  const handleCheckout = () => {

    /* Evita procesar el checkout si el carrito está vacío */
    if (items.length === 0) return;

    /* Genera un identificador único para la orden */
    const orderId = crypto.randomUUID();

    /*
    Construcción del objeto orden que se almacenará.
    Se incluye:
    - id único
    - productos comprados
    - total de la compra
    - fecha de creación
    - datos del cliente
    - estado de la orden
    */
    const order = {
      id: orderId,

      /* Se clonan los items para evitar mutaciones */
      items: items.map((item) => ({ ...item })),

      total: totalPrice,

      createdAt: new Date().toISOString(),

      customer: form,

      status: "pending",
    };

    /* Guarda la orden en storage */
    saveOrder(order);

    /* Limpia el carrito después de comprar */
    clearCart();

    /*
    Redirección al detalle de la orden creada.
    Esto permite mostrar la confirmación de compra.
    */
    navigate(`/orders/${orderId}`);
  };


  /* ------------------------------------------------ */
  /* MANEJO DE CAMBIOS EN EL FORMULARIO */
  /* ------------------------------------------------ */

  const handleChange = (e) => {

    /*
    Se extraen el nombre del input y su valor
    para actualizar dinámicamente el estado.
    */
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* ------------------------------------------------ */
  /* ESTADO VACÍO DEL CARRITO */
  /* ------------------------------------------------ */

  /*
  Si el carrito está vacío se muestra
  un mensaje en lugar del formulario.
  */
  if (items.length === 0) {
    return <p className={style.empty}>Tu carrito está vacío</p>;
  }


  /* ------------------------------------------------ */
  /* RENDER DEL COMPONENTE */
  /* ------------------------------------------------ */

  return (
    <section className={style.container}>

      {/* Título principal del checkout */}
      <h1>Checkout</h1>


      {/* ---------------- FORMULARIO ---------------- */}

      <section className={style.form}>
        <h2>Datos de compra</h2>

        {/* Nombre del cliente */}
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
        />

        {/* Email del cliente */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        {/* Dirección de envío */}
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

        {/* Total calculado del carrito */}
        <h2>Total: ${totalPrice}</h2>

        {/* Botón para finalizar la compra */}
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