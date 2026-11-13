import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { BLOGS } from '../data/roots.mock';

function Blogs() {
    return (
        <>
            <h2 className="mb-3">Blogs</h2>
            <Row xs={1} md={2} className="g-4">
                {BLOGS.map(blog => (
                    <Col key={blog.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src={blog.imageUrl} alt={blog.title} style={{ height: '220px', objectFit: 'cover' }} />
                            <Card.Body>
                                <small className="text-muted">{blog.date}</small>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text>{blog.summary}</Card.Text>
                                <Button as={Link} to={`/blogs/${blog.id}`} variant="verde" size="sm">
                                    Leer más
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Blogs;
