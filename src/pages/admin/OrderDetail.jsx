import { useParams, Link } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';
import OrderInfo from '../../components/orders/OrderInfo';
import { getOrderById } from '../../data/db';

// "mostrar boleta" del panel de administrador
function OrderDetail() {
    const { id } = useParams();
    const order = getOrderById(id);

    if (!order) {
        return <p>No se encontró la orden.</p>;
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <h2 className="h4 mb-0">Boleta nro #{order.number}</h2>
                    <div>
                        <span className="text-muted me-2">{order.date}</span>
                        <Badge bg={order.status === 'Pagada' ? 'success' : 'danger'}>{order.status}</Badge>
                    </div>
                </div>

                <OrderInfo order={order} />

                <div className="d-flex gap-2 mt-3 no-print">
                    <Button variant="danger" onClick={() => window.print()}>
                        Imprimir boleta
                    </Button>
                    <Button as={Link} to="/admin/ordenes" variant="outline-secondary">
                        Volver a órdenes
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default OrderDetail;
