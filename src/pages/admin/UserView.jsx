import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button } from 'react-bootstrap';
import { getUserById, getOrdersByEmail } from '../../data/db';
import { formatPrice } from '../../utils/helpers';

// "mostrar usuario" con su historial de compras
function UserView() {
    const { id } = useParams();
    const user = getUserById(id);

    if (!user) {
        return <p>No se encontró el usuario.</p>;
    }

    const orders = getOrdersByEmail(user.email);

    return (
        <>
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                        <h2 className="h4 mb-0">
                            {user.name} {user.lastName}
                        </h2>
                        <Badge bg={user.role === 'admin' ? 'dark' : 'secondary'}>{user.role}</Badge>
                    </div>
                    <Row className="small g-2">
                        <Col md={6}>
                            <strong>Correo:</strong> {user.email}
                        </Col>
                        <Col md={6}>
                            <strong>Dirección:</strong> {user.address}, {user.commune}, {user.region}
                        </Col>
                    </Row>
                    <div className="d-flex gap-2 mt-3">
                        <Button as={Link} to={`/admin/usuarios/${user.id}/editar`} variant="verde" size="sm">
                            Editar usuario
                        </Button>
                        <Button as={Link} to="/admin/usuarios" variant="outline-secondary" size="sm">
                            Volver
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <h3 className="h5">Historial de compras</h3>
            {orders.length === 0 ? (
                <p className="text-muted">Este usuario todavía no tiene compras.</p>
            ) : (
                <Table responsive striped className="bg-white align-middle">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Fecha</th>
                            <th>Productos</th>
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
                                <td>{o.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
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

export default UserView;
