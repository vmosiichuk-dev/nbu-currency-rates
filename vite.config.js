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
            '@api': '/src/services/api',
            '@assets': '/src/assets',
            '@components': '/src/components',
            '@constants': '/src/constants',
            '@email': '/src/services/email',
            '@hooks': '/src/hooks',
            '@layouts': '/src/layouts',
            '@pages': '/src/pages',
            '@routes': '/src/routes',
            '@slices': '/src/store/slices',
            '@store': '/src/store',
            '@theme': '/src/theme',
            '@UI': '/src/components/UI',
            '@utils': '/src/utils',
        },
    },
});
