import { defineConfig } from 'vite'
import layoutaidColumns from 'vite-plugin-layoutaid-columns'
import layoutaidOutline from 'vite-plugin-layoutaid-outline'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        layoutaidColumns(),
        layoutaidOutline(),
    ],
})
