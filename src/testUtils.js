// funciones de ayuda que usan las pruebas (no es parte de la app)
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// mock de localStorage: en vez de usar el del navegador los datos quedan en un objeto en memoria,
// asi cada prueba parte con los datos que nosotros le damos y no se mezcla con la tienda real
export function mockLocalStorage(initialData = {}) {
    const store = { ...initialData };

    spyOn(Storage.prototype, 'getItem').and.callFake(key => (key in store ? store[key] : null));
    spyOn(Storage.prototype, 'setItem').and.callFake((key, value) => {
        store[key] = String(value);
    });
    spyOn(Storage.prototype, 'removeItem').and.callFake(key => {
        delete store[key];
    });

    return store;
}

// renderiza un componente dentro del contexto de la app (carrito y sesion) y de un router de prueba
export function renderWithProviders(ui, route = '/') {
    return render(
        <AppProvider>
            <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </AppProvider>
    );
}
