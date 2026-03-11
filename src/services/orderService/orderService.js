// src/services/orderService.js

const STORAGE_KEY = "orders";

/* Simula latencia de red (como si fuera HTTP real) */
const simulateDelay = (time = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

/* ---------------- GET ALL ORDERS ---------------- */
export const getOrders = async () => {
  await simulateDelay();

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/* ---------------- GET ORDER BY ID ---------------- */
export const getOrderById = async (id) => {
  await simulateDelay();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const orders = JSON.parse(stored);
  return orders.find((o) => String(o.id) === String(id)) || null;
};

/* ---------------- CREATE ORDER ---------------- */
export const createOrder = async (order) => {
  await simulateDelay();

  const stored = localStorage.getItem(STORAGE_KEY);
  const orders = stored ? JSON.parse(stored) : [];

  orders.push(order);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));

  return order;
};

/* ---------------- UPDATE STATUS ---------------- */
export const updateOrderStatus = async (id, status) => {
  await simulateDelay();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const orders = JSON.parse(stored);

  const updatedOrders = orders.map((o) =>
    String(o.id) === String(id)
      ? { ...o, status }
      : o
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));

  return updatedOrders.find((o) => String(o.id) === String(id));
};