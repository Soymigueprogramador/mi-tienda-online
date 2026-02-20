import ProductGrid from "../../features/products/ProductGrid/ProductGrid.jsx";
import useCart from '../../features/cart/hooks/useCart.js';

const Shop = () => {
  const { items } = useCart();

  return (
    <main>
      <h1>Tienda</h1>

      <ProductGrid />

      <p>
        Producto cargado en el carrito:
        {
          items.length
        }
      </p>
    </main>
  );
};

export default Shop;