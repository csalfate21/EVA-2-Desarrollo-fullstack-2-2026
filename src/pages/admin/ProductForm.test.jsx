import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import ProductForm from './ProductForm';
import { mockLocalStorage, renderWithProviders } from '../../testUtils';

describe('Componente ProductForm (admin)', () => {
    let store;

    beforeEach(() => {
        store = mockLocalStorage();
        renderWithProviders(
            <Routes>
                <Route path="/admin/productos/nuevo" element={<ProductForm />} />
                <Route path="/admin/productos" element={<h1>Lista de productos</h1>} />
            </Routes>,
            '/admin/productos/nuevo'
        );
    });

    it('no guarda el producto si faltan datos o el precio no es válido', async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Guardar' }));

        expect(screen.getByText('El nombre es obligatorio')).toBeTruthy();
        expect(screen.getByText('El precio debe ser mayor a 0')).toBeTruthy();
        expect(store.rb_products).toBeUndefined();
    });

    it('crea el producto, lo guarda en localStorage y vuelve a la lista', async () => {
        await userEvent.type(screen.getByLabelText('Nombre'), 'Café Brasil');
        await userEvent.selectOptions(screen.getByLabelText('Categoría'), 'Café');
        await userEvent.type(screen.getByLabelText('Precio'), '10000');
        await userEvent.type(screen.getByLabelText('Stock'), '12');
        await userEvent.type(screen.getByLabelText('Stock crítico'), '3');
        await userEvent.click(screen.getByRole('button', { name: 'Guardar' }));

        const products = JSON.parse(store.rb_products);
        expect(products.length).toBe(9);
        expect(products[8].name).toBe('Café Brasil');
        expect(products[8].price).toBe(10000);
        expect(screen.getByText('Lista de productos')).toBeTruthy();
    });
});
