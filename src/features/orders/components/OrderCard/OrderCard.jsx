import style from './OrderCard.module.scss';

const OrderCard = ({ order }) => {
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
      </header>

      <div className={style.body}>
        <p>
          <strong>Productos comprados:</strong> {totalItems}
        </p>

        <p className={style.total}>
          Total pagado: ${order.total}
        </p>
      </div>
    </article>
  );
};

export default OrderCard;