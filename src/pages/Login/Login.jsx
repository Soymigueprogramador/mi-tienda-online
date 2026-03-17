import { useState } from "react";
import { loginUser } from "../../services/authApi/authApi.js";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";
import style from "./Login.module.scss";

const Login = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      login(data);
    } catch (error) {
      setError(" Usuario o contraseña incorrecto ");
    }
  };

  return (
    <>
      <div className={style.login}>
        <div className={style.login__container}>
          <h2>Inicio de sesion</h2>

          <form onSubmit={handleSubmit} className={style.login__form}>
            <label> Email </label>
            <input
              type="email"
              name="email"
              placeholder="Correo electronico"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label> Contraseña </label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <p className={style.login__error}> {error} </p>}

            <button type="submit">Iniciar sesion</button>
          </form>

          <p>
            ¿No tenes cuenta? <a href="/register"> Registrate </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;