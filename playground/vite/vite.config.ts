import { defineConfig } from 'vite'
import layoutaidColumns from 'vite-plugin-layoutaid-columns'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        layoutaidColumns({
            count: 14,
        }),
    ],
})
