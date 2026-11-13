import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Badge, Button, Alert, InputGroup, Form } from 'react-bootstrap';
import ProductGrid from '../components/products/ProductGrid';
import { useCart } from '../context/AppContext';
import { getProductById, getProducts } from '../data/db';
import { formatPrice } from '../utils/helpers';

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const product = getProductById(id);

    // al pasar a otro producto (relacionados) se reinicia la cantidad y el mensaje
    useEffect(() => {
        setQuantity(1);
        setAdded(false);
    }, [id]);

    if (!product) {
        return (
            <div className="text-center">
                <h2>Producto no encontrado</h2>
                <Link to="/productos">Volver a productos</Link>
            </div>
        );
    }

    // productos de la misma categoria, sin contar el actual
    const related = getProducts()
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const changeQuantity = value => {
        if (value >= 1 && value <= product.stock) {
            setQuantity(value);
        }
    };

    const add = () => {
        addToCart(product, quantity);
        setAdded(true);
    };

    return (
        <>
            <Row className="g-4 mb-5">
                <Col xs={12} md={6}>
                    <img src={product.imageUrl} className="img-fluid rounded w-100" alt={`Imagen de ${product.name}`} />
                </Col>
                <Col xs={12} md={6}>
                    <Badge bg="secondary" className="mb-2">
                        {product.category}
                    </Badge>
                    <h1>{product.name}</h1>
                    {product.offerPrice ? (
                        <p className="fs-4">
                            <del className="text-muted fs-6 me-2">{formatPrice(product.price)}</del>
                            <span className="price">{formatPrice(product.offerPrice)}</span>
                        </p>
                    ) : (
                        <p className="fs-4 price">{formatPrice(product.price)}</p>
                    )}
                    <p>{product.description}</p>
                    <p className="small text-muted">Stock disponible: {product.stock} unidades</p>

                    {product.stock > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                            <InputGroup style={{ width: '140px' }}>
                                <Button variant="outline-secondary" onClick={() => changeQuantity(quantity - 1)}>
                                    -
                                </Button>
                                <Form.Control value={quantity} readOnly className="text-center" aria-label="Cantidad" />
                                <Button variant="outline-secondary" onClick={() => changeQuantity(quantity + 1)}>
                                    +
                                </Button>
                            </InputGroup>
                            <Button variant="verde" onClick={add}>
                                Agregar al carrito
                            </Button>
                        </div>
                    ) : (
                        <Alert variant="secondary">Producto sin stock por ahora.</Alert>
                    )}

                    {added && (
                        <Alert variant="success" className="mt-3">
                            Producto agregado al carrito. <Link to="/carrito">Ver carrito</Link>
                        </Alert>
                    )}
                </Col>
            </Row>

            {related.length > 0 && (
                <>
                    <h3 className="h4 mb-3">Productos relacionados</h3>
                    <ProductGrid items={related} onAdd={addToCart} />
                </>
            )}
        </>
    );
}

export default ProductDetail;
