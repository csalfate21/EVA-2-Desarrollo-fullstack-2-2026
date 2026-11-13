import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartTable from './CartTable';

describe('Componente CartTable', () => {
    const items = [
        { id: 1, name: 'Café Etiopía', price: 12000, quantity: 2, imageUrl: '/img/cafe-etiopia.jpg' },
        { id: 5, name: 'Té Chai', price: 6900, quantity: 1, imageUrl: '/img/te-chai.jpg' }
    ];

    it('sin funciones por props solo muestra los productos, sin botones', () => {
        render(<CartTable items={items} />);

        expect(screen.getByText('Café Etiopía')).toBeTruthy();
        expect(screen.getByText('$24.000')).toBeTruthy();
        expect(screen.queryAllByRole('button').length).toBe(0);
    });

    it('con onChangeQuantity y onRemove permite sumar, restar y eliminar', async () => {
        const onChangeQuantity = jasmine.createSpy('onChangeQuantity');
        const onRemove = jasmine.createSpy('onRemove');
        render(<CartTable items={items} onChangeQuantity={onChangeQuantity} onRemove={onRemove} />);

        await userEvent.click(screen.getByRole('button', { name: 'Sumar Café Etiopía' }));
        expect(onChangeQuantity).toHaveBeenCalledWith(1, 3);

        await userEvent.click(screen.getByRole('button', { name: 'Restar Café Etiopía' }));
        expect(onChangeQuantity).toHaveBeenCalledWith(1, 1);

        await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[1]);
        expect(onRemove).toHaveBeenCalledWith(5);
    });
});
