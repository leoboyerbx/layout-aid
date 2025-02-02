import { addPlugin, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import OutlinePlugin from 'vite-plugin-layoutaid-outline'

// Module options TypeScript interface definition
type OutlinePluginOpton = Omit<NonNullable<Parameters<typeof OutlinePlugin>[0]>, 'inject'>
export interface ModuleOptions {
    outline: false | OutlinePluginOpton
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'layout-aid',
        configKey: 'layoutAid',
    },
    // Default configuration options of the Nuxt module
    defaults: {
        outline: {},
    },
    setup(_options, _nuxt) {
        extendViteConfig((config) => {
            if (_options.outline) {
                config.plugins?.push(OutlinePlugin({ ..._options.outline, inject: true }))
                console.log('OutlinePlugin added')
            }
        }, {
            server: false,
            client: true,
            dev: true,
            build: false,
            prepend: true,
        })
        const resolver = createResolver(import.meta.url)
        addPlugin(resolver.resolve('./runtime/plugin'))
    },
})
