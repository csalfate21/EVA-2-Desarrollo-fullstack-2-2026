import { useParams, Link } from 'react-router-dom';
import { BLOGS } from '../data/roots.mock';

function BlogDetail() {
    const { id } = useParams();
    const blog = BLOGS.find(b => b.id === Number(id));

    if (!blog) {
        return (
            <div className="text-center">
                <h2>Publicación no encontrada</h2>
                <Link to="/blogs">Volver a blogs</Link>
            </div>
        );
    }

    return (
        <article className="mx-auto" style={{ maxWidth: '760px' }}>
            <small className="text-muted">{blog.date}</small>
            <h1>{blog.title}</h1>
            <img src={blog.imageUrl} className="img-fluid rounded w-100 my-3" alt={blog.title} />
            {blog.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <Link to="/blogs">Volver a blogs</Link>
        </article>
    );
}

export default BlogDetail;
