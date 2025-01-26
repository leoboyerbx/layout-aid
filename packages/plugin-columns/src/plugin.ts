import type { Plugin, ResolvedConfig } from 'vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface LayoutaidOutlineConfig {
    count?: number
    prod?: boolean
    color?: string
}

export function layoutaidColumns(pluginConfig: LayoutaidOutlineConfig = {}): Plugin {
    const {
        count = 14,
        prod = false,
        color = 'rgba(85, 189, 234, 0.6)',
    } = pluginConfig

    const hotVirtualModuleId = 'virtual:layoutaid-columns.js'
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
        name: 'vite-plugin-devtools-columns',
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
                const source = await readFile(resolve(fileURLToPath(new URL('.', import.meta.url)), 'client.mjs'), 'utf-8')
                return source
                    .replaceAll('/* __COLS_COUNT__ */', count.toString())
                    .replaceAll('/* __COLOR__ */', color)
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

            // Add import at the start of the file
            return {
                code: `import '${hotVirtualModuleId}';\n${code}`,
                map: null,
            }
        },
    }
}
