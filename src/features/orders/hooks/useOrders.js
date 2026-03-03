import { useState, useEffect, useCallback } from "react";
import {
  getOrders,
  updateOrderStatus,
} from "../../../services/orderService/orderService.js";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
      setError("No se pudieron cargar las órdenes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const cancelOrder = async (id) => {
    try {
      const updated = await updateOrderStatus(id, "cancelled");

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      );
    } catch (err) {
      console.error("Error cancelling order", err);
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    refresh: fetchOrders,
    cancelOrder,
  };
};