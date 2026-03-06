import { useState } from "react";
import style from "./Contact.module.scss";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado (simulado)");
  };

  return (
    <section className={style.container}>
      <h1 className={style.header_text}>Formulario de contacto</h1>
      <p className={style.header_text}>
        Te invitamos a que te pongas en contacto con nosotros mediante este
        formulario. <br></br>
        Te responderemos lo antes posible.
        Desde ya muchas gracias!!
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Nombre </label>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email"> Email </label>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="message"> Mensaje </label>
        <textarea
          name="message"
          placeholder="Mensaje"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit">Enviar mensaje</button>
      </form>
    </section>
  );
};

export default Contact;