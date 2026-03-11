import style from "./OrderSuccess.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getOrders } from "../../../../features/orders/utils/orderStorage.js";

/* ------------------------------------------------ */
/* CLAVE DE STORAGE */
/* ------------------------------------------------ */
/*
Clave utilizada para leer las órdenes almacenadas
en el localStorage.
*/
const STORAGE_KEY = "orders";

/* ------------------------------------------------ */
/* COMPONENTE: ORDER SUCCESS */
/* ------------------------------------------------ */
/*
Responsabilidad del componente:

• Mostrar la confirmación de compra
• Recuperar la orden generada
• Mostrar el resumen de la compra
• Mostrar los datos del comprador
• Proteger el acceso directo a la ruta
*/

const OrderSuccess = () => {

  /* ------------------------------------------------ */
  /* ESTADO DE VALIDACIÓN DE ACCESO */
  /* ------------------------------------------------ */
  /*
  Se usa para evitar que el usuario acceda a esta página
  manualmente sin haber pasado por el flujo de checkout.
  */
  const [valid, setValid] = useState(false);


  /* ------------------------------------------------ */
  /* HOOKS DE REACT ROUTER */
  /* ------------------------------------------------ */

  /* Permite redirigir programáticamente */
  const navigate = useNavigate();

  /* Permite acceder al estado enviado desde la navegación */
  const location = useLocation();


  /* ------------------------------------------------ */
  /* ID DE ORDEN RECIBIDO DESDE LA NAVEGACIÓN */
  /* ------------------------------------------------ */
  /*
  Se espera que el checkout redirija a esta página
  enviando el orderId dentro de location.state.
  */
  const orderId = location.state?.orderId;


  /* ------------------------------------------------ */
  /* PROTECCIÓN DE ACCESO DIRECTO */
  /* ------------------------------------------------ */
  /*
  Evita que el usuario acceda directamente a esta página
  sin haber generado una orden previamente.
  */
  useEffect(() => {

    const stored = localStorage.getItem(STORAGE_KEY);

    /* Si no existe storage de órdenes se redirige al home */
    if (!stored) {
      navigate("/");
      return;
    }

    const orders = JSON.parse(stored);

    /* Si el contenido no es válido también se redirige */
    if (!orders) {
      navigate("/");
      return;
    }

    /* Si todo es correcto se habilita el render */
    setValid(true);

  }, [navigate]);


  /* ------------------------------------------------ */
  /* VALIDACIÓN DE ID DE ORDEN */
  /* ------------------------------------------------ */
  /*
  Si no se recibió un orderId desde la navegación,
  el componente no renderiza nada.
  */
  if (!orderId) return null;


  /* ------------------------------------------------ */
  /* LECTURA DE ÓRDENES GUARDADAS */
  /* ------------------------------------------------ */
  /*
  Utiliza la utilidad getOrders para obtener todas
  las órdenes almacenadas.
  */
  const orders = getOrders();


  /* ------------------------------------------------ */
  /* BÚSQUEDA DE LA ORDEN ACTUAL */
  /* ------------------------------------------------ */
  /*
  useMemo evita recalcular la búsqueda en cada render.
  Solo se ejecuta cuando cambian orders u orderId.
  */
  const order = useMemo(() => {
    return orders.find((o) => o.id === orderId);
  }, [orders, orderId]);


  /* Si la orden no existe no se renderiza */
  if (!order) return null;


  /* ------------------------------------------------ */
  /* DATOS DERIVADOS DE LA ORDEN */
  /* ------------------------------------------------ */

  /*
  Total de productos comprados
  (sumatoria de cantidades).
  */
  const totalItems = order.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  /*
  Formateo de fecha de creación de la orden
  para mostrarla en formato legible.
  */
  const formattedDate = new Date(order.createdAt).toLocaleString();


  /* ------------------------------------------------ */
  /* VALIDACIÓN FINAL DE ORDEN */
  /* ------------------------------------------------ */
  if (!order) {
    return <p>Orden no encontrada</p>;
  }

  /* Evita render hasta confirmar validación */
  if (!valid) return null;


  /* ------------------------------------------------ */
  /* RENDER DEL COMPONENTE */
  /* ------------------------------------------------ */

  return (
    <section className={style.container}>

      {/* Mensaje principal de confirmación */}
      <h1>¡Compra realizada con éxito!</h1>

      <div className={style.summary}>

        {/* Información básica de la orden */}
        <p>
          <strong>Número de orden:</strong> {order.id}
        </p>

        <p>
          <strong>Productos comprados:</strong> {totalItems}
        </p>

        <p>
          <strong>Total pagado:</strong> ${order.total}
        </p>

        <p>
          <strong>Fecha:</strong> {formattedDate}
        </p>

        <hr />

        {/* Datos del comprador */}
        <h2>Datos del comprador</h2>

        <p>
          <strong>
            Nombre: {order.customer.name}
          </strong>
        </p>

        <p>
          <strong>
            Email: {order.customer.email}
          </strong>
        </p>

        <p>
          <strong>
            Dirección de entrega: {order.customer.address}
          </strong>
        </p>

      </div>

      {/* Botón para continuar comprando */}
      <button onClick={() => navigate("/shop")}>
        Seguir comprando
      </button>

    </section>
  );
};

export default OrderSuccess;