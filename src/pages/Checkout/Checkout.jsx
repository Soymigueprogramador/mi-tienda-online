import { useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart.js";
import { saveOrder } from "../../features/orders/utils/orderStorage.js";
import style from "./Checkout.module.scss";

const Checkout = () => {
  const navigate = useNavigate();

  const { items, increment, decrement, removeFromCart, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return <p className={style.empty}>Tu carrito está vacío</p>;
  }

  const handleCheckout = () => {
    const orderId = crypto.randomUUID();

    // ⚠️ CLONAMOS items (una orden NO debe depender del carrito vivo)
    const order = {
      id: orderId,
      items: items.map(item => ({ ...item })),
      total: totalPrice,
      date: new Date().toISOString(),
    };

    saveOrder(order);   // 1️⃣ guardamos orden
    clearCart();        // 2️⃣ recién ahora limpiamos carrito

    navigate("/checkout/order-success", {
      state: { orderId },
    });
  };

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

      <footer className={style.summary}>
        <h2>Total: ${totalPrice}</h2>

        <button onClick={clearCart}>Vaciar carrito</button>

        <button className={style.buy} onClick={handleCheckout}>
          Finalizar compra
        </button>
      </footer>
    </section>
  );
};

export default Checkout;