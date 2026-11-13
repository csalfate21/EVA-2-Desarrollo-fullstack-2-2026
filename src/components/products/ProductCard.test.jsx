import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

describe('Componente ProductCard', () => {
    const product = {
        id: 1,
        name: 'Café Etiopía',
        category: 'Café',
        price: 12000,
        offerPrice: null,
        stock: 20,
        imageUrl: '/img/cafe-etiopia.jpg'
    };

    // la tarjeta tiene un Link, por eso va dentro de MemoryRouter
    function renderCard(prod, onAdd = () => {}) {
        return render(
            <MemoryRouter>
                <ProductCard product={prod} onAdd={onAdd} />
            </MemoryRouter>
        );
    }

    it('muestra el nombre, la categoría, el precio y la imagen que recibe por props', () => {
        renderCard(product);

        expect(screen.getByText('Café Etiopía')).toBeTruthy();
        expect(screen.getByText('Café')).toBeTruthy();
        expect(screen.getByText('$12.000')).toBeTruthy();
        expect(screen.getByRole('img').getAttribute('src')).toBe('/img/cafe-etiopia.jpg');
    });

    it('muestra la etiqueta Oferta y el precio rebajado solo si el producto tiene oferta', () => {
        const { unmount } = renderCard(product);
        expect(screen.queryByText('Oferta')).toBeNull();
        unmount();

        renderCard({ ...product, offerPrice: 9900 });
        expect(screen.getByText('Oferta')).toBeTruthy();
        expect(screen.getByText('$9.900')).toBeTruthy();
    });

    it('ejecuta la función onAdd al hacer clic en Agregar', async () => {
        const onAdd = jasmine.createSpy('onAdd');
        renderCard(product, onAdd);

        await userEvent.click(screen.getByRole('button', { name: /agregar café etiopía/i }));

        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    it('deshabilita el botón y muestra "Sin stock" cuando el stock es 0', () => {
        renderCard({ ...product, stock: 0 });

        const button = screen.getByRole('button', { name: /agregar café etiopía/i });
        expect(button.disabled).toBeTrue();
        expect(button.textContent).toBe('Sin stock');
    });
});
