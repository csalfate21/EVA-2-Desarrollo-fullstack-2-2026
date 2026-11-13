// funciones de ayuda que usan las pruebas (no es parte de la app)
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';


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


export function renderWithProviders(ui, route = '/') {
    return render(
        <AppProvider>
            <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </AppProvider>
    );
}
