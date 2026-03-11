import style from "./ProductGrid.module.scss";
import ProductCard from "../components/ProductCard.jsx";
import useProducts from "../hooks/useProducts.jsx";

const ProductGrid = () => {
  const { products, loading } = useProducts();

  if (loading) return <p> Cargando productos... </p>;

  return (
    <>
      <h1 className={style.header_text}>
        Nuestros productos
      </h1>

      <p className={style.header_text}>
        Esperamos que aqui puedas encontrar ese producto que estas buscando
      </p>

      <section className={style.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};

export default ProductGrid;
