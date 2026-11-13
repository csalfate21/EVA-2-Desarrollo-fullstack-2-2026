import { Link, Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AppContext';

const links = [
    { to: '/admin', text: 'Dashboard', end: true },
    { to: '/admin/ordenes', text: 'Órdenes' },
    { to: '/admin/productos', text: 'Productos' },
    { to: '/admin/categorias', text: 'Categorías' },
    { to: '/admin/usuarios', text: 'Usuarios' },
    { to: '/admin/reportes', text: 'Reportes' },
    { to: '/admin/perfil', text: 'Perfil' }
];

function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // si no hay sesion de administrador se manda al login
    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    const closeSession = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <Navbar variant="dark" className="admin-top">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/admin">
                        Roots & Beans · Administración
                    </Navbar.Brand>
                    <Navbar.Text className="text-white small">{user.name}</Navbar.Text>
                </Container>
            </Navbar>

            <Container fluid>
                <Row>
                    <Col md={3} lg={2} className="admin-sidebar py-3">
                        <Nav variant="pills" className="flex-column">
                            {links.map(link => (
                                <Nav.Link key={link.to} as={NavLink} to={link.to} end={link.end}>
                                    {link.text}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <hr />
                        <div className="d-grid gap-2">
                            <Button as={Link} to="/" variant="dark" size="sm">
                                Ir a la tienda
                            </Button>
                            <Button variant="danger" size="sm" onClick={closeSession}>
                                Cerrar sesión
                            </Button>
                        </div>
                    </Col>
                    <Col md={9} lg={10} className="py-4">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminLayout;
