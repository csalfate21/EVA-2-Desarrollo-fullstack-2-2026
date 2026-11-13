import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCriticalProducts,
    updateCategory,
    deleteCategory,
    getUsers,
    getUserById,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    checkLogin,
    createOrder
} from './db';
import { mockLocalStorage } from '../testUtils';

describe('Base de datos simulada (db.js)', () => {
    let store;

    beforeEach(() => {
        // localStorage vacio: db.js carga los datos iniciales de roots.mock.js
        store = mockLocalStorage();
    });

    it('hace el CRUD completo de productos y lo guarda en localStorage', () => {
        expect(getProducts().length).toBe(8);

        const created = createProduct({ name: 'Café Brasil', category: 'Café', price: 10000, stock: 5, criticalStock: 2 });
        expect(created.id).toBe(9);
        expect(getProductById(9).name).toBe('Café Brasil');

        updateProduct(9, { price: 9500 });
        expect(getProductById(9).price).toBe(9500);

        deleteProduct(9);
        expect(getProductById(9)).toBeUndefined();
        expect(JSON.parse(store.rb_products).length).toBe(8);
    });

    it('lista como críticos los productos con stock menor o igual a su stock crítico', () => {
        const critical = getCriticalProducts();
        expect(critical.map(p => p.name)).toEqual(['Kit Pour Over']);
    });

    it('no elimina una categoría con productos y al renombrarla actualiza sus productos', () => {
        expect(deleteCategory(1)).toBeFalse();

        updateCategory(2, { name: 'Tés' });
        expect(getProductById(4).category).toBe('Tés');
    });

    it('crea, edita y elimina usuarios, y revisa el login', () => {
        const user = createUser({ name: 'Pedro', lastName: 'Soto', email: 'pedro@gmail.com', password: 'pedro123' });
        expect(user.role).toBe('cliente');
        expect(findUserByEmail('PEDRO@gmail.com').id).toBe(user.id);

        expect(checkLogin('pedro@gmail.com', 'pedro123').name).toBe('Pedro');
        expect(checkLogin('pedro@gmail.com', 'otraClave')).toBeNull();

        updateUser(user.id, { name: 'Pedro Pablo' });
        expect(getUserById(user.id).name).toBe('Pedro Pablo');

        deleteUser(user.id);
        expect(getUsers().length).toBe(2);
    });

    it('crea la orden pagada y descuenta stock, o la rechaza si pasa el límite', () => {
        const customer = { name: 'Ana', lastName: 'Rojas', email: 'ana@gmail.com' };

        const ok = createOrder(customer, [{ id: 1, name: 'Café Etiopía', price: 12000, quantity: 2 }], 24000);
        expect(ok.status).toBe('Pagada');
        expect(getProductById(1).stock).toBe(18);

        const rejected = createOrder(customer, [{ id: 7, name: 'Kit Pour Over', price: 18000, quantity: 6 }], 108000);
        expect(rejected.status).toBe('Rechazada');
        expect(getProductById(7).stock).toBe(3);
    });
});
