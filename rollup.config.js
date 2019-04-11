import {terser} from 'rollup-plugin-terser'

const output = (file, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'triangulation',
        file,
        format: 'umd',
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/triangulation.js', []),
    output('./dist/triangulation.min.js', [terser()])
]