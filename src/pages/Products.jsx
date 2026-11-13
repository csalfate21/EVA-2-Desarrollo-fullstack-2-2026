import { useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { getProducts, getCategories } from '../data/db';
import Filters from '../components/products/Filters';
import ProductGrid from '../components/products/ProductGrid';

export default function Products() {
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const products = useMemo(() => getProducts(), []);
    const categoryNames = useMemo(() => getCategories().map(c => c.name), []);

    // se filtra por categoria y por el texto del buscador
    const list = useMemo(() => {
        return products.filter(p => {
            const sameCategory = filter === 'all' || p.category === filter;
            const matchesText = p.name.toLowerCase().includes(search.trim().toLowerCase());
            return sameCategory && matchesText;
        });
    }, [products, filter, search]);

    return (
        <>
            <h2 className="mb-2">Catálogo de productos</h2>
            <p className="text-muted mb-3">Café, té y accesorios para preparar en casa</p>

            <Form.Control
                type="search"
                className="mb-3"
                placeholder="Buscar producto por nombre..."
                aria-label="Buscar producto"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <Filters current={filter} onChange={setFilter} options={categoryNames} total={products.length} />

            <ProductGrid items={list} onAdd={addToCart} />
        </>
    );
}
