import { useNavigate } from "react-router-dom";
import style from "./orders.module.scss";
import OrderCard from "../../components/OrderCard/OrderCard.jsx";
import { useOrders } from "../../hooks/useOrders.js";

const Orders = () => {
  const navigate = useNavigate();

  const {
    paginatedOrders,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  } = useOrders();

  if (loading) return <p>Cargando órdenes...</p>;

  if (error) return <p>{error}</p>;

  return (
    <section className={style.container}>
      <h1 className={style.title}>Mis compras</h1>

      {/* 🔎 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar por ID o nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎛 FILTRO */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="pending">Pendientes</option>
        <option value="cancelled">Canceladas</option>
      </select>

      {/* 📦 LISTADO */}
      <div className={style.list}>
        {paginatedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* 📄 PAGINACIÓN */}
      {totalPages > 1 && (
        <div className={style.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {!paginatedOrders.length && (
        <p>No hay órdenes que coincidan con los filtros.</p>
      )}
    </section>
  );
};

export default Orders;