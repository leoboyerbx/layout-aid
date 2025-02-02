import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['src/index', 'src/client'],
    clean: true,
    declaration: true,
    externals: ['vite', 'unbuild'],
    failOnWarn: false,
    rollup: {
        emitCJS: true,
        inlineDependencies: true,
    },
})
