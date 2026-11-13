# Roots & Beans - Evaluación Parcial 2 (Frontend React)

Tienda online de café de especialidad y té orgánico de comercio justo. En esta entrega pasamos la página de la EP1 (HTML, CSS y JS) a React, agregamos las vistas nuevas de la tienda y el panel de administrador, y hicimos las pruebas unitarias con Jasmine y Karma.

El proyecto se hizo con **Create React App**, **React 19**, **React Bootstrap** y **React Router 7**, siguiendo la estructura del proyecto de ejemplo visto en clase.

## Integrantes

- Carlos Salfate - estructura del proyecto, rutas y Git
- [Integrante 2] - componentes y Bootstrap
- [Integrante 3] - pruebas con Jasmine y Karma

## Instalación

```bash
git clone [url del repositorio]
cd Evaluacion-Parcial-2
npm install
```

Ejecutar la tienda en modo desarrollo (se abre en http://localhost:3000):

```bash
npm start
```

Ejecutar las pruebas (abre Chrome con Karma y Jasmine):

```bash
npm test
```

Ejecutar las pruebas una sola vez y cerrar Chrome:

```bash
npm run test:once
```

Generar la versión de producción:

```bash
npm run build
```

## Usuarios de prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@duoc.cl | admin123 |
| Cliente | ana.rojas@gmail.com | cliente123 |

Los datos se guardan en el localStorage del navegador. Para volver a los datos iniciales hay que borrar el localStorage (F12 > Application > Local Storage > Clear).

## Estructura del proyecto

```
public/
├─ img/                      imágenes de los productos y logo
└─ video/                    video de la página Nosotros
src/
├─ app/
│  └─ routes.js              todas las rutas de la tienda y del admin
├─ components/
│  ├─ NavBar.jsx
│  ├─ Footer.jsx
│  ├─ layout/                StoreLayout (tienda) y AdminLayout (panel)
│  ├─ products/              ProductCard, ProductGrid y Filters (+ sus pruebas)
│  ├─ cart/                  CartTable (+ prueba)
│  ├─ orders/                OrderInfo
│  └─ admin/                 StatCard
├─ context/
│  └─ AppContext.js          carrito y sesión del usuario (useCart, useAuth)
├─ data/
│  ├─ roots.mock.js          datos iniciales (productos, categorías, usuarios, regiones, blogs)
│  └─ db.js                  base de datos simulada con CRUD y localStorage (+ prueba)
├─ pages/                    una página por vista de la tienda (+ sus pruebas)
│  └─ admin/                 vistas del panel de administrador
├─ utils/
│  └─ helpers.js             formato de precios, total del carrito y validación de correo (+ prueba)
├─ testUtils.js              mock de localStorage y render con contexto para las pruebas
├─ App.js
├─ App.css
├─ index.js
└─ index.css
karma.conf.js                configuración de Karma y Jasmine
```

## Vistas

**Tienda:** Inicio, Productos (buscador y filtro por categoría), Detalle de producto, Categorías, Ofertas, Carrito, Checkout, Compra exitosa, Pago con error, Registro, Iniciar sesión, Nosotros, Blogs, Detalle de blog y Contacto.

**Administrador (/admin):** Dashboard, Órdenes y boleta, Productos (nuevo, ver, editar, eliminar), Productos críticos, Categorías (nueva, editar, eliminar), Usuarios (nuevo, ver con historial de compras, editar, eliminar), Reportes y Perfil.

El pago es simulado: si el total de la compra pasa los $100.000 el banco lo rechaza y se muestra la página de pago con error.

## Pruebas unitarias

Las pruebas están al lado de cada componente y terminan en `.test.jsx` (o `.test.js`). Usamos Jasmine para escribirlas, Karma para correrlas en Chrome y Testing Library para renderizar los componentes y simular lo que hace el usuario.

- 35 pruebas en 12 archivos
- Mocks: `localStorage` simulado con `spyOn` y funciones falsas con `jasmine.createSpy`
- El reporte de cobertura queda en `coverage/index.html` después de correr las pruebas

## Ramas

- `main`: versión estable que se entrega
- `feature/react-base`: proyecto con Create React App, rutas, navbar, footer y contexto
- `feature/vistas-tienda`: páginas de la tienda, carrito y checkout
- `feature/admin`: panel de administrador
- `feature/pruebas`: configuración de Karma y pruebas unitarias
