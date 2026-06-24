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
};

export default nextConfig;
