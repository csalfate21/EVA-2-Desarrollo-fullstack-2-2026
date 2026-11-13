import { Table, Button } from 'react-bootstrap';
import { formatPrice } from '../../utils/helpers';

// si recibe onChangeQuantity y onRemove se puede editar (carrito)
// si no los recibe solo muestra los productos (checkout, boleta)
export default function CartTable({ items, onChangeQuantity, onRemove }) {
    const editable = Boolean(onChangeQuantity && onRemove);

    return (
        <Table responsive className="align-middle bg-white mb-0">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    {editable && <th>Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>
                            <img src={item.imageUrl} alt={item.name} className="cart-img" />
                        </td>
                        <td>{item.name}</td>
                        <td>{formatPrice(item.price)}</td>
                        <td>
                            {editable ? (
                                <div className="d-flex align-items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        aria-label={`Restar ${item.name}`}
                                        onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        aria-label={`Sumar ${item.name}`}
                                        onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                            ) : (
                                item.quantity
                            )}
                        </td>
                        <td>{formatPrice(item.price * item.quantity)}</td>
                        {editable && (
                            <td>
                                <Button size="sm" variant="danger" onClick={() => onRemove(item.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
