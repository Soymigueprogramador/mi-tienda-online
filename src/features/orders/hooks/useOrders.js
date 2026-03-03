import { useState, useEffect, useMemo, useCallback } from "react";
import { getOrders, updateOrderStatus } from "../../../services/orderService/orderService";

const ITEMS_PER_PAGE = 5;

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError("No se pudieron cargar las órdenes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const cancelOrder = async (id) => {
    const updated = await updateOrderStatus(id, "cancelled");
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? updated : o))
    );
  };

  /* ---------------- FILTER + SEARCH ---------------- */

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.customer?.name?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, search, statusFilter]);

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

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
    refresh: fetchOrders,
  };
};