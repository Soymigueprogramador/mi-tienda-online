// Importa el componente Link para navegación declarativa entre rutas
// sin recargar la página (SPA navigation)
import { Link } from "react-router-dom";

// Hook personalizado que expone el estado global del carrito.
// Permite acceder a información como cantidad de productos,
// total del carrito, funciones para agregar/eliminar, etc.
import { useCart } from "../../features/cart/hooks/useCart";

// Importación de estilos utilizando CSS Modules.
// Esto evita colisiones de clases en el scope global.
import style from "./CartWidget.module.scss";


/**
 * CartWidget
 *
 * Componente de interfaz que muestra el ícono del carrito
 * junto con un badge que indica la cantidad total de productos
 * agregados al carrito.
 *
 * Este componente suele ubicarse en la Navbar o Header
 * para ofrecer acceso rápido al checkout.
 */
const CartWidget = () => {

  // Obtiene del contexto global del carrito la cantidad total de items.
  // El hook useCart centraliza el estado del carrito en toda la aplicación.
  const { totalItems } = useCart();

  return (

    // Link que navega hacia la página de checkout
    // cuando el usuario hace click en el carrito.
    <Link to="/checkout" className={style.cart}>

      {/* Ícono visual del carrito */}
      🛒

      {/*
        Badge condicional:
        Se renderiza únicamente cuando hay al menos un producto
        en el carrito (totalItems > 0).

        Esto evita mostrar un contador vacío cuando el carrito
        todavía no contiene productos.
      */}
      {totalItems > 0 && (

        // Elemento visual que muestra la cantidad total de productos
        <span className={style.badge}>
          {totalItems}
        </span>

      )}

    </Link>
  );
};

// Exportación del componente para su uso en la Navbar u otros layouts
export default CartWidget;