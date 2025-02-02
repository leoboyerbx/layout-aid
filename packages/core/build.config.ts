import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    clean: true,
    declaration: true,
    externals: ['vite', 'unbuild'],
    rollup: {
        emitCJS: true,
        inlineDependencies: true,
    },
})
