import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { createCategory, updateCategory, getCategoryById, getCategories } from '../../data/db';

// formulario para nueva categoria y para editar una existente
function CategoryForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editing = Boolean(id);

    const [form, setForm] = useState(() => {
        const category = editing ? getCategoryById(id) : null;
        return category || { name: '', description: '', imageUrl: '/img/logo.png' };
    });
    const [error, setError] = useState('');

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        const name = form.name.trim();

        if (!name) {
            setError('El nombre es obligatorio');
            return;
        }
        const repeated = getCategories().some(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== Number(id));
        if (repeated) {
            setError('Ya existe una categoría con ese nombre');
            return;
        }

        if (editing) {
            updateCategory(id, { ...form, name });
        } else {
            createCategory({ ...form, name });
        }
        navigate('/admin/categorias');
    };

    return (
        <Card className="shadow-sm" style={{ maxWidth: '640px' }}>
            <Card.Body>
                <h2 className="h4 mb-3">{editing ? 'Editar categoría' : 'Nueva categoría'}</h2>
                <Form noValidate onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={onChange} isInvalid={!!error} />
                        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows={2} name="description" value={form.description} onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Imagen (ruta dentro de public)</Form.Label>
                        <Form.Control name="imageUrl" value={form.imageUrl} onChange={onChange} />
                    </Form.Group>
                    <div className="d-flex gap-2">
                        <Button type="submit" variant="verde">
                            Guardar
                        </Button>
                        <Button variant="outline-secondary" onClick={() => navigate('/admin/categorias')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CategoryForm;
