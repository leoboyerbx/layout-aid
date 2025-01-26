import type { Plugin, ResolvedConfig } from 'vite'
import { readFile } from 'node:fs/promises'

export type PluginConfig = Record<string, string | number | boolean>

// eslint-disable-next-line ts/consistent-type-definitions
type CommonConfig = {
    prod?: boolean
    // Add other common config options here
}

/**
 *
 * @param pluginName
 */
export function createPlugin<TConfig extends PluginConfig>(pluginName: string, clientPath: string, defaultConfig: TConfig) {
    return function (pluginConfig: Partial<TConfig> & CommonConfig = {} as Partial<TConfig> & CommonConfig): Plugin {
        const {
            prod = false,
        } = pluginConfig

        const hotVirtualModuleId = `virtual:layoutaid-${pluginName}.js`
        const hotResolvedVirtualModuleId = `\0${hotVirtualModuleId}`
        let isDev = false
        function shouldInject(): boolean {
            return isDev || prod
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
            name: `vite-plugin-layoutaid-${pluginName}`,
            configResolved(resolvedConfig) {
                config = resolvedConfig
                isDev = config.command === 'serve'

                // Get the main entry point from index.html or config
                if (config.build?.rollupOptions?.input) {
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
            async load(id: string) {
                if (id === hotResolvedVirtualModuleId) {
                    const code = await readFile(clientPath, 'utf-8')
                    const configObject = Object.entries(defaultConfig).reduce((acc, [key, defaultValue]) => {
                        acc[key] = pluginConfig[key] ?? defaultValue
                        return acc
                    }, {} as Record<string, any>)

                    return `if (!window.layoutAidConfig) window.layoutAidConfig = {};\nwindow.layoutAidConfig["${pluginName}"] = ${JSON.stringify(configObject)};\n${code}`
                }
            },
            transformIndexHtml(html) {
                if (!mainEntry) {
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

                // Create a config object with all the values
                const configObject = Object.entries(defaultConfig).reduce((acc, [key, defaultValue]) => {
                    acc[key] = pluginConfig[key] ?? defaultValue
                    return acc
                }, {} as Record<string, any>)

                // Add config and import at the start of the file
                return {
                    code: `window.config = ${JSON.stringify(configObject)};\nimport '${hotVirtualModuleId}';\n${code}`,
                    map: null,
                }
            },
        }
    }
}

export type InferConfig<T extends ReturnType<typeof createPlugin>> = Required<NonNullable<Parameters<T>[0]>>
