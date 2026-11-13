import { createContext, useContext, useEffect, useState } from 'react';
import { checkLogin } from '../data/db';
import { calcTotal, getFinalPrice } from '../utils/helpers';

// contexto global de la app: carrito de compras y sesion del usuario
const AppContext = createContext(null);

function loadFromStorage(key, initialValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initialValue;
}

export function AppProvider({ children }) {
    const [cart, setCart] = useState(() => loadFromStorage('rb_cart', []));
    const [user, setUser] = useState(() => loadFromStorage('rb_session', null));

    // cada vez que cambia el carrito se guarda en localStorage
    useEffect(() => {
        localStorage.setItem('rb_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
            }
            const newItem = {
                id: product.id,
                name: product.name,
                price: getFinalPrice(product),
                imageUrl: product.imageUrl,
                quantity: quantity
            };
            return [...prev, newItem];
        });
    };

    const changeQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity: quantity } : item)));
    };

    const removeFromCart = id => setCart(prev => prev.filter(item => item.id !== id));

    const clearCart = () => setCart([]);

    // guardamos la sesion sin la contraseña
    const saveSession = data => {
        const { password, ...session } = data;
        setUser(session);
        localStorage.setItem('rb_session', JSON.stringify(session));
    };

    const login = (email, password) => {
        const found = checkLogin(email, password);
        if (found) {
            saveSession(found);
        }
        return found;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('rb_session');
    };

    const value = {
        cart,
        cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        cartTotal: calcTotal(cart),
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        user,
        login,
        logout,
        saveSession
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useCart() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useCart debe usarse dentro de AppProvider');
    return ctx;
}

export function useAuth() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AppProvider');
    return ctx;
}
