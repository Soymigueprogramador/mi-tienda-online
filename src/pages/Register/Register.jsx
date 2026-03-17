import { useState } from "react";
import style from "./Register.module.scss";
import { registerUser } from "../../services/authApi/authApi.js";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      // ✅ mostrar mensaje del backend
      setMessage(res.message);

      // ✅ limpiar formulario
      setForm({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.error(error);
      setMessage("Error al registrarme");
    }
  };

  return (
    <div className={style.register}>
      <div className={style.register__container}>
        <h2>Registrarme</h2>

        <form onSubmit={handleSubmit} className={style.register__form}>

          <label>Nombre</label>
          <input
            type="text" // ✅ corregido
            name="name"
            placeholder="Ingresa tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrarme</button>
        </form>

        <p>
          ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
        </p>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;