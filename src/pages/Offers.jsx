import ProductGrid from '../components/products/ProductGrid';
import { useCart } from '../context/AppContext';
import { getOffers } from '../data/db';

function Offers() {
    const { addToCart } = useCart();
    const offers = getOffers();

    return (
        <>
            <h2 className="mb-2">Ofertas</h2>
            <p className="text-muted mb-3">Productos con precio rebajado por tiempo limitado.</p>
            <ProductGrid items={offers} onAdd={addToCart} />
        </>
    );
}

export default Offers;
