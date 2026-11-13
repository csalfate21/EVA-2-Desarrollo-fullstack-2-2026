import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import ProductGrid from '../components/products/ProductGrid';
import { useCart } from '../context/AppContext';
import { getCategories, getProducts } from '../data/db';

function Categories() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const categories = getCategories();
    const products = getProducts();

    // si en la url viene una categoria se muestran sus productos
    const selected = categories.find(c => c.id === Number(id));
    const list = selected ? products.filter(p => p.category === selected.name) : [];

    return (
        <>
            <h2 className="mb-3">Categorías</h2>

            <Row xs={2} md={3} lg={4} className="g-3 mb-4">
                {categories.map(c => (
                    <Col key={c.id}>
                        <Card
                            as={Link}
                            to={`/categorias/${c.id}`}
                            className={`h-100 text-decoration-none text-center category-card ${selected && selected.id === c.id ? 'active' : ''}`}
                        >
                            <Card.Img variant="top" src={c.imageUrl} alt={c.name} />
                            <Card.Body className="py-2">
                                <Card.Title className="fs-6 mb-0">{c.name}</Card.Title>
                                <small className="text-muted">{products.filter(p => p.category === c.name).length} productos</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {selected ? (
                <>
                    <h3>{selected.name}</h3>
                    <p className="text-muted">{selected.description}</p>
                    <ProductGrid items={list} onAdd={addToCart} />
                </>
            ) : (
                <p className="text-muted">Selecciona una categoría para ver sus productos.</p>
            )}
        </>
    );
}

export default Categories;
