// Layout utama aplikasi
// Menggunakan Theme Provider untuk dark/light mode

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// Metadata untuk SEO
export const metadata: Metadata = {
  title: "Dokumentasi SIAKADKU",
  description: "Portal dokumentasi lengkap Sistem Informasi AkademikKU (SIAKADKU)",
  keywords: ["SIAKADKU", "dokumentasi", "akademik", "sistem informasi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider untuk dark/light mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
