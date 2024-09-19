import esbuild from 'esbuild';
import { honeybadgerSourceMapPlugin } from '@honeybadger-io/esbuild-plugin'

// See plugin params above
// const hbPluginOptions = {
//     apiKey: 'hbp_vgaqc8oVYwbVep79LFrcenDIVp3g763RbHXN',
//     assetsUrl: 'https://yoursite.foo',
//     revision: 'v1.0.0',
// }
const hbPluginOptions = {
    apiKey: process.env.HONEYBADGER_API_KEY,
    assetsUrl: process.env.HONEYBADGER_ASSETS_URL,
    revision: process.env.HONEYBADGER_REVISION,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
}

esbuild
    .build({
        entryPoints: ['src/app.tsx'],
        bundle: true,
        minify: true,
        format: 'cjs',
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
