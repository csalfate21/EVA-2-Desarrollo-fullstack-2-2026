import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { createUser, updateUser, getUserById, findUserByEmail } from '../../data/db';
import { REGIONS } from '../../data/roots.mock';
import { isValidEmail } from '../../utils/helpers';

const emptyUser = { name: '', lastName: '', email: '', password: '', role: 'cliente', region: '', commune: '', address: '' };

// formulario para nuevo usuario y para editar uno existente
function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editing = Boolean(id);

    const [form, setForm] = useState(() => {
        const user = editing ? getUserById(id) : null;
        // al editar la contraseña queda vacia, si no se escribe una nueva se mantiene la anterior
        return user ? { ...user, password: '' } : emptyUser;
    });
    const [errors, setErrors] = useState({});

    const onChange = e => {
        const { name, value } = e.target;
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
        if (!isValidEmail(form.email)) {
            errs.email = 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com';
        } else {
            const other = findUserByEmail(form.email);
            if (other && other.id !== Number(id)) errs.email = 'Ese correo ya está registrado';
        }
        if (!editing && form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
        if (editing && form.password && form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
        if (!form.region) errs.region = 'Selecciona una región';
        if (!form.commune) errs.commune = 'Selecciona una comuna';
        if (!form.address.trim()) errs.address = 'La dirección es obligatoria';
        return errs;
    };

    const onSubmit = e => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const { password, ...data } = form;
        if (editing) {
            updateUser(id, password ? { ...data, password } : data);
        } else {
            createUser(form);
        }
        navigate('/admin/usuarios');
    };

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h2 className="h4 mb-3">{editing ? 'Editar usuario' : 'Nuevo usuario'}</h2>

                <Form noValidate onSubmit={onSubmit}>
                    <Row className="g-3">
                        <Form.Group as={Col} md={6} controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={onChange} isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="lastName">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control name="lastName" value={form.lastName} onChange={onChange} isInvalid={!!errors.lastName} />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="email">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" name="email" value={form.email} onChange={onChange} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="password">
                            <Form.Label>{editing ? 'Nueva contraseña (opcional)' : 'Contraseña'}</Form.Label>
                            <Form.Control type="password" name="password" value={form.password} onChange={onChange} isInvalid={!!errors.password} />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={4} controlId="role">
                            <Form.Label>Tipo de usuario</Form.Label>
                            <Form.Select name="role" value={form.role} onChange={onChange}>
                                <option value="cliente">Cliente</option>
                                <option value="admin">Administrador</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={4} controlId="region">
                            <Form.Label>Región</Form.Label>
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
                        <Form.Group as={Col} md={4} controlId="commune">
                            <Form.Label>Comuna</Form.Label>
                            <Form.Select name="commune" value={form.commune} onChange={onChange} isInvalid={!!errors.commune} disabled={!form.region}>
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
                        <Form.Group as={Col} xs={12} controlId="address">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control name="address" value={form.address} onChange={onChange} isInvalid={!!errors.address} />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <div className="d-flex gap-2 mt-4">
                        <Button type="submit" variant="verde">
                            Guardar
                        </Button>
                        <Button variant="outline-secondary" onClick={() => navigate('/admin/usuarios')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default UserForm;
