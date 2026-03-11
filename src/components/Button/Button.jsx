// Importación de los estilos del componente.
// Se utiliza CSS Modules para evitar colisiones de clases globales.
import style from './Button.module.scss';

/**
 * Componente reutilizable de botón.
 *
 * Permite renderizar diferentes variantes visuales mediante la prop `variant`
 * y acepta cualquier propiedad nativa de un elemento <button> gracias al
 * operador rest (`...props`).
 *
 * @param {ReactNode} children - Contenido interno del botón (texto o elementos).
 * @param {string} variant - Variante visual del botón definida en el SCSS.
 * @param {object} props - Props adicionales del elemento button (onClick, type, disabled, etc.).
 */
const Button = ({ children, variant = 'primary', ...props }) => {

  // Construcción de las clases CSS del botón.
  // style.button -> clase base
  // style[variant] -> variante dinámica (primary, secondary, etc.)
  const buttonClassName = `
    ${style.button}
    ${style[variant]}
  `;

  return (
    <button
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
};

// Exportación del componente para su reutilización en la aplicación
export default Button;