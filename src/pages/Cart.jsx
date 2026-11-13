import { Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import CartTable from '../components/cart/CartTable';
import { useCart } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

function Cart() {
    const { cart, cartTotal, changeQuantity, removeFromCart, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="text-center">
                <h2>Carrito de compras</h2>
                <Alert variant="light">Tu carrito está vacío.</Alert>
                <Button as={Link} to="/productos" variant="verde">
                    Ver productos
                </Button>
            </div>
        );
    }

    return (
        <>
            <h2 className="mb-3">Carrito de compras</h2>
            <Card className="shadow-sm">
                <Card.Body>
                    <CartTable items={cart} onChangeQuantity={changeQuantity} onRemove={removeFromCart} />
                </Card.Body>
                <Card.Footer className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <h4 className="mb-0">Total: {formatPrice(cartTotal)}</h4>
                    <div className="d-flex gap-2">
                        <Button variant="secondary" onClick={clearCart}>
                            Vaciar carrito
                        </Button>
                        <Button as={Link} to="/checkout" variant="verde">
                            Comprar ahora
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </>
    );
}

export default Cart;
