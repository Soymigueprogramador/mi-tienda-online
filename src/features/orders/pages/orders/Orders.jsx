import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import style from "./orders.module.scss";
import OrderCard from "../../components/OrderCard/OrderCard.jsx";
import { useOrders } from "../../hooks/useOrders.js";
import EmptyState from "../../../../components/EmptyState/EmptyState.jsx";

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  /* ---------------- SCROLL + URL SYNC ---------------- */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setSearchParams({
      page: currentPage,
      status: statusFilter,
      search,
    });
  }, [currentPage, search, statusFilter, setSearchParams]);

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>{error}</p>;

  /* ---------------- EMPTY STATE (SIN ÓRDENES REALES) ---------------- */
  if (!filteredOrders.length && !search && statusFilter === "all") {
    return (
      <EmptyState
        icon="📦"
        title="No tenés órdenes todavía"
        message="Cuando compres algo aparecerá aquí."
        actionText="Ir a la tienda"
        onAction={() => (window.location.href = "/shop")}
      />
    );
  }

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

  const delta = 2;

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter(
    (page) => page >= currentPage - delta && page <= currentPage + delta
  );

  return (
    <section className={style.container}>
      <h1 className={style.title}>Mis compras</h1>

      {/* 🔎 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar por ID o nombre"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* 🎛 FILTRO */}
      <select
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="all">Todos</option>
        <option value="pending">Pendientes</option>
        <option value="cancelled">Canceladas</option>
      </select>

      {/* 📊 CONTADOR */}
      <p aria-live="polite">
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
        <nav className={style.pagination} aria-label="Paginación">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            «
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => {
                if (page !== currentPage) {
                  setCurrentPage(page);
                }
              }}
              className={currentPage === page ? style.active : ""}
              aria-label={`Página ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            »
          </button>
        </nav>
      )}

      {/* 🔎 EMPTY STATE (SIN RESULTADOS DE BÚSQUEDA) */}
      {!paginatedOrders.length && filteredOrders.length > 0 && (
        <EmptyState
          icon="🔎"
          title="No encontramos resultados"
          message="Probá cambiar los filtros o el texto de búsqueda."
        />
      )}
    </section>
  );
};

export default Orders;