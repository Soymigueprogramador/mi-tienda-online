import { useState } from 'react';
import style from './OrderCard.module.scss';

const OrderCard = ({ order }) => {
  // Hacemos que se puedan abrir y cerrar el detalle de las ordenes.
  const [ open, setOpen ] = useState(false);

  // Total de productos comprados
  const totalItems = order.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // Fecha formateada
  const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <article className={style.card}>
      <header className={style.header}>
        <span className={style.id}>
          Número de orden: #{order.id}
        </span>

        <span className={style.date}>
          Fecha: {formattedDate}
        </span>

        <button
          className={style.toggle}
          onClick={() => setOpen(!open)}
        >
          {
            open ? 'Ocultar detalle' : 'Ver detalle'
          }
        </button>
      </header>

      <div className={style.body}>
        <p>
          <strong>Productos comprados:</strong> {totalItems}
        </p>

        <p className={style.total}>
          Total pagado: ${order.total}
        </p>
      </div>

      {
        open && (
          <ul className={style.items}>
            {
              order.items.map(item => (
                <li key={item.id}>
                  {item.title} × {item.quantity} — ${item.price}
                </li>
              ))
            }
          </ul>
        )
      }
    </article>
  );
};

export default OrderCard;