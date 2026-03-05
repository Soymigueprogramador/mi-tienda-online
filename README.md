# 🛒 Mi Tienda Online

Aplicación de e-commerce desarrollada con **React + Vite** que simula una tienda online completa con carrito de compras, checkout, historial de órdenes, búsqueda, filtros y paginación.

🔗 **Demo en producción**
https://mi-online.netlify.app/

---

# 📦 Funcionalidades

### 🛍 Catálogo de productos

* Listado de productos
* Visualización de imagen, precio y descripción
* Agregar productos al carrito

### 🛒 Carrito de compras

* Agregar productos
* Incrementar / decrementar cantidad
* Eliminar productos
* Vaciar carrito
* Persistencia del carrito

### 💳 Checkout

* Formulario de compra
* Validación de campos
* Generación de orden
* Simulación de API para crear órdenes
* Redirección a página de compra exitosa

### 📦 Historial de órdenes

* Visualización de órdenes realizadas
* Ordenadas por fecha
* Detalle de cada compra

### 🔎 Búsqueda y filtros

* Buscar órdenes por ID o producto
* Filtrar por estado de orden
* Sincronización con la URL

### 📄 Paginación

* Navegación entre páginas de órdenes
* Paginación dinámica
* Indicador de página actual
* Scroll automático al cambiar página

### 🧭 Estados UX

* Carrito vacío
* Sin órdenes
* Sin resultados de búsqueda

---

# ♿ Accesibilidad

Se aplicaron buenas prácticas de accesibilidad:

* `aria-label` en botones interactivos
* `aria-current` en paginación
* `aria-live` para actualización dinámica de resultados
* `alt` en imágenes
* `label` asociado a inputs

---

# 🧠 Arquitectura del proyecto

El proyecto sigue una estructura modular basada en **features** para facilitar escalabilidad.

```
src
 ┣ components
 ┃ ┗ componentes reutilizables
 ┣ features
 ┃ ┣ cart
 ┃ ┗ orders
 ┣ hooks
 ┃ ┗ hooks personalizados
 ┣ services
 ┃ ┗ simulación de API
 ┣ pages
 ┃ ┗ páginas principales
 ┣ layouts
 ┃ ┗ layout principal de la aplicación
```

---

# ⚙️ Tecnologías utilizadas

* **React**
* **React Router**
* **Context API**
* **Custom Hooks**
* **SCSS Modules**
* **Vite**
* **LocalStorage**
* **Fake API Service**

---

# 🚀 Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/Soymigueprogramador/mi-tienda-online.git
```

Entrar al proyecto:

```bash
cd tu-repo
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

---

# 🏗 Build para producción

```bash
npm run build
```

Esto generará la carpeta:

```
dist
```

Lista para deploy.

---

# 🌐 Deploy

El proyecto está desplegado en **Netlify**.

Build command:

```
npm run build
```

Publish directory:

```
dist
```

---

# 📚 Conceptos aplicados

* Componentización
* Custom Hooks
* Manejo global de estado con Context
* Persistencia de datos
* Simulación de API
* Manejo de formularios
* Accesibilidad web
* Arquitectura escalable
* UX states

---

# 👨‍💻 Autor

Desarrollado por **Miguel Salazar**

Proyecto creado como práctica avanzada de **Frontend con React**.