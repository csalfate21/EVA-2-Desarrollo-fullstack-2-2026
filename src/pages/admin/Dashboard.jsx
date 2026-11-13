import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import StatCard from '../../components/admin/StatCard';
import { getOrders, getProducts, getUsers } from '../../data/db';
import { formatPrice } from '../../utils/helpers';

const shortcuts = [
    { to: '/admin/ordenes', title: 'Órdenes', text: 'Gestión y seguimiento de las órdenes de compra.' },
    { to: '/admin/productos', title: 'Productos', text: 'Administrar inventario y detalles de los productos.' },
    { to: '/admin/categorias', title: 'Categorías', text: 'Organizar los productos en categorías.' },
    { to: '/admin/usuarios', title: 'Usuarios', text: 'Gestión de cuentas de usuario y sus roles.' },
    { to: '/admin/reportes', title: 'Reportes', text: 'Ventas y productos más vendidos de la tienda.' },
    { to: '/admin/productos/criticos', title: 'Stock crítico', text: 'Productos que hay que reponer pronto.' },
    { to: '/admin/perfil', title: 'Perfil', text: 'Datos personales de la cuenta de administrador.' },
    { to: '/', title: 'Tienda', text: 'Ver la tienda tal como la ven los clientes.' }
];

function Dashboard() {
    const orders = getOrders();
    const products = getProducts();
    const users = getUsers();

    const paid = orders.filter(o => o.status === 'Pagada');
    const sales = paid.reduce((sum, o) => sum + o.total, 0);
    const inventory = products.reduce((sum, p) => sum + p.stock, 0);
    const clients = users.filter(u => u.role === 'cliente').length;

    return (
        <>
            <h2 className="h3 mb-0">Dashboard</h2>
            <p className="text-muted">Resumen de las actividades de la tienda</p>

            <Row className="g-3 mb-4">
                <Col md={4}>
                    <StatCard title="Compras" value={paid.length} detail={`Total vendido: ${formatPrice(sales)}`} variant="primary" />
                </Col>
                <Col md={4}>
                    <StatCard title="Productos" value={products.length} detail={`Inventario actual: ${inventory} unidades`} variant="success" />
                </Col>
                <Col md={4}>
                    <StatCard title="Usuarios" value={users.length} detail={`Clientes registrados: ${clients}`} variant="warning" />
                </Col>
            </Row>

            <Row xs={1} sm={2} xl={4} className="g-3">
                {shortcuts.map(s => (
                    <Col key={s.title}>
                        <Card as={Link} to={s.to} className="h-100 text-decoration-none text-center shortcut-card">
                            <Card.Body>
                                <Card.Title className="fs-6">{s.title}</Card.Title>
                                <Card.Text className="text-muted small">{s.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Dashboard;
