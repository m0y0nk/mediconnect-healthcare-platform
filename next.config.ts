import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  // === GitHub Pages Config (Added) ===
  // 1. Tell Next.js to build a static site
  output: 'export',
  
  // 2. Set the base path to your repository name
  basePath: '/mediconnect-healthcare-platform',

  images: {
    // Your existing remote patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // === GitHub Pages Config (Added) ===
    // 3. Disable image optimization (not supported on static hosts)
    unoptimized: true,
  },
  
  // === Your Existing Config (Untouched) ===
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;
// Orchids restart: 1762244209798