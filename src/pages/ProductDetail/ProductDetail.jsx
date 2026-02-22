import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/context/CartContext";
import { getProducts } from "../../features/products/services/productsApi";
import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = getProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate("/shop")}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

          <p className={styles.description}>
            {product.description}
          </p>

          <span className={styles.price}>
            ${product.price}
          </span>

          <button
            className={styles.addButton}
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>

          <button
            className={styles.backButton}
            onClick={() => navigate("/shop")}
          >
            ← Seguir comprando
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;