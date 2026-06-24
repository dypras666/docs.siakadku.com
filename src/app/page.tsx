// Halaman utama / landing page
// Redirect ke dokumentasi pertama atau tampilkan landing

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Moon, Sun } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b no-print">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl">Dokumentasi SIAKADKU</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Dokumentasi SIAKADKU
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Portal dokumentasi lengkap untuk Sistem Informasi AkademikKU.
            Temukan panduan, tutorial, dan referensi API di sini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs/intro">
              <Button size="lg" className="w-full sm:w-auto">
                Mulai Membaca
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Lihat Semua Dokumen
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SIAKADKU. Hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
}
