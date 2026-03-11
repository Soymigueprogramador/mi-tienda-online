// Importación de estilos utilizando CSS Modules.
// Permite encapsular las clases para evitar conflictos globales.
import style from './EmptyState.module.scss';

/**
 * EmptyState
 *
 * Componente reutilizable utilizado para mostrar estados vacíos
 * dentro de la interfaz (por ejemplo: carrito vacío, órdenes vacías,
 * resultados de búsqueda sin coincidencias, etc.).
 *
 * Props:
 * - icon: elemento visual (emoji o ícono)
 * - title: título principal del estado vacío
 * - message: descripción o mensaje contextual
 * - actionText: texto del botón de acción (opcional)
 * - onAction: función ejecutada al hacer click en el botón (opcional)
 */
const EmptyState = ({
  icon,
  title,
  message,
  actionText,
  onAction,
}) => {

  return (

    // Contenedor principal del estado vacío
    <div className={style.empty}>

      {/* Contenedor del ícono representativo */}
      <div className={style.icon}>
        {icon}
      </div>

      {/* Título principal que describe el estado */}
      <h2>
        {title}
      </h2>

      {/* Mensaje descriptivo que explica la situación */}
      <p>
        {message}
      </p>

      {/*
        Botón de acción opcional.
        Solo se renderiza si la prop actionText existe.
        Generalmente se utiliza para redirigir al usuario
        a realizar una acción (ej: "Ir a la tienda").
      */}
      {actionText && (
        <button onClick={onAction}>
          {actionText}
        </button>
      )}

    </div>
  );
};

// Exportación del componente para su reutilización en diferentes páginas
export default EmptyState;