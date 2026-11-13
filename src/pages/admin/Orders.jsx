import { Link } from 'react-router-dom';
import { Table, Badge, Button, Alert } from 'react-bootstrap';
import { getOrders } from '../../data/db';
import { formatPrice } from '../../utils/helpers';

function Orders() {
    // las ordenes mas nuevas primero
    const orders = [...getOrders()].reverse();

    return (
        <>
            <h2 className="h3 mb-3">Órdenes / Boletas</h2>

            {orders.length === 0 ? (
                <Alert variant="light">Todavía no hay órdenes.</Alert>
            ) : (
                <Table responsive striped className="bg-white align-middle">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id}>
                                <td>#{o.number}</td>
                                <td>{o.date}</td>
                                <td>
                                    {o.customer.name} {o.customer.lastName}
                                </td>
                                <td>{formatPrice(o.total)}</td>
                                <td>
                                    <Badge bg={o.status === 'Pagada' ? 'success' : 'danger'}>{o.status}</Badge>
                                </td>
                                <td>
                                    <Button as={Link} to={`/admin/ordenes/${o.id}`} size="sm" variant="outline-primary">
                                        Ver boleta
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default Orders;
