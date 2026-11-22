import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    // GitHub Pages serves the site from /<repo>/
    base: mode === 'pages' ? '/blog-react-app/' : '/',
}));
