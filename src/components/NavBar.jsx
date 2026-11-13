import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart, useAuth } from '../context/AppContext';
import { getCategories } from '../data/db';

function NavBar() {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);
    const categories = getCategories();

    // en celular el menu se cierra solo al cambiar de pagina
    useEffect(() => {
        setExpanded(false);
    }, [location.pathname]);

    return (
        <Navbar expand="xl" variant="dark" className="navbar-roots" expanded={expanded} onToggle={setExpanded}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                    <img src="/img/logo.png" alt="Logo Roots & Beans" width="36" height="36" />
                    Roots & Beans
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-principal" />
                <Navbar.Collapse id="menu-principal">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">
                            Productos
                        </Nav.Link>
                        <NavDropdown title="Categorías" id="menu-categorias">
                            {categories.map(c => (
                                <NavDropdown.Item key={c.id} as={Link} to={`/categorias/${c.id}`}>
                                    {c.name}
                                </NavDropdown.Item>
                            ))}
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/categorias">
                                Ver todas
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={NavLink} to="/ofertas">
                            Ofertas
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/nosotros">
                            Nosotros
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/blogs">
                            Blogs
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">
                            Contacto
                        </Nav.Link>
                    </Nav>

                    <Nav className="align-items-xl-center">
                        <Nav.Link as={NavLink} to="/carrito">
                            Carrito{' '}
                            <Badge bg="warning" text="dark" pill>
                                {cartCount}
                            </Badge>
                        </Nav.Link>
                        {user ? (
                            <NavDropdown title={user.name} id="menu-usuario" align="end">
                                {user.role === 'admin' && (
                                    <NavDropdown.Item as={Link} to="/admin">
                                        Panel de administración
                                    </NavDropdown.Item>
                                )}
                                <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login">
                                    Iniciar sesión
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/registro">
                                    Crear cuenta
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
