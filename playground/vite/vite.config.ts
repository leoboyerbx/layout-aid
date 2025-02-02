import { defineConfig } from 'vite'
import layoutAid from 'vite-plugin-layoutaid'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        layoutAid({
            columns: {
                color: 'rgba(85, 189, 234, 0.6)',
                count: 14,
                persist: true,
            },
        }),
    ],
})
