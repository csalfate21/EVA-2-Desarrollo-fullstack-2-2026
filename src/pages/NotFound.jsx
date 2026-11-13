import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="text-center py-5">
            <h2>Página no encontrada</h2>
            <p className="text-muted">La página que buscas no existe.</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default NotFound;
