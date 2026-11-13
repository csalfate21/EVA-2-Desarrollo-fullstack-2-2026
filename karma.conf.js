// karma.conf.js

module.exports = function (config) {
    config.set({
       
        frameworks: ['jasmine', 'webpack'],

        files: [
            
            { pattern: 'src/**/*.test.js*', watched: false },
            
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
                random: false 
            },
            clearContext: false 
        },

        
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
