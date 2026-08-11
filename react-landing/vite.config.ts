import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(rootDir, 'src');
const laravelPublic = path.resolve(rootDir, '../public');

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

/** Serve Laravel `public/assets/*` during Vite dev (no PHP required). */
function serveLaravelAssets(): Plugin {
  return {
    name: 'serve-laravel-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/assets/')) {
          next();
          return;
        }

        const urlPath = req.url.split('?')[0] ?? '';
        const filePath = path.normalize(
          path.join(laravelPublic, decodeURIComponent(urlPath)),
        );

        if (
          !filePath.startsWith(laravelPublic) ||
          !fs.existsSync(filePath) ||
          !fs.statSync(filePath).isFile()
        ) {
          next();
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
        fs.createReadStream(filePath).pipe(res);
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), serveLaravelAssets()],
  // Production assets live under /react-landing/ (Laravel public).
  // Dev uses `/` so http://127.0.0.1:5173/ works without a subpath.
  base: command === 'build' ? '/react-landing/' : '/',
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
    fs: {
      allow: [rootDir, laravelPublic],
    },
  },
  build: {
    outDir: path.resolve(rootDir, '../public/react-landing'),
    // Avoid EPERM on Windows when Laravel/browser holds files in assets/.
    emptyOutDir: false,
  },
}));
