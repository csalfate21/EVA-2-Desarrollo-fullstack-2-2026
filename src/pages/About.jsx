import { Row, Col, Card } from 'react-bootstrap';

function About() {
    return (
        <>
            <h2 className="mb-3">¿Quiénes somos?</h2>

            <Row className="g-4 align-items-center mb-5">
                <Col xs={12} md={6}>
                    <p>
                        Roots & Beans es una tienda online que vende café de especialidad y té orgánico comprado directamente a
                        cooperativas de comercio justo. También tenemos termos reutilizables y kits para preparar café a mano, pensados
                        para acompañar largas jornadas de estudio o trabajo.
                    </p>
                    <p>
                        Todos nuestros granos se venden en empaques compostables, porque queremos que tomar un buen café no le haga daño al
                        planeta.
                    </p>
                </Col>
                <Col xs={12} md={6}>
                    <video className="w-100 rounded" controls>
                        <source src="/video/proceso-cafe.mp4" type="video/mp4" />
                        Tu navegador no soporta videos.
                    </video>
                </Col>
            </Row>

            <h3 className="h4 mb-3">Nuestros valores</h3>
            <Row xs={1} md={3} className="g-3 mb-5">
                <Col>
                    <Card body className="h-100">
                        <h5>Comercio justo</h5>
                        <p className="mb-0">Los productores reciben un precio justo por su cosecha.</p>
                    </Card>
                </Col>
                <Col>
                    <Card body className="h-100">
                        <h5>Cultivo orgánico</h5>
                        <p className="mb-0">Sin químicos que dañen la tierra ni a las personas.</p>
                    </Card>
                </Col>
                <Col>
                    <Card body className="h-100">
                        <h5>Cero plástico</h5>
                        <p className="mb-0">Empaques compostables y productos reutilizables.</p>
                    </Card>
                </Col>
            </Row>

            <h3 className="h4">¿Cómo comprar?</h3>
            <ol>
                <li>Revisa nuestros productos o búscalos por categoría.</li>
                <li>Agrega lo que quieras al carrito.</li>
                <li>Completa tus datos de entrega y paga.</li>
            </ol>
        </>
    );
}

export default About;
