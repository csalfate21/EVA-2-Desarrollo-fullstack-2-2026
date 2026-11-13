import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoreLayout from '../components/layout/StoreLayout';
import AdminLayout from '../components/layout/AdminLayout';

// vistas de la tienda
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Categories from '../pages/Categories';
import Offers from '../pages/Offers';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import PaymentSuccess from '../pages/PaymentSuccess';
import PaymentError from '../pages/PaymentError';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

// vistas del administrador
import Dashboard from '../pages/admin/Dashboard';
import Orders from '../pages/admin/Orders';
import OrderDetail from '../pages/admin/OrderDetail';
import ProductsAdmin from '../pages/admin/ProductsAdmin';
import ProductView from '../pages/admin/ProductView';
import ProductForm from '../pages/admin/ProductForm';
import CriticalProducts from '../pages/admin/CriticalProducts';
import CategoriesAdmin from '../pages/admin/CategoriesAdmin';
import CategoryForm from '../pages/admin/CategoryForm';
import UsersAdmin from '../pages/admin/UsersAdmin';
import UserView from '../pages/admin/UserView';
import UserForm from '../pages/admin/UserForm';
import Reports from '../pages/admin/Reports';
import Profile from '../pages/admin/Profile';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* tienda: todas usan el mismo navbar y footer */}
                <Route element={<StoreLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Products />} />
                    <Route path="/productos/:id" element={<ProductDetail />} />
                    <Route path="/categorias" element={<Categories />} />
                    <Route path="/categorias/:id" element={<Categories />} />
                    <Route path="/ofertas" element={<Offers />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/compra/exitosa/:id" element={<PaymentSuccess />} />
                    <Route path="/compra/error/:id" element={<PaymentError />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:id" element={<BlogDetail />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* panel de administrador: AdminLayout revisa que el usuario sea admin */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="ordenes" element={<Orders />} />
                    <Route path="ordenes/:id" element={<OrderDetail />} />
                    <Route path="productos" element={<ProductsAdmin />} />
                    <Route path="productos/nuevo" element={<ProductForm />} />
                    <Route path="productos/criticos" element={<CriticalProducts />} />
                    <Route path="productos/:id" element={<ProductView />} />
                    <Route path="productos/:id/editar" element={<ProductForm />} />
                    <Route path="categorias" element={<CategoriesAdmin />} />
                    <Route path="categorias/nueva" element={<CategoryForm />} />
                    <Route path="categorias/:id/editar" element={<CategoryForm />} />
                    <Route path="usuarios" element={<UsersAdmin />} />
                    <Route path="usuarios/nuevo" element={<UserForm />} />
                    <Route path="usuarios/:id" element={<UserView />} />
                    <Route path="usuarios/:id/editar" element={<UserForm />} />
                    <Route path="reportes" element={<Reports />} />
                    <Route path="perfil" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
