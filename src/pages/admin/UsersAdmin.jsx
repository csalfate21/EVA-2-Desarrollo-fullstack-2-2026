import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Badge } from 'react-bootstrap';
import { getUsers, deleteUser } from '../../data/db';
import { useAuth } from '../../context/AppContext';

function UsersAdmin() {
    const { user: me } = useAuth();
    const [users, setUsers] = useState(getUsers());

    const remove = user => {
        if (window.confirm(`¿Eliminar a ${user.name} ${user.lastName}?`)) {
            deleteUser(user.id);
            setUsers(getUsers());
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h3 mb-0">Usuarios</h2>
                <Button as={Link} to="/admin/usuarios/nuevo" variant="verde" size="sm">
                    Nuevo usuario
                </Button>
            </div>

            <Table responsive striped className="bg-white align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>
                                {u.name} {u.lastName}
                            </td>
                            <td>{u.email}</td>
                            <td>
                                <Badge bg={u.role === 'admin' ? 'dark' : 'secondary'}>{u.role}</Badge>
                            </td>
                            <td className="text-nowrap">
                                <Button as={Link} to={`/admin/usuarios/${u.id}`} size="sm" variant="outline-secondary" className="me-1">
                                    Ver
                                </Button>
                                <Button as={Link} to={`/admin/usuarios/${u.id}/editar`} size="sm" variant="outline-primary" className="me-1">
                                    Editar
                                </Button>
                                {/* el admin no se puede borrar a si mismo */}
                                {u.id !== me.id && (
                                    <Button size="sm" variant="outline-danger" onClick={() => remove(u)}>
                                        Eliminar
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default UsersAdmin;
