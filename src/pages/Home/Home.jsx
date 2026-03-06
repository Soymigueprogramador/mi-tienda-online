import style from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* HERO */}
      <section className={style.hero}>

        <div className={style.content}>
          <h1>
            Descubrí nuestros productos y comprá fácil
          </h1>

          <p>
            Miles de productos con envío rápido y seguro.
          </p>

          <Link to="/shop" className={style.button}>
            Ir a la tienda
          </Link>
        </div>

        <div className={style.image}>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
            alt="Productos online"
          />
        </div>

      </section>

      {/* FEATURES */}
      <section className={style.features}>

        <div>
          🚚 Envíos rápidos
        </div>

        <div>
          💳 Pagos seguros
        </div>

        <div>
          ⭐ Productos de calidad
        </div>

      </section>
    </>
  );
};

export default Home;