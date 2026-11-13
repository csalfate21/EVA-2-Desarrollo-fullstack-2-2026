import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { createUser, findUserByEmail } from '../data/db';
import { REGIONS } from '../data/roots.mock';
import { isValidEmail } from '../utils/helpers';


function Register() {
    const [created, setCreated] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({ defaultValues: { region: '', commune: '' } });

    const region = watch('region');

    const onSubmit = data => {
        const { confirm, ...user } = data;
        createUser({ ...user, email: user.email.trim() });
        setCreated(true);
        reset();
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} lg={8}>
                <Card className="shadow-sm">
                    <Card.Body className="p-4">
                        <h2 className="text-center mb-3">Crear cuenta</h2>

                        {created && (
                            <Alert variant="success">
                                Cuenta creada correctamente. Ahora puedes <Link to="/login">iniciar sesión</Link>.
                            </Alert>
                        )}

                        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Row className="g-3">
                                <Form.Group as={Col} md={6} controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        {...register('name', { required: 'El nombre es obligatorio' })}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="lastName">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control
                                        {...register('lastName', { required: 'Los apellidos son obligatorios' })}
                                        isInvalid={!!errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs={12} controlId="email">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        type="email"
                                        {...register('email', {
                                            required: 'El correo es obligatorio',
                                            validate: value => {
                                                if (!isValidEmail(value)) return 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com';
                                                if (findUserByEmail(value)) return 'Ese correo ya está registrado';
                                                return true;
                                            }
                                        })}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        {...register('password', {
                                            required: 'La contraseña es obligatoria',
                                            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                        })}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="confirm">
                                    <Form.Label>Confirmar contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        {...register('confirm', {
                                            validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                                        })}
                                        isInvalid={!!errors.confirm}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirm?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="region">
                                    <Form.Label>Región</Form.Label>
                                    <Form.Select {...register('region', {
                                            required: 'Selecciona una región',
                                            // si cambia la region se borra la comuna elegida
                                            onChange: () => setValue('commune', '')
                                        })} isInvalid={!!errors.region}>
                                        <option value="">Selecciona una región</option>
                                        {Object.keys(REGIONS).map(r => (
                                            <option key={r} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.region?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="commune">
                                    <Form.Label>Comuna</Form.Label>
                                    <Form.Select
                                        {...register('commune', { required: 'Selecciona una comuna' })}
                                        isInvalid={!!errors.commune}
                                        disabled={!region}
                                    >
                                        <option value="">Selecciona una comuna</option>
                                        {region &&
                                            REGIONS[region].map(c => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.commune?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xs={12} controlId="address">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        placeholder="Calle, número y depto"
                                        {...register('address', { required: 'La dirección es obligatoria' })}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Button type="submit" variant="verde" className="w-100 mt-4">
                                Registrarme
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Register;
