import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate();

    return (
    <>
        <section className={
            {
                padding: "40px",
                textAlign: "center",
            }
        }>
            <h1>
                Error 404
            </h1>

            <p>
                Pagina no encontrada
            </p>

            <button
                onClick={() => navigate("/")}
            >
                Volver a la pagina de inicio
            </button>
        </section>
    </>
  )
}

export default NotFound
