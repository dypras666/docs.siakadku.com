/** @type {import('next').NextConfig} */
// Konfigurasi Next.js untuk docs.siakadku.com
// Next.js 14 App Router configuration

const nextConfig = {
  // Mengaktifkan React Strict Mode untuk development
  reactStrictMode: true,
  
  // Konfigurasi untuk path aliases (@/*)
  experimental: {
    // Mengaktifkan Server Components
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },

  // Force no-cache for all pages to prevent stale static HTML
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'no-store, max-age=0' },
      ],
    },
  ],
};

export default nextConfig;
