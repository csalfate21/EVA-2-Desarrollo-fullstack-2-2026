import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from '../NavBar';
import Footer from '../Footer';

// estructura comun de la tienda, Outlet es donde se muestra la pagina de la ruta actual
function StoreLayout() {
    const { pathname } = useLocation();

    // al cambiar de pagina se vuelve al inicio de la pantalla
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <NavBar />
            <main className="py-4">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default StoreLayout;
