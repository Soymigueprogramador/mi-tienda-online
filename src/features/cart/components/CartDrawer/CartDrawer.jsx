// Importamos los estilos del Drawer del carrito
import style from './CartDrawer.module.scss';

// Hook personalizado que nos da acceso al estado global del carrito
import { useCart } from '../../hooks/useCart';

// Componente reutilizable de botón
import Button from '../../../../components/Button/Button.jsx';

/* ------------------------------------------------ */
/* COMPONENTE CART DRAWER */
/* ------------------------------------------------ */

// Drawer lateral que muestra el carrito de compras.
// Recibe:
// isOpen → controla si el drawer está visible
// onClose → función para cerrar el drawer
const CartDrawer = ({ isOpen, onClose }) => {

  /* ---------- ESTADO DEL CARRITO ---------- */

  // Obtenemos los productos y la función para eliminar productos
  const { items, removeFromCart } = useCart();

  /* ---------- CALCULO DEL SUBTOTAL ---------- */

  // Calculamos el subtotal del carrito
  // multiplicando precio por cantidad de cada producto
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  /* ---------- RENDER ---------- */

  return (
    <>
      {/* Drawer lateral */}
      <aside
        className={`
          ${style.drawer}
          ${isOpen ? style.open : ""}
        `}
      >

        {/* ---------------- HEADER ---------------- */}

        <div className={style.header}>
          <p>Carrito de compras</p>

          {/* Botón para cerrar el drawer */}
          <Button onClick={onClose}>
            X
          </Button>
        </div>

        {/* ---------------- CONTENIDO ---------------- */}

        <div className={style.content}>

          {/* Si el carrito está vacío mostramos mensaje */}
          {
            items.length === 0 &&
            <p>
              El carrito está vacío, te invitamos a seguir comprando
            </p>
          }

          {/* Listado de productos del carrito */}
          {
            items.map((item) => {

              // ⚠ ERROR: Falta el return
              // items.map(() => { ... })
              // debe devolver JSX

              <div key={item.id} className={style.item}>

                {/* Imagen del producto */}
                {/* ⚠ ERROR: atributo "all" debería ser "alt" */}
                <img
                  src={item.image}
                  all={item.title}
                />

                {/* Información del producto */}
                <div>

                  <p>
                    {/* Título del producto */}
                    {item.title}

                    {/* Cantidad */}
                    {item.quantity}

                    X

                    {/* Precio unitario */}
                    {item.price}
                  </p>

                  {/* Botón para eliminar producto */}
                  {/* ⚠ ERROR: removeFromCart no está siendo ejecutado */}
                  <Button onClick={() => removeFromCart}>
                    Eliminar producto
                  </Button>

                </div>

                {/* ---------------- FOOTER DEL ITEM ---------------- */}

                <div className={style.footer}>

                  {/* Subtotal del carrito */}
                  <p>
                    Subtotal: ${subtotal}
                  </p>

                  {/* Botón para finalizar compra */}
                  <Button>
                    Finalizar la compra
                  </Button>

                </div>

              </div>
            })
          }

        </div>

      </aside>
    </>
  );
};

export default CartDrawer;