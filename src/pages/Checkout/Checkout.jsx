import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart.js";
import { createOrder } from "../../services/orderService/orderService.js";
import EmptyState from "../../components/EmptyState/EmptyState.jsx";
import style from "./Checkout.module.scss";

const Checkout = () => {

  // Estado que almacena los datos del formulario de compra
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Estado para almacenar errores de validación del formulario
  const [errors, setErrors] = useState({});

  // Controla si la compra se está procesando (loading)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook de navegación de React Router
  const navigate = useNavigate();

  // Hook personalizado del carrito
  // Permite acceder a los productos y a las acciones del carrito
  const { items, increment, decrement, removeFromCart, clearCart, totalPrice } =
    useCart();

  // Si el carrito está vacío se muestra un estado vacío
  if (!items.length) {
    return (
      <EmptyState
        icon="🛒"
        title="Tu carrito está vacío"
        message="Agregá productos para comenzar tu compra."
        actionText="Ir a la tienda"
        onAction={() => navigate("/shop")}
      />
    );
  }

  // Función que valida los datos ingresados en el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre
    if (!form.name.trim()) {
      newErrors.name = "El nombre del comprador es obligatorio";
    }

    // Validación del email
    if (!form.email.trim()) {
      newErrors.email = "El email del comprador es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email es inválido";
    }

    // Validación de la dirección
    if (!form.address.trim()) {
      newErrors.address =
        "La dirección de entrega es obligatoria o el producto no podrá ser entregado";
    }

    // Se guardan los errores en el estado
    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  // Función que procesa la compra
  const handleCheckout = async () => {

    // Primero se valida el formulario
    if (!validateForm()) return;

    // Se activa el estado de carga
    setIsSubmitting(true);

    // Genera un ID único para la orden
    const orderId = crypto.randomUUID();

    // Construcción del objeto orden
    const order = {
      id: orderId,
      items: items.map((item) => ({ ...item })),
      total: totalPrice,
      createdAt: new Date().toISOString(),
      status: "pending",
      customer: {
        name: form.name,
        email: form.email,
        address: form.address,
      },
    };

    try {

      // Llamada al servicio que guarda la orden (simulación de API)
      await createOrder(order);

      // Limpia el carrito después de completar la compra
      clearCart();

      // Resetea el formulario
      setForm({
        name: "",
        email: "",
        address: "",
      });

      // Redirige a la página de éxito de compra
      navigate("/checkout/order-success", {
        state: { orderId },
      });

    } catch (error) {

      // Manejo básico de errores
      console.error("Error al crear la orden", error);

    } finally {

      // Se desactiva el estado de carga
      setIsSubmitting(false);
    }
  };

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el campo correspondiente en el estado
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación básica para habilitar o deshabilitar el botón de compra
  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.address.trim() !== "";

  return (
    <section className={style.container}>
      <h1>Checkout</h1>

      {/* Lista de productos en el carrito */}
      <div className={style.list}>
        {items.map((item) => (
          <article key={item.id} className={style.item}>

            {/* Imagen del producto */}
            <img src={item.image} alt={item.title} />

            {/* Información del producto */}
            <div className={style.info}>
              <h3>{item.title}</h3>
              <span>${item.price}</span>
            </div>

            {/* Controles de cantidad */}
            <div className={style.quantity}>
              <button onClick={() => decrement(item.id)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>

            {/* Botón para eliminar producto */}
            <button
              onClick={() => removeFromCart(item.id)}
              aria-label={`Eliminar ${item.title} del carrito`}
            >
              Eliminar producto
            </button>

          </article>
        ))}
      </div>

      {/* Formulario de datos del comprador */}
      <section className={style.form}>
        <h2>Datos de la compra</h2>

        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Ingresa tu nombre"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className={style.errors}>{errors.name}</span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className={style.errors}>{errors.email}</span>}

        <label htmlFor="address">Direccion</label>
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

      {/* Resumen de la compra */}
      <footer className={style.summary}>
        <h2>Total: ${totalPrice}</h2>

        {/* Botón para vaciar el carrito */}
        <button onClick={clearCart}>Vaciar carrito</button>

        {/* Botón para finalizar la compra */}
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