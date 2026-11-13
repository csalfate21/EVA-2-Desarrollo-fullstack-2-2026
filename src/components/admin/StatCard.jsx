import { Card } from 'react-bootstrap';

// tarjeta de resumen del dashboard, el color llega por props
export default function StatCard({ title, value, detail, variant }) {
    return (
        <Card bg={variant} text={variant === 'warning' ? 'dark' : 'white'} className="h-100">
            <Card.Body>
                <Card.Subtitle className="mb-1">{title}</Card.Subtitle>
                <p className="display-6 fw-bold mb-1">{value}</p>
                <small>{detail}</small>
            </Card.Body>
        </Card>
    );
}
