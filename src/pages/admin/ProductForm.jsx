import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { createProduct, updateProduct, getProductById, getCategories } from '../../data/db';

const IMAGES = [
    '/img/cafe-etiopia.jpg',
    '/img/cafe-huila.jpg',
    '/img/cafe-peru.jpg',
    '/img/te-sencha.jpg',
    '/img/te-chai.jpg',
    '/img/prensa-francesa.jpg',
    '/img/kit-pour-over.jpg',
    '/img/termo.jpg',
    '/img/logo.png'
];

const emptyProduct = {
    name: '',
    category: '',
    price: '',
    offerPrice: '',
    stock: '',
    criticalStock: '',
    imageUrl: IMAGES[0],
    description: ''
};

// el mismo formulario sirve para crear (/nuevo) y editar (/:id/editar)
function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categories = getCategories();
    const editing = Boolean(id);

    const [form, setForm] = useState(() => {
        const product = editing ? getProductById(id) : null;
        return product ? { ...product, offerPrice: product.offerPrice || '' } : emptyProduct;
    });
    const [errors, setErrors] = useState({});

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'El nombre es obligatorio';
        if (!form.category) errs.category = 'Selecciona una categoría';
        if (!(Number(form.price) > 0)) errs.price = 'El precio debe ser mayor a 0';
        if (form.offerPrice !== '' && Number(form.offerPrice) >= Number(form.price)) {
            errs.offerPrice = 'El precio de oferta debe ser menor al precio normal';
        }
        if (form.stock === '' || Number(form.stock) < 0) errs.stock = 'El stock no puede ser negativo';
        if (form.criticalStock === '' || Number(form.criticalStock) < 0) errs.criticalStock = 'Ingresa el stock crítico';
        return errs;
    };

    const onSubmit = e => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const data = {
            ...form,
            name: form.name.trim(),
            price: Number(form.price),
            offerPrice: form.offerPrice === '' ? null : Number(form.offerPrice),
            stock: Number(form.stock),
            criticalStock: Number(form.criticalStock)
        };

        if (editing) {
            updateProduct(id, data);
        } else {
            createProduct(data);
        }
        navigate('/admin/productos');
    };

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h2 className="h4 mb-3">{editing ? 'Editar producto' : 'Nuevo producto'}</h2>

                <Form noValidate onSubmit={onSubmit}>
                    <Row className="g-3">
                        <Form.Group as={Col} md={6} controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={onChange} isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="category">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select name="category" value={form.category} onChange={onChange} isInvalid={!!errors.category}>
                                <option value="">Selecciona una categoría</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm={6} md={3} controlId="price">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" name="price" value={form.price} onChange={onChange} isInvalid={!!errors.price} />
                            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm={6} md={3} controlId="offerPrice">
                            <Form.Label>Precio oferta (opcional)</Form.Label>
                            <Form.Control type="number" name="offerPrice" value={form.offerPrice} onChange={onChange} isInvalid={!!errors.offerPrice} />
                            <Form.Control.Feedback type="invalid">{errors.offerPrice}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm={6} md={3} controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" name="stock" value={form.stock} onChange={onChange} isInvalid={!!errors.stock} />
                            <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm={6} md={3} controlId="criticalStock">
                            <Form.Label>Stock crítico</Form.Label>
                            <Form.Control
                                type="number"
                                name="criticalStock"
                                value={form.criticalStock}
                                onChange={onChange}
                                isInvalid={!!errors.criticalStock}
                            />
                            <Form.Control.Feedback type="invalid">{errors.criticalStock}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="imageUrl">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Select name="imageUrl" value={form.imageUrl} onChange={onChange}>
                                {IMAGES.map(img => (
                                    <option key={img} value={img}>
                                        {img.replace('/img/', '')}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Col md={6}>
                            <img src={form.imageUrl} alt="Vista previa" className="cart-img mt-md-4" />
                        </Col>
                        <Form.Group as={Col} xs={12} controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={onChange} />
                        </Form.Group>
                    </Row>

                    <div className="d-flex gap-2 mt-4">
                        <Button type="submit" variant="verde">
                            Guardar
                        </Button>
                        <Button variant="outline-secondary" onClick={() => navigate('/admin/productos')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ProductForm;
