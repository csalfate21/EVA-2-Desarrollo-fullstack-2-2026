import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from './Products';
import { mockLocalStorage, renderWithProviders } from '../testUtils';

describe('Componente Products', () => {
    let store;

    beforeEach(() => {
        // localStorage simulado: se cargan los 8 productos de roots.mock.js
        store = mockLocalStorage();
        renderWithProviders(<Products />);
    });

    it('se monta correctamente y muestra el título', () => {
        expect(screen.getByRole('heading', { name: /catálogo de productos/i })).toBeTruthy();
    });

    it('renderiza todas las tarjetas de producto, cada una con su botón Agregar', () => {
        expect(screen.getAllByRole('img').length).toBe(8);
        expect(screen.getAllByRole('button', { name: /agregar .* al carrito/i }).length).toBe(8);
    });

    it('filtra por categoría y por el texto del buscador', async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Té' }));
        expect(screen.getAllByRole('img').length).toBe(2);

        await userEvent.click(screen.getByRole('button', { name: /todos/i }));
        await userEvent.type(screen.getByLabelText('Buscar producto'), 'café');
        expect(screen.getAllByRole('img').length).toBe(3);
        expect(screen.queryByText('Termo')).toBeNull();
    });

    it('al hacer clic en Agregar el producto queda guardado en el carrito', async () => {
        await userEvent.click(screen.getByRole('button', { name: /agregar termo al carrito/i }));

        const cart = JSON.parse(store.rb_cart);
        expect(cart.length).toBe(1);
        expect(cart[0].name).toBe('Termo');
        expect(cart[0].price).toBe(7500);
    });
});
