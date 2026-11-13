// src/data/roots.mock.js
// datos iniciales de la tienda, se copian a localStorage la primera vez que se abre la pagina

export const CATEGORIES = [
    { id: 1, name: 'Café', description: 'Granos de especialidad de cooperativas de comercio justo.', imageUrl: '/img/cafe-etiopia.jpg' },
    { id: 2, name: 'Té', description: 'Té orgánico a granel para preparar en casa o en la oficina.', imageUrl: '/img/te-sencha.jpg' },
    { id: 3, name: 'Accesorios', description: 'Termos y kits para preparar café a mano.', imageUrl: '/img/kit-pour-over.jpg' }
];

export const PRODUCTS = [
    {
        id: 1,
        name: 'Café Etiopía',
        category: 'Café',
        price: 12000,
        offerPrice: null,
        stock: 20,
        criticalStock: 5,
        imageUrl: '/img/cafe-etiopia.jpg',
        description: 'Café de altura con notas florales y cítricas. Bolsa compostable de 250 g.'
    },
    {
        id: 2,
        name: 'Café Huila',
        category: 'Café',
        price: 11000,
        offerPrice: null,
        stock: 15,
        criticalStock: 5,
        imageUrl: '/img/cafe-huila.jpg',
        description: 'Café colombiano de cuerpo medio con notas a caramelo. Bolsa compostable de 250 g.'
    },
    {
        id: 3,
        name: 'Café Perú',
        category: 'Café',
        price: 11500,
        offerPrice: 9900,
        stock: 12,
        criticalStock: 5,
        imageUrl: '/img/cafe-peru.jpg',
        description: 'Café orgánico de cooperativas de Cajamarca con notas a chocolate. Bolsa compostable de 500 g.'
    },
    {
        id: 4,
        name: 'Té Sencha',
        category: 'Té',
        price: 8000,
        offerPrice: null,
        stock: 18,
        criticalStock: 5,
        imageUrl: '/img/te-sencha.jpg',
        description: 'Té verde japonés orgánico, suave y fresco. 100 g a granel.'
    },
    {
        id: 5,
        name: 'Té Chai',
        category: 'Té',
        price: 8500,
        offerPrice: 6900,
        stock: 10,
        criticalStock: 4,
        imageUrl: '/img/te-chai.jpg',
        description: 'Té negro con canela, jengibre y cardamomo. 100 g a granel.'
    },
    {
        id: 6,
        name: 'Prensa Francesa',
        category: 'Accesorios',
        price: 15000,
        offerPrice: null,
        stock: 6,
        criticalStock: 3,
        imageUrl: '/img/prensa-francesa.jpg',
        description: 'Prensa francesa de vidrio de 600 ml para preparar café en casa.'
    },
    {
        id: 7,
        name: 'Kit Pour Over',
        category: 'Accesorios',
        price: 18000,
        offerPrice: null,
        stock: 3,
        criticalStock: 3,
        imageUrl: '/img/kit-pour-over.jpg',
        description: 'Cafetera de goteo con filtros reutilizables para preparar café a mano.'
    },
    {
        id: 8,
        name: 'Termo',
        category: 'Accesorios',
        price: 9000,
        offerPrice: 7500,
        stock: 25,
        criticalStock: 5,
        imageUrl: '/img/termo.jpg',
        description: 'Termo reutilizable de acero de 500 ml, mantiene el café caliente por 8 horas.'
    }
];

// usuarios de prueba (las claves quedan a la vista porque es solo para la evaluacion)
export const USERS = [
    {
        id: 1,
        name: 'Admin',
        lastName: 'Roots & Beans',
        email: 'admin@duoc.cl',
        password: 'admin123',
        role: 'admin',
        region: 'Región Metropolitana',
        commune: 'Santiago',
        address: 'Av. Providencia 1234'
    },
    {
        id: 2,
        name: 'Ana',
        lastName: 'Rojas',
        email: 'ana.rojas@gmail.com',
        password: 'cliente123',
        role: 'cliente',
        region: 'Región Metropolitana',
        commune: 'Ñuñoa',
        address: 'Los Crisantemos 450, depto 302'
    }
];

// dos compras de ejemplo para que el panel de administrador no parta vacio
const anaCustomer = {
    name: 'Ana',
    lastName: 'Rojas',
    email: 'ana.rojas@gmail.com',
    street: 'Los Crisantemos 450',
    apartment: '302',
    region: 'Región Metropolitana',
    commune: 'Ñuñoa',
    notes: ''
};

export const ORDERS = [
    {
        id: 1,
        number: 1001,
        date: '03-11-2026',
        customer: anaCustomer,
        items: [
            { id: 1, name: 'Café Etiopía', price: 12000, imageUrl: '/img/cafe-etiopia.jpg', quantity: 2 },
            { id: 8, name: 'Termo', price: 7500, imageUrl: '/img/termo.jpg', quantity: 1 }
        ],
        total: 31500,
        status: 'Pagada'
    },
    {
        id: 2,
        number: 1002,
        date: '08-11-2026',
        customer: anaCustomer,
        items: [
            { id: 5, name: 'Té Chai', price: 6900, imageUrl: '/img/te-chai.jpg', quantity: 3 },
            { id: 6, name: 'Prensa Francesa', price: 15000, imageUrl: '/img/prensa-francesa.jpg', quantity: 1 }
        ],
        total: 35700,
        status: 'Pagada'
    }
];

export const REGIONS = {
    'Región Metropolitana': ['Santiago', 'Providencia', 'Ñuñoa', 'Las Condes', 'Lo Barnechea', 'Maipú', 'Puente Alto'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
    'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán']
};

export const BLOGS = [
    {
        id: 1,
        title: 'Cómo preparar café en prensa francesa',
        date: '02-11-2026',
        imageUrl: '/img/prensa-francesa.jpg',
        summary: 'Una guía rápida para sacarle el máximo sabor a tu café en casa.',
        content: [
            'La prensa francesa es una de las formas más fáciles de preparar café de especialidad. Solo necesitas café molido grueso, agua caliente y unos minutos.',
            'Usa 15 gramos de café por cada 250 ml de agua. El agua tiene que estar entre 92 y 96 grados, o sea, unos segundos después de que hierva.',
            'Deja reposar 4 minutos, baja el émbolo lento y sirve de inmediato para que el café no se amargue.'
        ]
    },
    {
        id: 2,
        title: '¿Por qué elegimos comercio justo?',
        date: '05-11-2026',
        imageUrl: '/img/banner.jpg',
        summary: 'Te contamos de dónde viene nuestro café y por qué nos importa.',
        content: [
            'Todo nuestro café y té viene de cooperativas de pequeños productores que reciben un precio justo por su cosecha.',
            'Eso les permite invertir en sus comunidades y cultivar de forma orgánica, sin químicos que dañen la tierra.',
            'Además usamos empaques compostables, así que cuando terminas tu bolsa de café la puedes echar al compost.'
        ]
    }
];
