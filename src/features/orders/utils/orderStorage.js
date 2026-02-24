// Clave única de almacenamiento.
const STORAGE_KEY = 'orders';

// Obtener todas las órdenes
export const getOrders = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error al obtener las orders:', error);
        return [];
    }
};

// Guardar una nueva orden
export const saveOrder = ({ id, items, total }) => {
    try {
        const existingOrders = getOrders();
        const newOrder = {
            id,
            items,
            total,
            createdAt: new Date().toISOString(),
        };

        const updatedOrders = [newOrder, ...existingOrders];

        // CORRECCIÓN: Se usa setItem para guardar
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));

        return newOrder;
    } catch (error) {
        console.error('Error al guardar la nueva order:', error);
        return null; // Devolvemos null para manejar el error en la UI
    }
};

// Borrar todas las órdenes
export const clearOrders = () => {
    try {
        // CORRECCIÓN: El método es removeItem (singular)
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error al eliminar las orders:', error);
    }
};