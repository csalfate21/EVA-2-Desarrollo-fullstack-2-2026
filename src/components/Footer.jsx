import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer-roots py-4 mt-4">
            <Container>
                <Row className="g-3">
                    <Col xs={12} md={4}>
                        <h5 className="text-warning">Roots & Beans</h5>
                        <p className="small mb-0">Café de especialidad y té orgánico de comercio justo, en empaques compostables.</p>
                    </Col>
                    <Col xs={6} md={4}>
                        <h6>Tienda</h6>
                        <ul className="list-unstyled small mb-0">
                            <li><Link to="/productos">Productos</Link></li>
                            <li><Link to="/ofertas">Ofertas</Link></li>
                            <li><Link to="/blogs">Blogs</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                        </ul>
                    </Col>
                    <Col xs={6} md={4}>
                        <h6>Contacto</h6>
                        <p className="small mb-1 text-break">contacto@rootsandbeans.cl</p>
                        <p className="small mb-0">Santiago, Chile</p>
                    </Col>
                </Row>
                <p className="text-center small mt-3 mb-0">&copy; 2026 Roots & Beans. Todos los derechos reservados.</p>
            </Container>
        </footer>
    );
}

export default Footer;
