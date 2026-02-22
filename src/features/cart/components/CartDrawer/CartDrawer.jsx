import style from './CartDrawer.module.scss';
import { useCart } from '../../hooks/useCart';
import Button from '../../../../components/Button/Button.jsx';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeFromCart } = useCart();

  const subtotal = items.reduce(
    ( acc, item ) => acc + item.price * item.quantity, 0
  );

    return (
    <>
        <aside
            className={
                `
                    ${ style.drawer }
                    ${ isOpen ? style.open : "" }
                `
            }
        >
            <div
                className={ style.header }
            >
                <p> Carrito de compras </p>
                <Button onClick={ onClose }> X </Button>
            </div>

            <div className={ style.content }>
                {
                    items.length === 0 && <p> El carrito esta vacio, te invitamos a seguir comprando </p>
                }

                {
                    items.map((item) => {
                        <div key={item.id} className={ style.item }>
                            <img src={ item.image } all={ item.title } />
                            <div>
                                <p>
                                    {
                                        item.title
                                    }
                                    {
                                        item.quantity
                                    }
                                    X
                                    {
                                        item.price
                                    }
                                </p>

                                <Button onClick={() => removeFromCart}>
                                    Eliminar producto
                                </Button>
                            </div>

                            <div className={ style.footer }>
                                <p>
                                    Subtotal: ${ subtotal }
                                </p>
                                <Button> Finalizar la compra </Button>
                            </div>
                        </div>
                    })
                }
            </div>

        </aside>
    </>
  )
}

export default CartDrawer
