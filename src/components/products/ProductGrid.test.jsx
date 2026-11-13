import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductGrid from './ProductGrid';

describe('Componente ProductGrid', () => {
    const items = [
        { id: 1, name: 'Café Etiopía', category: 'Café', price: 12000, stock: 20, imageUrl: '/img/cafe-etiopia.jpg' },
        { id: 4, name: 'Té Sencha', category: 'Té', price: 8000, stock: 18, imageUrl: '/img/te-sencha.jpg' },
        { id: 8, name: 'Termo', category: 'Accesorios', price: 9000, offerPrice: 7500, stock: 25, imageUrl: '/img/termo.jpg' }
    ];

    it('renderiza una tarjeta por cada producto y le pasa el producto correcto a onAdd', async () => {
        const onAdd = jasmine.createSpy('onAdd');
        render(
            <MemoryRouter>
                <ProductGrid items={items} onAdd={onAdd} />
            </MemoryRouter>
        );

        const buttons = screen.getAllByRole('button', { name: /agregar/i });
        expect(buttons.length).toBe(3);

        await userEvent.click(screen.getByRole('button', { name: /agregar té sencha/i }));
        expect(onAdd).toHaveBeenCalledWith(items[1]);
    });

    it('muestra un mensaje cuando no hay productos', () => {
        render(
            <MemoryRouter>
                <ProductGrid items={[]} onAdd={() => {}} />
            </MemoryRouter>
        );

        expect(screen.getByText('No se encontraron productos.')).toBeTruthy();
    });
});
