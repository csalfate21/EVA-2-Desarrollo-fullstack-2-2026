import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters from './Filters';

describe('Componente Filters', () => {
    const options = ['Café', 'Té', 'Accesorios'];

    it('muestra un botón por categoría, el total y marca el filtro activo', () => {
        render(<Filters current="Té" onChange={() => {}} options={options} total={8} />);

        expect(screen.getAllByRole('button').length).toBe(4);
        expect(screen.getByText('8')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Té' }).classList.contains('btn-success')).toBeTrue();
        expect(screen.getByRole('button', { name: 'Café' }).classList.contains('btn-outline-success')).toBeTrue();
    });

    it('llama a onChange con la categoría al hacer clic en su botón', async () => {
        const onChange = jasmine.createSpy('onChange');
        render(<Filters current="all" onChange={onChange} options={options} total={8} />);

        await userEvent.click(screen.getByRole('button', { name: 'Accesorios' }));
        expect(onChange).toHaveBeenCalledWith('Accesorios');

        await userEvent.click(screen.getByRole('button', { name: /todos/i }));
        expect(onChange).toHaveBeenCalledWith('all');
    });
});
