import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';

export default function ProductCard({ product, onAdd }) {
    const { id, name, price, offerPrice, category, imageUrl, stock } = product;
    const noStock = stock === 0;

    return (
        <Card className="h-100 shadow-sm">
            <Link to={`/productos/${id}`}>
                <Card.Img variant="top" src={imageUrl} alt={`Imagen de ${name}`} loading="lazy" className="product-img" />
            </Link>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0 fs-6">{name}</Card.Title>
                    {category && <Badge bg="secondary">{category}</Badge>}
                </div>

                {offerPrice ? (
                    <Card.Text className="mb-3">
                        <del className="text-muted me-2">{formatPrice(price)}</del>
                        <span className="price">{formatPrice(offerPrice)}</span>
                        <Badge bg="danger" className="ms-2">
                            Oferta
                        </Badge>
                    </Card.Text>
                ) : (
                    <Card.Text className="price mb-3">{formatPrice(price)}</Card.Text>
                )}

                <Button
                    variant="verde"
                    onClick={onAdd}
                    className="mt-auto"
                    disabled={noStock}
                    aria-label={`Agregar ${name} al carrito`}
                >
                    {noStock ? 'Sin stock' : 'Agregar'}
                </Button>
            </Card.Body>
        </Card>
    );
}
