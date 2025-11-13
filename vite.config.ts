import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ← вот это нужно добавить
import { fileURLToPath } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'

// Получаем путь к текущей папке
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [
        react(), 
        tsconfigPaths()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@core": path.resolve(__dirname, "../frontend-core/src")
        },
    },
    server: {
        host: '0.0.0.0',
        allowedHosts: [
            'dash.workswap.org'
        ],
        port: 30008,
        proxy: {
            "/proxy": {
                target: "https://api.workswap.org",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    define: {
        global: 'window'
    },
    preview: {
        port: 30008
    }
})