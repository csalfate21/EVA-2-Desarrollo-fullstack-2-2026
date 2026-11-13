// karma.conf.js
// configuracion de Karma para correr las pruebas de Jasmine en el navegador
// como Karma no entiende JSX, cada prueba pasa primero por webpack + babel

module.exports = function (config) {
    config.set({
        // jasmine es el framework de pruebas (describe, it, expect)
        // webpack junta cada prueba con los componentes que importa
        frameworks: ['jasmine', 'webpack'],

        files: [
            // las pruebas estan al lado de cada componente y terminan en .test.js o .test.jsx
            { pattern: 'src/**/*.test.js*', watched: false },
            // imagenes de la carpeta public, asi no salen errores 404 al renderizar las tarjetas
            { pattern: 'public/img/*', included: false, served: true }
        ],

        proxies: {
            '/img/': '/base/public/img/'
        },

        preprocessors: {
            'src/**/*.test.js*': ['webpack']
        },

        webpack: {
            mode: 'development',
            devtool: 'inline-source-map',
            resolve: { extensions: ['.js', '.jsx'] },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: 'last 2 Chrome versions' }],
                                    ['@babel/preset-react', { runtime: 'automatic' }]
                                ],
                                // istanbul marca el codigo para medir la cobertura (no se miden las pruebas)
                                plugins: [['istanbul', { exclude: ['**/*.test.js', '**/*.test.jsx', 'src/testUtils.js'] }]]
                            }
                        }
                    }
                ]
            }
        },

        client: {
            jasmine: {
                random: false // las pruebas corren en el mismo orden en que estan escritas
            },
            clearContext: false // deja el reporte de Jasmine a la vista en el navegador
        },

        // progress: avance en la terminal, kjhtml: reporte de Jasmine en Chrome, coverage: cobertura
        reporters: ['progress', 'kjhtml', 'coverage'],

        coverageReporter: {
            dir: 'coverage',
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text' }, { type: 'text-summary' }]
        },

        browsers: ['Chrome'],
        singleRun: false
    });
};
