import { useState } from 'react';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AppContext';
import { getUserById, updateUser } from '../../data/db';

// perfil del administrador que inicio sesion
function Profile() {
    const { user, saveSession } = useAuth();
    const [form, setForm] = useState({ name: user.name, lastName: user.lastName, address: user.address || '', password: '' });
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!form.name.trim() || !form.lastName.trim()) {
            setError('El nombre y los apellidos son obligatorios');
            setMsg('');
            return;
        }
        if (form.password && form.password.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres');
            setMsg('');
            return;
        }

        const { password, ...data } = form;
        updateUser(user.id, password ? { ...data, password } : data);
        // se actualiza la sesion para que el nombre nuevo se vea altiro
        saveSession(getUserById(user.id));
        setForm({ ...form, password: '' });
        setError('');
        setMsg('Datos actualizados correctamente');
    };

    return (
        <Card className="shadow-sm" style={{ maxWidth: '720px' }}>
            <Card.Body>
                <h2 className="h4">Perfil</h2>
                <p className="text-muted small mb-3">
                    {user.email} · {user.role}
                </p>

                {msg && <Alert variant="success">{msg}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form noValidate onSubmit={onSubmit}>
                    <Row className="g-3">
                        <Form.Group as={Col} md={6} controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={onChange} />
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="lastName">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control name="lastName" value={form.lastName} onChange={onChange} />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} controlId="address">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control name="address" value={form.address} onChange={onChange} />
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="password">
                            <Form.Label>Nueva contraseña (opcional)</Form.Label>
                            <Form.Control type="password" name="password" value={form.password} onChange={onChange} />
                        </Form.Group>
                    </Row>
                    <Button type="submit" variant="verde" className="mt-3">
                        Guardar cambios
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Profile;
