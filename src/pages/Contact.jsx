import { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { isValidEmail } from '../utils/helpers';

const MAX_MESSAGE = 500;

// mismo formulario de contacto de la EP1, ahora en React
function Contact() {
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = (data.get('name') || '').trim();
        const email = (data.get('email') || '').trim();

        const errs = [];
        if (!name) errs.push('El nombre es obligatorio');
        if (!email) {
            errs.push('El correo es obligatorio');
        } else if (!isValidEmail(email)) {
            errs.push('El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com');
        }
        if (!message.trim()) errs.push('El mensaje es obligatorio');

        setErrors(errs);
        if (errs.length === 0) {
            setMsg('¡Mensaje enviado! Te responderemos pronto.');
            e.currentTarget.reset();
            setMessage('');
        } else {
            setMsg('');
        }
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
                <h2>Contacto</h2>
                <p className="text-muted">Si tienes alguna duda o comentario déjanos tu mensaje.</p>

                {msg && <Alert variant="success">{msg}</Alert>}
                {errors.length > 0 && (
                    <Alert variant="danger">
                        <ul className="mb-0">
                            {errors.map(err => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    </Alert>
                )}

                <Form onSubmit={onSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="name" maxLength={100} placeholder="Ej: Juan Pérez" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" name="email" maxLength={100} placeholder="ejemplo@duoc.cl" />
                        <Form.Text>Solo se aceptan correos @duoc.cl, @profesor.duoc.cl y @gmail.com</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="reason">
                        <Form.Label>Motivo</Form.Label>
                        <Form.Select name="reason">
                            <option value="consulta">Consulta</option>
                            <option value="pedido">Pedido</option>
                            <option value="reclamo">Reclamo</option>
                            <option value="otro">Otro</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="message">
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="message"
                            maxLength={MAX_MESSAGE}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Form.Text>
                            {message.length}/{MAX_MESSAGE} caracteres
                        </Form.Text>
                    </Form.Group>

                    <Button type="submit" variant="verde">
                        Enviar
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

export default Contact;
