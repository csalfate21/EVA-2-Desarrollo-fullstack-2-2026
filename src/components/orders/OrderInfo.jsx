import { Row, Col, Card } from 'react-bootstrap';
import CartTable from '../cart/CartTable';
import { formatPrice } from '../../utils/helpers';

// datos del cliente, productos y total de una orden (se usa en la boleta y en las paginas de pago)
export default function OrderInfo({ order }) {
    const c = order.customer;

    return (
        <>
            <h5>Información del cliente</h5>
            <Row className="mb-3 small">
                <Col sm={4}>
                    <strong>Nombre:</strong> {c.name}
                </Col>
                <Col sm={4}>
                    <strong>Apellidos:</strong> {c.lastName}
                </Col>
                <Col sm={4}>
                    <strong>Correo:</strong> {c.email}
                </Col>
            </Row>

            <h5>Dirección de entrega</h5>
            <Row className="mb-3 small">
                <Col sm={6}>
                    <strong>Calle:</strong> {c.street}
                    {c.apartment && `, depto ${c.apartment}`}
                </Col>
                <Col sm={6}>
                    <strong>Comuna:</strong> {c.commune}, {c.region}
                </Col>
                {c.notes && (
                    <Col xs={12}>
                        <strong>Indicaciones:</strong> {c.notes}
                    </Col>
                )}
            </Row>

            <CartTable items={order.items} />

            <Card body className="text-center mt-3">
                <span className="fs-5">
                    Total {order.status === 'Pagada' ? 'pagado' : 'a pagar'}: <strong>{formatPrice(order.total)}</strong>
                </span>
            </Card>
        </>
    );
}
