import type { Plugin, ResolvedConfig } from 'vite'
import { readFile } from 'node:fs/promises'
import defu from 'defu'

// eslint-disable-next-line ts/consistent-type-definitions
type CommonConfig = {
    /**
     * Whether to inject the plugin into the build. If false, you need to manually import it using `import 'virtual:layoutaid'` in your entry file.
     * @default true
     */
    inject?: boolean
    /**
     * Whether to enable the plugin in production.
     * @default false
     */
    prod?: boolean
}

/**
 *
 * @param pluginName
 */
export function createPlugin<TConfig>(pluginName: string, clientPath: string, defaultConfig: TConfig) {
    return function (pluginConfig: Partial<TConfig> & CommonConfig = {} as Partial<TConfig> & CommonConfig): Plugin {
        const {
            prod = false,
            inject = true,
        } = pluginConfig

        const hotVirtualModuleId = `virtual:${pluginName}`
        const hotResolvedVirtualModuleId = `\0${hotVirtualModuleId}`
        let isDev = false
        function shouldInject(): boolean {
            return inject && (isDev || prod)
        }
        let config: ResolvedConfig
        let mainEntry: string | undefined

        function findMainEntry(html: string): void {
            // Find main entry in html, excluding @vite/client
            const scriptMatch = html.match(/<script[^>]*type="module"[^>]*src="([^"]*)"[^>]*>/g)
            if (scriptMatch) {
                const mainScript = scriptMatch.find(script => !script.includes('@vite/client'))
                mainEntry = mainScript?.match(/src="([^"]*)"/)?.[1]
            }
        }

        return {
            name: `vite-plugin-${pluginName}`,
            config(config) {
                const configObject = defu(pluginConfig, defaultConfig as any)

                config.define = {
                    ...config.define,
                    __LAYOUTAID_CONFIG__: JSON.stringify(configObject),
                }

                return config
            },
            configResolved(resolvedConfig) {
                config = resolvedConfig
                isDev = config.command === 'serve'

                // Get the main entry point from index.html or config
                if (inject && config.build?.rollupOptions?.input) {
                    mainEntry = typeof config.build.rollupOptions.input === 'string'
                        ? config.build.rollupOptions.input
                        : Array.isArray(config.build.rollupOptions.input)
                            ? config.build.rollupOptions.input[0]
                            : Object.values(config.build.rollupOptions.input)[0]
                }
            },
            resolveId(id: string) {
                if (id === hotVirtualModuleId) {
                    return hotResolvedVirtualModuleId
                }
            },
            async load(id: string, context) {
                if (context?.ssr) {
                    return null
                }
                if (id === hotResolvedVirtualModuleId) {
                    return await readFile(clientPath, 'utf-8')
                }
            },
            transformIndexHtml(html) {
                if (inject && !mainEntry) {
                    findMainEntry(html)
                }
                return html
            },
            async transform(code: string, id: string) {
                if (!shouldInject()) {
                    return null
                }

                const normalizedId = id.split('?')[0]

                // If its the index.html, find the main entry
                if (normalizedId.endsWith('.html')) {
                    findMainEntry(code)
                }

                const isEntry = mainEntry && normalizedId.endsWith(mainEntry)
                if (!isEntry) {
                    return null
                }

                // Add config and import at the start of the file
                return {
                    code: `import '${hotVirtualModuleId}';\n${code}`,
                    map: null,
                }
            },
        }
    }
}

export type InferConfig<T extends ReturnType<typeof createPlugin>> = Required<NonNullable<Parameters<T>[0]>>
