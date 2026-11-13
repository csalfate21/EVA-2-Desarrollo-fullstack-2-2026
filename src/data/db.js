// src/data/db.js
// simula una base de datos usando localStorage
// cada "tabla" (productos, categorias, usuarios y ordenes) se guarda como un arreglo en formato JSON
import { PRODUCTS, CATEGORIES, USERS, ORDERS } from './roots.mock';

const KEYS = {
    products: 'rb_products',
    categories: 'rb_categories',
    users: 'rb_users',
    orders: 'rb_orders'
};

// si la compra supera este monto el pago se rechaza (simulacion del banco)
export const PAYMENT_LIMIT = 100000;

function read(key, initialData) {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
}

function save(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}

function nextId(list) {
    return list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1;
}

// ---------- productos ----------

export function getProducts() {
    return read(KEYS.products, PRODUCTS);
}

export function getProductById(id) {
    return getProducts().find(p => p.id === Number(id));
}

export function createProduct(product) {
    const products = getProducts();
    const newProduct = { ...product, id: nextId(products) };
    save(KEYS.products, [...products, newProduct]);
    return newProduct;
}

export function updateProduct(id, data) {
    const products = getProducts().map(p => (p.id === Number(id) ? { ...p, ...data, id: p.id } : p));
    save(KEYS.products, products);
}

export function deleteProduct(id) {
    save(KEYS.products, getProducts().filter(p => p.id !== Number(id)));
}

export function getCriticalProducts() {
    return getProducts().filter(p => p.stock <= p.criticalStock);
}

export function getOffers() {
    return getProducts().filter(p => p.offerPrice);
}

// ---------- categorias ----------

export function getCategories() {
    return read(KEYS.categories, CATEGORIES);
}

export function getCategoryById(id) {
    return getCategories().find(c => c.id === Number(id));
}

export function createCategory(category) {
    const categories = getCategories();
    const newCategory = { ...category, id: nextId(categories) };
    save(KEYS.categories, [...categories, newCategory]);
    return newCategory;
}

export function updateCategory(id, data) {
    const old = getCategoryById(id);
    save(KEYS.categories, getCategories().map(c => (c.id === Number(id) ? { ...c, ...data, id: c.id } : c)));

    // si cambia el nombre tambien se cambia en los productos de esa categoria
    if (old && data.name && data.name !== old.name) {
        save(KEYS.products, getProducts().map(p => (p.category === old.name ? { ...p, category: data.name } : p)));
    }
}

// no se puede borrar una categoria que todavia tiene productos
export function deleteCategory(id) {
    const category = getCategoryById(id);
    const hasProducts = getProducts().some(p => p.category === category.name);
    if (hasProducts) {
        return false;
    }
    save(KEYS.categories, getCategories().filter(c => c.id !== Number(id)));
    return true;
}

// ---------- usuarios ----------

export function getUsers() {
    return read(KEYS.users, USERS);
}

export function getUserById(id) {
    return getUsers().find(u => u.id === Number(id));
}

export function findUserByEmail(email) {
    return getUsers().find(u => u.email.toLowerCase() === email.trim().toLowerCase());
}

export function createUser(user) {
    const users = getUsers();
    const newUser = { role: 'cliente', ...user, id: nextId(users) };
    save(KEYS.users, [...users, newUser]);
    return newUser;
}

export function updateUser(id, data) {
    save(KEYS.users, getUsers().map(u => (u.id === Number(id) ? { ...u, ...data, id: u.id } : u)));
}

export function deleteUser(id) {
    save(KEYS.users, getUsers().filter(u => u.id !== Number(id)));
}

// devuelve el usuario si el correo y la clave coinciden
export function checkLogin(email, password) {
    const user = findUserByEmail(email);
    return user && user.password === password ? user : null;
}

// ---------- ordenes ----------

export function getOrders() {
    return read(KEYS.orders, ORDERS);
}

export function getOrderById(id) {
    return getOrders().find(o => o.id === Number(id));
}

export function getOrdersByEmail(email) {
    return getOrders().filter(o => o.customer.email.toLowerCase() === email.toLowerCase());
}

// crea la orden y simula el pago
export function createOrder(customer, items, total) {
    const orders = getOrders();
    const id = nextId(orders);
    const approved = total <= PAYMENT_LIMIT;

    const order = {
        id: id,
        number: 1000 + id,
        date: new Date().toLocaleDateString('es-CL'),
        customer: customer,
        items: items,
        total: total,
        status: approved ? 'Pagada' : 'Rechazada'
    };
    save(KEYS.orders, [...orders, order]);

    // si el pago sale bien se descuenta el stock de cada producto
    if (approved) {
        items.forEach(item => {
            const product = getProductById(item.id);
            if (product) {
                updateProduct(product.id, { stock: Math.max(product.stock - item.quantity, 0) });
            }
        });
    }
    return order;
}
