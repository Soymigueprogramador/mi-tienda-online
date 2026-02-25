import style from './orders.module.scss';
import OrderCard from '../../components/OrderCard/OrderCard.jsx';
import { useNavigate } from 'react-router-dom';;
import { getOrders } from '../../utils/orderStorage.js';

const orders = () => {
  const navigate = useNavigate();

  // Lleyendo las ordenes persistentes
  const orders = getOrders();

  // Ordenamos las fechas por la mas reciente.
  const sortedOrders = [ ...orders ].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Este render se muestra cuando el usuario no tiene productos comprados
  if( sortedOrders.length === 0 ) {
    return (
        <section className={style.empty}>
            <h1>
                No realizaste ninguna compra
             </h1>
            <p>
                Cuando compres algo te lo vamos a mostrar aqui
            </p>

            <button onClick={() => navigate("/shop")}>
                Ir a la tienda
            </button>
        </section>
    )
  }

    return (
    <>
        <section className={style.container}>
            <h1 className={style.title}>
                Mis compras
            </h1>

            <div className={style.list}>
                {
                    sortedOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))
                }
            </div>
        </section>
    </>
  )
}

export default orders
