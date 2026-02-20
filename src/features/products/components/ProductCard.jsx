import style from "./ProductCard.module.scss";
import Button from "../../../components/Button/Button.jsx";

const ProductCard = ({ product }) => {
  const { image, title, description, price } = product;

  return (
    <article className={style.card}>
      {/* Imagen */}
      <img
        src={image}
        alt={title}
        className={style.image}
      />

      {/* Información */}
      <h3 className={style.title}>
        {title}
      </h3>

      <p className={style.description}>
        {description}
      </p>

      <p className={style.price}>
        ${price}
      </p>

      {/* Botones */}
      <Button variant="primary">Comprar ahora</Button>
      <Button variant="secondary">Agregar al carrito</Button>
    </article>
  );
};

export default ProductCard;