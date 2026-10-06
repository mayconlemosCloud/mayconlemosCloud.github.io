import type { NextConfig } from 'next';

// Export estático para o GitHub Pages: `next build` gera HTML puro em out/.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
