const STORAGE_KEY = "orders";

export const getOrders = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  const updated = [...orders, order];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearOrders = () => {
  localStorage.removeItem(STORAGE_KEY);
};