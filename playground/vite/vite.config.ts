import { defineConfig } from 'vite'
import layoutAid from 'vite-plugin-layoutaid'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        layoutAid({
            prod: true,
        }),
    ],
})
