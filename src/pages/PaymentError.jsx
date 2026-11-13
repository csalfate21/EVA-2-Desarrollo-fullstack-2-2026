import { useParams, Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import OrderInfo from '../components/orders/OrderInfo';
import { getOrderById, PAYMENT_LIMIT } from '../data/db';
import { formatPrice } from '../utils/helpers';

function PaymentError() {
    const { id } = useParams();
    const order = getOrderById(id);

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
                <Alert variant="danger">
                    <h2 className="h4">No se pudo realizar el pago. Nro #{order.number}</h2>
                    <p className="mb-0">
                        El banco rechazó el pago porque supera el monto máximo de {formatPrice(PAYMENT_LIMIT)}. Tu carrito sigue
                        guardado, puedes intentarlo de nuevo.
                    </p>
                </Alert>

                <div className="text-center mb-4">
                    <Button as={Link} to="/checkout" variant="verde">
                        Volver a realizar el pago
                    </Button>
                </div>

                <OrderInfo order={order} />
            </Card.Body>
        </Card>
    );
}

export default PaymentError;
