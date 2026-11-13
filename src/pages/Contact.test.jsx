import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

describe('Componente Contact', () => {
    it('el componente Contact se monta correctamente', () => {
        render(<Contact />);

        expect(screen.getByRole('heading', { name: /contacto/i })).toBeTruthy();
        expect(screen.getByLabelText(/nombre/i)).toBeTruthy();
        expect(screen.getByLabelText(/correo/i)).toBeTruthy();
        expect(screen.getByLabelText(/mensaje/i)).toBeTruthy();
        expect(screen.getByRole('button', { name: /enviar/i })).toBeTruthy();
    });

    it('muestra los errores solo cuando el formulario se envía vacío', async () => {
        render(<Contact />);
        expect(screen.queryByRole('alert')).toBeNull();

        await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

        expect(screen.getByText('El nombre es obligatorio')).toBeTruthy();
        expect(screen.getByText('El correo es obligatorio')).toBeTruthy();
        expect(screen.getByText('El mensaje es obligatorio')).toBeTruthy();
        expect(screen.queryByText(/mensaje enviado/i)).toBeNull();
    });

    it('el contador del mensaje cambia mientras el usuario escribe', async () => {
        render(<Contact />);
        expect(screen.getByText('0/500 caracteres')).toBeTruthy();

        await userEvent.type(screen.getByLabelText(/mensaje/i), 'Hola');

        expect(screen.getByLabelText(/mensaje/i).value).toBe('Hola');
        expect(screen.getByText('4/500 caracteres')).toBeTruthy();
    });

    it('rechaza correos de otros dominios y con datos válidos muestra el mensaje de éxito', async () => {
        render(<Contact />);

        await userEvent.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
        await userEvent.type(screen.getByLabelText(/correo/i), 'juan@hotmail.com');
        await userEvent.type(screen.getByLabelText(/mensaje/i), '¿Hacen envíos a regiones?');
        await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
        expect(screen.getByText(/el correo debe terminar en/i)).toBeTruthy();

        await userEvent.clear(screen.getByLabelText(/correo/i));
        await userEvent.type(screen.getByLabelText(/correo/i), 'juan@duoc.cl');
        await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

        expect(screen.getByText(/mensaje enviado/i)).toBeTruthy();
        expect(screen.getByLabelText(/nombre/i).value).toBe('');
    });
});
