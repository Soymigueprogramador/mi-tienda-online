import { useCart } from '../../features/cart/hooks/useCart.js'
import style from './Checkout.module.scss'

const Checkout = () => {
  const {
    items,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  if( items.length === 0 ) {
    return <p className={style.empty}>Tu carrito está vacío</p>
  }

  return (
    <>
      <section className={ style.container }>
        <h1> Checkout </h1>

        <div className={ style.list }>
          {
            items.map((item) => (
              <article key={ item.id } className={ style.item }>
                  <img src={ item.image } alt={ item.title } />

                  <div className={ style.info }>
                    <h3>
                      {
                        item.title
                      }
                    </h3>

                    <span>
                      {
                        item.price
                      }
                    </span>
                  </div>

                  <div className={ style }>
                      <button onClick={() => decrement(item.id)}> - </button>
                      <span> { item.quantity } </span>
                      <button onClick={() => increment(item.id)}> + </button>
                  </div>

                  <div onClick={() => removeFromCart(item.id)}>
                    Eliminar producto
                  </div>
              </article>
            ))
          }
        </div>

        <footer className={ style.summary }>
          <h2>
            Total: ${ totalPrice }
          </h2>

          <button onClick={ clearCart }>
            Vaciar carrito
          </button>

          <button className={ style.buy }>
            Finalizar compra
          </button>
        </footer>
      </section>
    </>
  )
}

export default Checkout
