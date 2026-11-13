import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Badge } from 'react-bootstrap';
import { getProducts, deleteProduct } from '../../data/db';
import { formatPrice } from '../../utils/helpers';

function ProductsAdmin() {
    const [products, setProducts] = useState(getProducts());

    const remove = product => {
        if (window.confirm(`¿Seguro que quieres eliminar ${product.name}?`)) {
            deleteProduct(product.id);
            // se vuelve a leer la lista para que la tabla se actualice
            setProducts(getProducts());
        }
    };

    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="h3 mb-0">Productos</h2>
                <div className="d-flex flex-wrap gap-2">
                    <Button as={Link} to="/admin/productos/nuevo" variant="verde" size="sm">
                        Nuevo producto
                    </Button>
                    <Button as={Link} to="/admin/productos/criticos" variant="outline-danger" size="sm">
                        Productos críticos
                    </Button>
                    <Button as={Link} to="/admin/reportes" variant="outline-secondary" size="sm">
                        Reportes
                    </Button>
                </div>
            </div>

            <Table responsive striped className="bg-white align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>
                                <img src={p.imageUrl} alt={p.name} className="cart-img" />
                            </td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>
                                {formatPrice(p.price)}
                                {p.offerPrice && <div className="small text-danger">Oferta: {formatPrice(p.offerPrice)}</div>}
                            </td>
                            <td>
                                {p.stock}{' '}
                                {p.stock <= p.criticalStock && (
                                    <Badge bg="danger" className="ms-1">
                                        Crítico
                                    </Badge>
                                )}
                            </td>
                            <td className="text-nowrap">
                                <Button as={Link} to={`/admin/productos/${p.id}`} size="sm" variant="outline-secondary" className="me-1">
                                    Ver
                                </Button>
                                <Button as={Link} to={`/admin/productos/${p.id}/editar`} size="sm" variant="outline-primary" className="me-1">
                                    Editar
                                </Button>
                                <Button size="sm" variant="outline-danger" onClick={() => remove(p)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ProductsAdmin;
