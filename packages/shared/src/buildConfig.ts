/**
 * @returns the common build config for all plugins
 */
export function getPluginBuildConfig() {
    return {
        entries: ['src/index', 'src/client'],
        clean: true,
        declaration: true,
        externals: ['vite'],
        rollup: {
            emitCJS: true,
        },
    }
}
