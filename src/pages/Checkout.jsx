import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Badge, Alert } from 'react-bootstrap';
import CartTable from '../components/cart/CartTable';
import { useCart, useAuth } from '../context/AppContext';
import { createOrder } from '../data/db';
import { REGIONS } from '../data/roots.mock';
import { formatPrice, isValidEmail } from '../utils/helpers';

function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // si el usuario inicio sesion sus datos se completan solos
    const [form, setForm] = useState({
        name: user?.name || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        street: user?.address || '',
        apartment: '',
        region: user?.region || '',
        commune: user?.commune || '',
        notes: ''
    });
    const [errors, setErrors] = useState({});

    if (cart.length === 0) {
        return (
            <div className="text-center">
                <h2>Checkout</h2>
                <Alert variant="light">No tienes productos en el carrito.</Alert>
                <Link to="/productos">Ir a productos</Link>
            </div>
        );
    }

    const onChange = e => {
        const { name, value } = e.target;
        // si cambia la region se borra la comuna que estaba elegida
        if (name === 'region') {
            setForm({ ...form, region: value, commune: '' });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'El nombre es obligatorio';
        if (!form.lastName.trim()) errs.lastName = 'Los apellidos son obligatorios';
        if (!isValidEmail(form.email)) errs.email = 'Ingresa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com';
        if (!form.street.trim()) errs.street = 'La calle es obligatoria';
        if (!form.region) errs.region = 'Selecciona una región';
        if (!form.commune) errs.commune = 'Selecciona una comuna';
        return errs;
    };

    const onSubmit = e => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const order = createOrder(form, cart, cartTotal);
        if (order.status === 'Pagada') {
            clearCart();
            navigate(`/compra/exitosa/${order.id}`);
        } else {
            navigate(`/compra/error/${order.id}`);
        }
    };

    return (
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '900px' }}>
            <Card.Body>
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                    <div>
                        <h2 className="h4 mb-0">Carrito de compra</h2>
                        <small className="text-muted">Completa la siguiente información</small>
                    </div>
                    <Badge bg="success" className="fs-6 p-2">
                        Total a pagar: {formatPrice(cartTotal)}
                    </Badge>
                </div>

                <CartTable items={cart} />

                <Form noValidate onSubmit={onSubmit} className="mt-4">
                    <h5>Información del cliente</h5>
                    <Row className="g-3 mb-4">
                        <Form.Group as={Col} md={6} controlId="name">
                            <Form.Label>Nombre*</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={onChange} isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="lastName">
                            <Form.Label>Apellidos*</Form.Label>
                            <Form.Control name="lastName" value={form.lastName} onChange={onChange} isInvalid={!!errors.lastName} />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="email">
                            <Form.Label>Correo*</Form.Label>
                            <Form.Control type="email" name="email" value={form.email} onChange={onChange} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <h5>Dirección de entrega de los productos</h5>
                    <Row className="g-3 mb-4">
                        <Form.Group as={Col} md={6} controlId="street">
                            <Form.Label>Calle*</Form.Label>
                            <Form.Control name="street" value={form.street} onChange={onChange} isInvalid={!!errors.street} />
                            <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="apartment">
                            <Form.Label>Departamento (opcional)</Form.Label>
                            <Form.Control name="apartment" placeholder="Ej: 603" value={form.apartment} onChange={onChange} />
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="region">
                            <Form.Label>Región*</Form.Label>
                            <Form.Select name="region" value={form.region} onChange={onChange} isInvalid={!!errors.region}>
                                <option value="">Selecciona una región</option>
                                {Object.keys(REGIONS).map(r => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="commune">
                            <Form.Label>Comuna*</Form.Label>
                            <Form.Select
                                name="commune"
                                value={form.commune}
                                onChange={onChange}
                                isInvalid={!!errors.commune}
                                disabled={!form.region}
                            >
                                <option value="">Selecciona una comuna</option>
                                {form.region &&
                                    REGIONS[form.region].map(c => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.commune}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} controlId="notes">
                            <Form.Label>Indicaciones para la entrega (opcional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="notes"
                                placeholder="Ej: entre calles, color del edificio, no tiene timbre"
                                value={form.notes}
                                onChange={onChange}
                            />
                        </Form.Group>
                    </Row>

                    <div className="text-end">
                        <Button type="submit" variant="verde" size="lg">
                            Pagar ahora {formatPrice(cartTotal)}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Checkout;
