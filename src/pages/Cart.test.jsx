import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './Cart';
import { mockLocalStorage, renderWithProviders } from '../testUtils';

describe('Componente Cart', () => {
    it('muestra un mensaje cuando el carrito está vacío', () => {
        mockLocalStorage();
        renderWithProviders(<Cart />, '/carrito');

        expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
        expect(screen.queryByRole('table')).toBeNull();
    });

    it('calcula el total y lo actualiza al sumar o eliminar productos', async () => {
        mockLocalStorage({
            rb_cart: JSON.stringify([
                { id: 1, name: 'Café Etiopía', price: 12000, quantity: 2, imageUrl: '/img/cafe-etiopia.jpg' },
                { id: 5, name: 'Té Chai', price: 6900, quantity: 1, imageUrl: '/img/te-chai.jpg' }
            ])
        });
        renderWithProviders(<Cart />, '/carrito');

        // 12000 x 2 + 6900 = 30900
        expect(screen.getByText('Total: $30.900')).toBeTruthy();

        await userEvent.click(screen.getByRole('button', { name: 'Sumar Té Chai' }));
        expect(screen.getByText('Total: $37.800')).toBeTruthy();

        await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);
        expect(screen.getByText('Total: $13.800')).toBeTruthy();
        expect(screen.queryByText('Café Etiopía')).toBeNull();
    });
});
