import style from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={style.hero}>

      <h1>
        Descubrí nuestros productos y comprá fácil.
      </h1>

      <Link to="/shop" className={style.button}>
        Ir a la tienda
      </Link>

    </section>
  );
};

export default Home;