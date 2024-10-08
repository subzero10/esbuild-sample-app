const esbuild = require('esbuild')
const { honeybadgerSourceMapPlugin } = require('@honeybadger-io/esbuild-plugin');

// See plugin params above
// const hbPluginOptions = {
//     apiKey: 'hbp_vgaqc8oVYwbVep79LFrcenDIVp3g763RbHXN',
//     assetsUrl: 'https://yoursite.foo',
//     revision: 'v1.0.0',
// }

const hbPluginOptions = {
    endpoint: 'https://eu-api.honeybadger.io/v1/source_maps',
    deployEndpoint: 'https://eu-api.honeybadger.io/v1/deploys',
    apiKey: process.env.HONEYBADGER_API_KEY || 'hbp_vgaqc8oVYwbVep79LFrcenDIVp3g763RbHXN',
    assetsUrl: process.env.HONEYBADGER_ASSETS_URL || 'https://esbuild-sample-app.vercel.app',
    revision: process.env.HONEYBADGER_REVISION || 'v1.0.0',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'production',
    silent: false,
}

console.log(hbPluginOptions);

esbuild
    .build({
        entryPoints: ['src/index.tsx'],
        bundle: true,
        minify: true,
        format: 'cjs',
        loader: {
            '.js': 'jsx',
            '.tsx': 'jsx',
            '.png': 'dataurl',
            '.svg': 'dataurl'
        },
        sourcemap: true,
        outfile: 'dist/index.js',
        define: {
            'process.env.HONEYBADGER_API_KEY': `'${process.env.HONEYBADGER_API_KEY}'`,
            'process.env.HONEYBADGER_ASSETS_URL': `'${process.env.HONEYBADGER_ASSETS_URL}'`,
            'process.env.HONEYBADGER_REVISION': `'${process.env.HONEYBADGER_REVISION}'`,
            'process.env.VERCEL_ENV': `'${process.env.VERCEL_ENV}'`,
        },
        plugins: [honeybadgerSourceMapPlugin(hbPluginOptions)]
    })
    .then(() => {
        console.log('Build complete')
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    });
