import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import OrderInfo from '../components/orders/OrderInfo';
import { getOrderById } from '../data/db';

function PaymentSuccess() {
    const { id } = useParams();
    const order = getOrderById(id);
    const [sent, setSent] = useState(false);

    if (!order) {
        return (
            <div className="text-center">
                <h2>No encontramos la compra</h2>
                <Link to="/">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '900px' }}>
            <Card.Body>
                <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
                    <h2 className="h4 text-success mb-0">Se ha realizado la compra. Nro #{order.number}</h2>
                    <small className="text-muted">
                        Código orden: ORDER{String(order.id).padStart(5, '0')} · {order.date}
                    </small>
                </div>

                <OrderInfo order={order} />

                {sent && (
                    <Alert variant="success" className="mt-3">
                        La boleta fue enviada a {order.customer.email}.
                    </Alert>
                )}

                <div className="d-flex flex-wrap justify-content-center gap-2 mt-3 no-print">
                    <Button variant="danger" onClick={() => window.print()}>
                        Imprimir boleta en PDF
                    </Button>
                    <Button variant="success" onClick={() => setSent(true)}>
                        Enviar boleta por email
                    </Button>
                    <Button as={Link} to="/productos" variant="outline-secondary">
                        Seguir comprando
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PaymentSuccess;
