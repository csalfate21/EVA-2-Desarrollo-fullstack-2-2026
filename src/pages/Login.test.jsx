import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { mockLocalStorage, renderWithProviders } from '../testUtils';

describe('Componente Login', () => {
    let store;

    beforeEach(() => {
        // usuario falso guardado en el localStorage simulado
        store = mockLocalStorage({
            rb_users: JSON.stringify([
                { id: 2, name: 'Ana', lastName: 'Rojas', email: 'ana@gmail.com', password: '123456', role: 'cliente' }
            ])
        });
        renderWithProviders(<Login />, '/login');
    });

    async function login(email, password) {
        await userEvent.type(screen.getByLabelText('Correo'), email);
        await userEvent.type(screen.getByLabelText('Contraseña'), password);
        await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    }

    it('muestra un error si la contraseña es incorrecta y no guarda la sesión', async () => {
        await login('ana@gmail.com', 'claveMala');

        expect(screen.getByText('Correo o contraseña incorrectos')).toBeTruthy();
        expect(store.rb_session).toBeUndefined();
    });

    it('con datos correctos guarda la sesión sin la contraseña', async () => {
        await login('ana@gmail.com', '123456');

        expect(screen.queryByText('Correo o contraseña incorrectos')).toBeNull();
        const session = JSON.parse(store.rb_session);
        expect(session.name).toBe('Ana');
        expect(session.password).toBeUndefined();
    });
});
