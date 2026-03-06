// Importación del componente Link de React Router.
// Actualmente no se utiliza en este componente, por lo que podría eliminarse
// para evitar imports innecesarios.
import { Link } from "react-router-dom";

// Importación de estilos utilizando CSS Modules.
// Permite que las clases estén encapsuladas y no colisionen con estilos globales.
import style from "./Footer.module.scss";


/**
 * Footer
 *
 * Componente que representa el pie de página de la aplicación.
 * Generalmente contiene información de copyright,
 * enlaces a redes sociales y créditos del proyecto.
 */
const Footer = () => {
  return (

    // Contenedor principal del footer
    <footer className={style.footer}>

      {/* Texto de copyright del sitio */}
      <p>
        © 2026 Tienda online
      </p>


      {/*
        Sección de enlaces a redes sociales.
        Los enlaces utilizan <a> en lugar de <Link> porque
        redirigen a páginas externas.
      */}
      <div className={style.links}>

        {/* Título de la sección */}
        <p>
          Seguinos en:
        </p>

        {/* Enlace a Instagram */}
        <a
          href="https://instagram.com/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
        >
          📸 Instagram
        </a>

        {/* Enlace a Facebook */}
        <a
          href="https://facebook.com/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
        >
          👍 Facebook
        </a>

        {/* Enlace a la red social X (antes Twitter) */}
        <a
          href="https://youtube.com/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶ X
        </a>

      </div>


      {/* Crédito tecnológico del proyecto */}
      <p className={style.made}>
        Desarrollado con React
      </p>

    </footer>
  );
};

// Exportación del componente para ser utilizado en el layout principal
export default Footer;