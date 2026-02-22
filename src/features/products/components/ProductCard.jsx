import { Link } from "react-router-dom";
import style from "./ProductCard.module.scss";
import Button from "../../../components/Button/Button.jsx";
import { useCart } from "../../../features/cart/hooks/useCart.js";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const { image, title, description, price } = product;

  return (
    <Link to={ `/product/${ product.id }` } className={ style.cardLink }>
      <article className={style.card}>
        {/* Imagen */}
        <img src={image} alt={title} className={style.image} />

        {/* Información */}
        <h3 className={style.title}>{title}</h3>

        <p className={style.description}>{description}</p>

        <p className={style.price}>${price}</p>

        {/* Botones */}
        <Button variant="primary">Comprar ahora</Button>
        <Button variant="secondary" onClick={() => addToCart(product)}>
          Agregar al carrito
        </Button>
      </article>
    </Link>
  );
};

export default ProductCard;
