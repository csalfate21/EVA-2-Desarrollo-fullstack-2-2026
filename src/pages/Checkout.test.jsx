import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import { mockLocalStorage, renderWithProviders } from '../testUtils';

describe('Componente Checkout', () => {
    const cart = JSON.stringify([{ id: 1, name: 'Café Etiopía', price: 12000, quantity: 1, imageUrl: '/img/cafe-etiopia.jpg' }]);

    it('muestra los errores de los campos obligatorios al pagar sin completar datos', async () => {
        mockLocalStorage({ rb_cart: cart });
        renderWithProviders(<Checkout />, '/checkout');

        await userEvent.click(screen.getByRole('button', { name: /pagar ahora/i }));

        expect(screen.getByText('El nombre es obligatorio')).toBeTruthy();
        expect(screen.getByText('La calle es obligatoria')).toBeTruthy();
        expect(screen.getByLabelText('Nombre*').classList.contains('is-invalid')).toBeTrue();
        expect(screen.getByLabelText('Región*').classList.contains('is-invalid')).toBeTrue();
    });

    it('si el usuario inició sesión completa sus datos automáticamente', () => {
        mockLocalStorage({
            rb_cart: cart,
            rb_session: JSON.stringify({
                id: 2,
                name: 'Ana',
                lastName: 'Rojas',
                email: 'ana.rojas@gmail.com',
                role: 'cliente',
                region: 'Región Metropolitana',
                commune: 'Ñuñoa',
                address: 'Los Crisantemos 450'
            })
        });
        renderWithProviders(<Checkout />, '/checkout');

        expect(screen.getByLabelText('Nombre*').value).toBe('Ana');
        expect(screen.getByLabelText('Correo*').value).toBe('ana.rojas@gmail.com');
        expect(screen.getByLabelText('Calle*').value).toBe('Los Crisantemos 450');
        expect(screen.getByLabelText('Comuna*').value).toBe('Ñuñoa');
        expect(screen.getByText('Total a pagar: $12.000')).toBeTruthy();
    });

    it('con datos válidos crea la orden pagada, vacía el carrito y pasa a la compra exitosa', async () => {
        const store = mockLocalStorage({ rb_cart: cart });
        renderWithProviders(
            <Routes>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/compra/exitosa/:id" element={<h1>Compra exitosa</h1>} />
            </Routes>,
            '/checkout'
        );

        await userEvent.type(screen.getByLabelText('Nombre*'), 'Pedro');
        await userEvent.type(screen.getByLabelText('Apellidos*'), 'Soto');
        await userEvent.type(screen.getByLabelText('Correo*'), 'pedro@gmail.com');
        await userEvent.type(screen.getByLabelText('Calle*'), 'Los Aromos 123');
        await userEvent.selectOptions(screen.getByLabelText('Región*'), 'Región Metropolitana');
        await userEvent.selectOptions(screen.getByLabelText('Comuna*'), 'Ñuñoa');
        await userEvent.click(screen.getByRole('button', { name: /pagar ahora/i }));

        expect(screen.getByText('Compra exitosa')).toBeTruthy();
        const orders = JSON.parse(store.rb_orders);
        expect(orders[orders.length - 1].customer.name).toBe('Pedro');
        expect(orders[orders.length - 1].status).toBe('Pagada');
        expect(JSON.parse(store.rb_cart).length).toBe(0);
    });
});
