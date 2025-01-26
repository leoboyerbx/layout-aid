import type { Plugin } from 'vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface LayoutaidOutlineConfig {
    count?: number
}

export function layoutaidColumns(config: LayoutaidOutlineConfig = { count: 14 }): Plugin {
    const { count = 14 } = config
    const hotVirtualModuleId = 'virtual:devtools-columns'
    const hotResolvedVirtualModuleId = `\0${hotVirtualModuleId}`
    let isDev = false

    return {
        name: 'vite-plugin-devtools-columns',
        configureServer() {
            isDev = true
        },
        resolveId(id: string) {
            if (id === hotVirtualModuleId) {
                return hotResolvedVirtualModuleId
            }
        },
        async load(id: string, context: any) {
            if (id === hotResolvedVirtualModuleId) {
                if (!isDev || context?.ssr) {
                    return ''
                }
                const source = await readFile(resolve(fileURLToPath(new URL('.', import.meta.url)), 'client.mjs'), 'utf-8')
                return source.replace('/* colsCount */', count.toString())
            }
        },
    }
}
