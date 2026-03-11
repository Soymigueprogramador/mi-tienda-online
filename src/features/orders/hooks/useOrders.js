import { useState, useEffect, useMemo, useCallback } from "react";
import { getOrders, updateOrderStatus } from "../../../services/orderService/orderService";
import { useDebounce } from "use-debounce";

const ITEMS_PER_PAGE = 5;

export const useOrders = () => {

  /* ---------------- STATE ---------------- */

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- DEBOUNCE ---------------- */

  const [debouncedSearch] = useDebounce(search, 300);

  /* ---------------- FETCH ---------------- */

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError("No se pudieron cargar las órdenes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /* ---------------- RESET PAGE ON FILTER CHANGE ---------------- */

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  /* ---------------- UPDATE STATUS ---------------- */

  const cancelOrder = async (id) => {
    try {
      const updated = await updateOrderStatus(id, "cancelled");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      );
    } catch (err) {
      setError("No se pudo actualizar la orden");
      console.error(err);
    }
  };

  /* ---------------- FILTER + SEARCH ---------------- */

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          order.customer?.name?.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, debouncedSearch, statusFilter]);

  /* ---------------- PAGINATION ---------------- */

  const totalPages = useMemo(() => {
    return Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  }, [filteredOrders]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  return {
    loading,
    error,
    paginatedOrders,
    totalPages,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    cancelOrder,
    filteredOrders,
    refresh: fetchOrders,
  };
};