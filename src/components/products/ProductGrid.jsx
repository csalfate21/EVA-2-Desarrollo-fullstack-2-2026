import { Row, Col, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

// grilla de bootstrap: 1 columna en celular, 2 en tablet, 3 en notebook y 4 en pantallas grandes
export default function ProductGrid({ items, onAdd }) {
    if (items.length === 0) {
        return <Alert variant="light">No se encontraron productos.</Alert>;
    }

    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {items.map(p => (
                <Col key={p.id}>
                    <ProductCard product={p} onAdd={() => onAdd(p)} />
                </Col>
            ))}
        </Row>
    );
}
