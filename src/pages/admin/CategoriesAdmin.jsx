import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'react-bootstrap';
import { getCategories, getProducts, deleteCategory } from '../../data/db';

function CategoriesAdmin() {
    const [categories, setCategories] = useState(getCategories());
    const [error, setError] = useState('');
    const products = getProducts();

    const remove = category => {
        if (!window.confirm(`¿Eliminar la categoría ${category.name}?`)) return;

        if (deleteCategory(category.id)) {
            setError('');
            setCategories(getCategories());
        } else {
            setError(`No se puede eliminar ${category.name} porque todavía tiene productos.`);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h3 mb-0">Categorías</h2>
                <Button as={Link} to="/admin/categorias/nueva" variant="verde" size="sm">
                    Nueva categoría
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Table responsive striped className="bg-white align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Productos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.description}</td>
                            <td>{products.filter(p => p.category === c.name).length}</td>
                            <td className="text-nowrap">
                                <Button as={Link} to={`/admin/categorias/${c.id}/editar`} size="sm" variant="outline-primary" className="me-1">
                                    Editar
                                </Button>
                                <Button size="sm" variant="outline-danger" onClick={() => remove(c)}>
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

export default CategoriesAdmin;
