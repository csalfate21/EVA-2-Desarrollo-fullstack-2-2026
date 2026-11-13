import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { useCart } from '../context/AppContext';
import { getProducts, getCategories } from '../data/db';

function Home() {
    const { addToCart } = useCart();
    // en el inicio mostramos solo los primeros 4 productos
    const featured = getProducts().slice(0, 4);
    const categories = getCategories();

    return (
        <>
            <section className="hero p-4 p-md-5 mb-5">
                <Row className="align-items-center g-4">
                    <Col xs={12} md={6}>
                        <h1 className="fw-bold">Roots & Beans</h1>
                        <p className="lead">
                            Café de especialidad y té orgánico de cooperativas de comercio justo, en empaques compostables. Ideal para
                            acompañar largas jornadas de estudio o trabajo.
                        </p>
                        <Button as={Link} to="/productos" variant="ambar">
                            Ver productos
                        </Button>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src="/img/banner.jpg" className="img-fluid" alt="Taza de café con granos y hojas de té" />
                    </Col>
                </Row>
            </section>

            <section className="mb-5">
                <h2 className="text-center mb-4">Productos destacados</h2>
                <ProductGrid items={featured} onAdd={addToCart} />
            </section>

            <section className="mb-5">
                <h2 className="text-center mb-4">Categorías</h2>
                <Row xs={1} md={3} className="g-3">
                    {categories.map(c => (
                        <Col key={c.id}>
                            <Card as={Link} to={`/categorias/${c.id}`} className="h-100 text-decoration-none category-card">
                                <Card.Img variant="top" src={c.imageUrl} alt={c.name} />
                                <Card.Body>
                                    <Card.Title>{c.name}</Card.Title>
                                    <Card.Text className="text-muted small">{c.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section>
                <h2 className="text-center mb-4">¿Por qué Roots & Beans?</h2>
                <Row xs={1} md={3} className="g-3 text-center">
                    <Col>
                        <Card body className="h-100">
                            <h5>Comercio justo</h5>
                            <p className="mb-0">Compramos directo a cooperativas de pequeños productores.</p>
                        </Card>
                    </Col>
                    <Col>
                        <Card body className="h-100">
                            <h5>Empaques compostables</h5>
                            <p className="mb-0">Nuestras bolsas se pueden echar al compost.</p>
                        </Card>
                    </Col>
                    <Col>
                        <Card body className="h-100">
                            <h5>Para largas jornadas</h5>
                            <p className="mb-0">Termos y kits para preparar tu café mientras estudias o trabajas.</p>
                        </Card>
                    </Col>
                </Row>
            </section>
        </>
    );
}

export default Home;
