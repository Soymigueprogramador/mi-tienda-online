import { useEffect } from "react";
import style from "./orders.module.scss";
import OrderCard from "../../components/OrderCard/OrderCard.jsx";
import { useOrders } from "../../hooks/useOrders.js";

const Orders = () => {

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
    filteredOrders,
  } = useOrders();

  /* ---------------- SCROLL ON PAGE CHANGE ---------------- */

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>{error}</p>;

  /* ---------------- PAGINATION HANDLERS ---------------- */

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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

      <p>
        Mostrando {paginatedOrders.length} de {filteredOrders.length} órdenes
      </p>

      {/* 📦 LISTADO */}
      <div className={style.list}>
        {paginatedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* 📄 PAGINACIÓN */}
      {totalPages > 1 && (
        <div className={style.pagination}>
          {/* Botón anterior */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            «
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              const delta = 2;
              return (
                page >= currentPage - delta &&
                page <= currentPage + delta
              );
            })
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? style.active : ""}
              >
                {page}
              </button>
            ))}

          {/* Botón siguiente */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}

      {!paginatedOrders.length && (
        <p>No hay órdenes que coincidan con los filtros.</p>
      )}
    </section>
  );
};

export default Orders;