import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (_nuxtApp) => {
    if (import.meta.client) {
        await import('virtual:layoutaid-outline')
    }
})
