import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import { getProducts } from "../../features/products/services/productsApi";
import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  console.log(`Se agrego un producto al carrito`)

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const products = await getProducts(); // ← ejecutás la función
      const found = products.find((p) => p.id === Number(id));
      setProduct(found);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;

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
          <img src={product.image} alt={product.title} className={styles.image} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

          <span className={styles.price}>${product.price}</span>

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