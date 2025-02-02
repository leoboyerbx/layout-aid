export default defineNuxtConfig({
    modules: ['../src/module'],
    devtools: { enabled: true },
    compatibilityDate: '2025-01-28',
    layoutAid: {
        columns: {
            count: 14,
        },
        outline: {
            color: 'red',
        },
    },

})
