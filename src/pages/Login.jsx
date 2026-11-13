import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AppContext';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        if (!email.trim() || !password) {
            setError('Ingresa tu correo y tu contraseña');
            return;
        }

        const user = login(email, password);
        if (!user) {
            setError('Correo o contraseña incorrectos');
            return;
        }

        setError('');
        // el administrador entra directo a su panel
        navigate(user.role === 'admin' ? '/admin' : '/');
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} sm={10} md={6} lg={5}>
                <Card className="shadow-sm">
                    <Card.Body className="p-4">
                        <h2 className="text-center mb-3">Iniciar sesión</h2>

                        {/* el mensaje de error solo aparece cuando hay un error */}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form noValidate onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button type="submit" variant="verde" className="w-100">
                                Ingresar
                            </Button>
                        </Form>

                        <p className="text-center small mt-3 mb-0">
                            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                        </p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;
