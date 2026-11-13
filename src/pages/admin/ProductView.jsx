import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { getProductById } from '../../data/db';
import { formatPrice } from '../../utils/helpers';

// "mostrar producto" del panel de administrador
function ProductView() {
    const { id } = useParams();
    const product = getProductById(id);

    if (!product) {
        return <p>No se encontró el producto.</p>;
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Row className="g-4">
                    <Col md={4}>
                        <img src={product.imageUrl} alt={product.name} className="img-fluid rounded" />
                    </Col>
                    <Col md={8}>
                        <h2 className="h4">{product.name}</h2>
                        <p>
                            <Badge bg="secondary">{product.category}</Badge>{' '}
                            {product.stock <= product.criticalStock && <Badge bg="danger">Stock crítico</Badge>}
                        </p>
                        <p className="mb-1">
                            <strong>Precio:</strong> {formatPrice(product.price)}
                        </p>
                        <p className="mb-1">
                            <strong>Precio oferta:</strong> {product.offerPrice ? formatPrice(product.offerPrice) : 'Sin oferta'}
                        </p>
                        <p className="mb-1">
                            <strong>Stock:</strong> {product.stock} (crítico: {product.criticalStock})
                        </p>
                        <p>
                            <strong>Descripción:</strong> {product.description}
                        </p>
                        <div className="d-flex gap-2">
                            <Button as={Link} to={`/admin/productos/${product.id}/editar`} variant="verde">
                                Editar producto
                            </Button>
                            <Button as={Link} to="/admin/productos" variant="outline-secondary">
                                Volver
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ProductView;
