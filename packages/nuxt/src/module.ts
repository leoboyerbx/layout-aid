import type { LayoutaidConfig } from '@layoutaid/core'
import { addPlugin, createResolver, defineNuxtModule, updateRuntimeConfig } from '@nuxt/kit'

export default defineNuxtModule<LayoutaidConfig & { prod: boolean }>({
    meta: {
        name: 'layout-aid',
        configKey: 'layoutAid',
    },
    // Default configuration options of the Nuxt module
    defaults: {
        prod: false,
        columns: {},
        outline: {},
    },
    setup(config, _nuxt) {
        if (_nuxt.options.dev || config.prod) {
            const resolver = createResolver(import.meta.url)
            updateRuntimeConfig({
                public: {
                    layoutAidConfig: config,
                },
            })
            addPlugin({
                src: resolver.resolve('./runtime/plugin'),
                mode: 'client',
            })
        }
    },
})
