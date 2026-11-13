import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'react-bootstrap';
import { getCriticalProducts } from '../../data/db';

// productos con stock igual o menor a su stock critico
function CriticalProducts() {
    const products = getCriticalProducts();

    return (
        <>
            <h2 className="h3 mb-3">Listado de productos críticos</h2>

            {products.length === 0 ? (
                <Alert variant="success">No hay productos con stock crítico.</Alert>
            ) : (
                <Table responsive striped className="bg-white align-middle">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Stock actual</th>
                            <th>Stock crítico</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td className="text-danger fw-bold">{p.stock}</td>
                                <td>{p.criticalStock}</td>
                                <td>
                                    <Button as={Link} to={`/admin/productos/${p.id}/editar`} size="sm" variant="outline-primary">
                                        Reponer stock
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Link to="/admin/productos">Volver a productos</Link>
        </>
    );
}

export default CriticalProducts;
