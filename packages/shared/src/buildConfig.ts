import type { BuildConfig } from 'unbuild'

interface PluginBuildConfigOptions {
    hasClient?: boolean
    externals?: string[]
}

/**
 * @returns the common build config for all plugins
 */
export function getPluginBuildConfig(config: PluginBuildConfigOptions = {}): BuildConfig {
    const { hasClient = true } = config

    const entries = ['src/index']
    if (hasClient) {
        entries.push('src/client')
    }

    return {
        entries,
        clean: true,
        declaration: true,
        externals: ['vite', 'unbuild', ...(config.externals || [])],
        failOnWarn: false,
        rollup: {
            emitCJS: true,
            inlineDependencies: true,
        },
    }
}
