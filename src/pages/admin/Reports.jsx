import { Row, Col, Card, Table, ProgressBar } from 'react-bootstrap';
import { getOrders, getProducts, getCategories } from '../../data/db';
import { formatPrice } from '../../utils/helpers';

function Reports() {
    const orders = getOrders();
    const products = getProducts();
    const categories = getCategories();

    const paid = orders.filter(o => o.status === 'Pagada');
    const rejected = orders.length - paid.length;
    const sales = paid.reduce((sum, o) => sum + o.total, 0);
    const average = paid.length > 0 ? Math.round(sales / paid.length) : 0;

    // unidades vendidas por producto, sumando todas las ordenes pagadas
    const sold = {};
    paid.forEach(o => {
        o.items.forEach(item => {
            sold[item.name] = (sold[item.name] || 0) + item.quantity;
        });
    });
    const topProducts = Object.entries(sold)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // ventas en pesos por categoria
    const byCategory = categories.map(c => {
        const total = paid.reduce((sum, o) => {
            const subtotal = o.items
                .filter(item => {
                    const product = products.find(p => p.id === item.id);
                    return product && product.category === c.name;
                })
                .reduce((s, item) => s + item.price * item.quantity, 0);
            return sum + subtotal;
        }, 0);
        return { name: c.name, total };
    });

    return (
        <>
            <h2 className="h3 mb-3">Reportes</h2>

            <Row xs={1} sm={2} lg={4} className="g-3 mb-4">
                <Col>
                    <Card body className="h-100">
                        <small className="text-muted">Ventas totales</small>
                        <p className="fs-4 fw-bold mb-0">{formatPrice(sales)}</p>
                    </Card>
                </Col>
                <Col>
                    <Card body className="h-100">
                        <small className="text-muted">Órdenes pagadas</small>
                        <p className="fs-4 fw-bold mb-0">{paid.length}</p>
                    </Card>
                </Col>
                <Col>
                    <Card body className="h-100">
                        <small className="text-muted">Pagos rechazados</small>
                        <p className="fs-4 fw-bold mb-0">{rejected}</p>
                    </Card>
                </Col>
                <Col>
                    <Card body className="h-100">
                        <small className="text-muted">Ticket promedio</small>
                        <p className="fs-4 fw-bold mb-0">{formatPrice(average)}</p>
                    </Card>
                </Col>
            </Row>

            <Row className="g-4">
                <Col lg={6}>
                    <h3 className="h5">Ventas por categoría</h3>
                    {byCategory.map(c => (
                        <div key={c.name} className="mb-3">
                            <div className="d-flex justify-content-between small">
                                <span>{c.name}</span>
                                <span>{formatPrice(c.total)}</span>
                            </div>
                            <ProgressBar variant="success" now={sales > 0 ? (c.total / sales) * 100 : 0} />
                        </div>
                    ))}
                </Col>
                <Col lg={6}>
                    <h3 className="h5">Productos más vendidos</h3>
                    {topProducts.length === 0 ? (
                        <p className="text-muted">Todavía no hay ventas.</p>
                    ) : (
                        <Table size="sm" className="bg-white">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Unidades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map(([name, units]) => (
                                    <tr key={name}>
                                        <td>{name}</td>
                                        <td>{units}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Reports;
