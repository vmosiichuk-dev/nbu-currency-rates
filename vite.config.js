import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';

export default defineConfig({
    plugins: [
        react(),
        svgr({ icon: true }),
    ],
    resolve: {
        alias: {
            '@assets': '/src/assets',
            '@components': '/src/components',
            '@constants': '/src/constants',
            '@hooks': '/src/hooks',
            '@layouts': '/src/layouts',
            '@pages': '/src/pages',
            '@routes': '/src/routes',
            '@theme': '/src/theme',
        },
    },
});
