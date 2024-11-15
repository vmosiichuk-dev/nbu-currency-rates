import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            '@components': '/src/components',
            '@layouts': '/src/layouts',
            '@pages': '/src/pages',
            '@routes': '/src/routes',
            '@theme': '/src/theme',
        },
    },
});
