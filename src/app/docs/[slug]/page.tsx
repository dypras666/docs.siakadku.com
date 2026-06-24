// Halaman viewer dokumen berdasarkan slug
// Menampilkan konten dokumen dengan format markdown/HTML

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample document data - dalam implementasi nyata dari API/database
const sampleDocs: Record<string, {
  title: string;
  description: string;
  content: React.ReactNode;
  prevDoc?: { title: string; slug: string };
  nextDoc?: { title: string; slug: string };
}> = {
  intro: {
    title: "Perkenalan SIAKADKU",
    description: "Kenali Sistem Informasi AkademikKU dan fitur-fiturnya",
    content: (
      <>
        <h1 id="overview">Perkenalan SIAKADKU</h1>
        <p className="lead">
          SIAKADKU adalah Sistem Informasi Akademik modern yang dirancang 
          untuk membantu pengelolaan data akademik di institusi pendidikan.
        </p>

        <h2 id="features">Fitur Utama</h2>
        <ul>
          <li><strong>Manajemen Mahasiswa</strong> - Kelola data mahasiswa lengkap dengan riwayat akademik</li>
          <li><strong>Manajemen Dosen</strong> - Informasi dosen dan jadwal mengajar</li>
          <li><strong>Kelola Kelas</strong> - Atur kelas, mata kuliah, dan jadwal</li>
          <li><strong>Input Nilai</strong> - Sistem penilaian yang fleksibel</li>
          <li><strong>KRS & KHS</strong> - Kartu Rencana Studi dan Kartu Hasil Studi</li>
          <li><strong>Dashboard Analitik</strong> - Visualisasi data akademik</li>
        </ul>

        <h2 id="installation">Instalasi</h2>
        <p>
          Untuk memulai menggunakan SIAKADKU, Anda perlu melakukan instalasi 
          terlebih dahulu. Berikut langkah-langkahnya:
        </p>

        <h3 id="requirements">Persyaratan Sistem</h3>
        <ul>
          <li>Node.js 18.x atau lebih tinggi</li>
          <li>PostgreSQL 14.x atau lebih tinggi</li>
          <li>Redis (opsional untuk caching)</li>
          <li>4GB RAM minimum</li>
        </ul>

        <h3 id="steps">Langkah Instalasi</h3>
        <pre><code>git clone https://github.com/siakadku/backend.git
cd backend
npm install
npm run db:migrate
npm run dev</code></pre>

        <h2 id="configuration">Konfigurasi</h2>
        <p>
          Setelah instalasi selesai, Anda perlu mengkonfigurasi beberapa 
          environment variable untuk menghubungkan dengan database dan 
          layanan lainnya.
        </p>

        <h2 id="next-steps">Langkah Selanjutnya</h2>
        <p>
          Setelah berhasil menginstal dan mengkonfigurasi SIAKADKU, 
          Anda dapat melanjutkan ke panduan berikut:
        </p>
        <ul>
          <li><Link href="/docs/login">Login & Akses</Link> - Cara masuk ke sistem</li>
          <li><Link href="/docs/dashboard">Dashboard</Link> - Mengenal interface utama</li>
        </ul>
      </>
    ),
    prevDoc: undefined,
    nextDoc: { title: "Instalasi", slug: "installation" },
  },
  installation: {
    title: "Instalasi",
    description: "Panduan lengkap instalasi SIAKADKU",
    content: (
      <>
        <h1>Instalasi SIAKADKU</h1>
        <p>
          Bagian ini akan membahas cara menginstal SIAKADKU secara lengkap, 
          mulai dari persyaratan sistem hingga langkah-langkah instalasi.
        </p>
        <h2>Clone Repository</h2>
        <pre><code>git clone https://github.com/siakadku/backend.git
cd backend</code></pre>
        <h2>Install Dependencies</h2>
        <pre><code>npm install</code></pre>
        <h2>Setup Database</h2>
        <pre><code>npm run db:migrate
npm run db:seed</code></pre>
        <h2>Jalankan Server</h2>
        <pre><code>npm run dev</code></pre>
      </>
    ),
    prevDoc: { title: "Perkenalan", slug: "intro" },
    nextDoc: { title: "Konfigurasi", slug: "configuration" },
  },
  configuration: {
    title: "Konfigurasi",
    description: "Pengaturan dan konfigurasi SIAKADKU",
    content: (
      <>
        <h1>Konfigurasi SIAKADKU</h1>
        <p>
          Dokumentasi konfigurasi akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Instalasi", slug: "installation" },
    nextDoc: { title: "Login & Akses", slug: "login" },
  },
  login: {
    title: "Login & Akses",
    description: "Cara login dan mengelola akses pengguna",
    content: (
      <>
        <h1>Login & Akses</h1>
        <p>
          Panduan login dan manajemen akses akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Konfigurasi", slug: "configuration" },
    nextDoc: { title: "Dashboard", slug: "dashboard" },
  },
  dashboard: {
    title: "Dashboard",
    description: "Mengenal interface dan fitur dashboard",
    content: (
      <>
        <h1>Dashboard</h1>
        <p>
          Dokumentasi dashboard akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Login & Akses", slug: "login" },
    nextDoc: { title: "Manajemen Mahasiswa", slug: "students" },
  },
  students: {
    title: "Manajemen Mahasiswa",
    description: "Kelola data mahasiswa",
    content: (
      <>
        <h1>Manajemen Mahasiswa</h1>
        <p>
          Dokumentasi manajemen mahasiswa akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Dashboard", slug: "dashboard" },
    nextDoc: { title: "Manajemen Dosen", slug: "lecturers" },
  },
  lecturers: {
    title: "Manajemen Dosen",
    description: "Kelola data dosen",
    content: (
      <>
        <h1>Manajemen Dosen</h1>
        <p>
          Dokumentasi manajemen dosen akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Manajemen Mahasiswa", slug: "students" },
    nextDoc: { title: "Kelola Kelas", slug: "classes" },
  },
  classes: {
    title: "Kelola Kelas",
    description: "Atur kelas dan mata kuliah",
    content: (
      <>
        <h1>Kelola Kelas</h1>
        <p>
          Dokumentasi pengelolaan kelas akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Manajemen Dosen", slug: "lecturers" },
    nextDoc: { title: "Input Nilai", slug: "grades" },
  },
  grades: {
    title: "Input Nilai",
    description: "Sistem penilaian dan input nilai",
    content: (
      <>
        <h1>Input Nilai</h1>
        <p>
          Dokumentasi input nilai akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Kelola Kelas", slug: "classes" },
    nextDoc: { title: "KRS & KHS", slug: "krs-khs" },
  },
  "krs-khs": {
    title: "KRS & KHS",
    description: "Kartu Rencana Studi dan Kartu Hasil Studi",
    content: (
      <>
        <h1>KRS & KHS</h1>
        <p>
          Dokumentasi KRS dan KHS akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Input Nilai", slug: "grades" },
    nextDoc: { title: "Autentikasi API", slug: "api-auth" },
  },
  "api-auth": {
    title: "Autentikasi API",
    description: "API autentikasi dan otorisasi",
    content: (
      <>
        <h1>Autentikasi API</h1>
        <p>
          Dokumentasi API autentikasi akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "KRS & KHS", slug: "krs-khs" },
    nextDoc: { title: "Endpoints", slug: "api-endpoints" },
  },
  "api-endpoints": {
    title: "Endpoints",
    description: "Daftar endpoint API",
    content: (
      <>
        <h1>Endpoints API</h1>
        <p>
          Dokumentasi endpoint API akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Autentikasi API", slug: "api-auth" },
    nextDoc: { title: "Error Handling", slug: "api-errors" },
  },
  "api-errors": {
    title: "Error Handling",
    description: "Penanganan error API",
    content: (
      <>
        <h1>Error Handling API</h1>
        <p>
          Dokumentasi penanganan error akan segera hadir.
        </p>
      </>
    ),
    prevDoc: { title: "Endpoints", slug: "api-endpoints" },
    nextDoc: undefined,
  },
};

interface PageProps {
  params: { slug: string };
}

// Generate static params untuk SSG
export async function generateStaticParams() {
  return Object.keys(sampleDocs).map((slug) => ({
    slug,
  }));
}

export default function DocPage({ params }: PageProps) {
  const { slug } = params;
  const doc = sampleDocs[slug];

  if (!doc) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Dokumen Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">
          Dokumen yang Anda cari tidak tersedia.
        </p>
        <Link href="/docs">
          <Button>Kembali ke Daftar Dokumen</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Document Header */}
      <header className="mb-8 pb-8 border-b">
        <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
      </header>

      {/* Document Content */}
      <div className="doc-content">
        {doc.content}
      </div>

      {/* Navigation Footer */}
      <footer className="mt-12 pt-8 border-t no-print">
        <div className="flex justify-between">
          {doc.prevDoc ? (
            <Link href={`/docs/${doc.prevDoc.slug}`}>
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                {doc.prevDoc.title}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          
          {doc.nextDoc && (
            <Link href={`/docs/${doc.nextDoc.slug}`}>
              <Button variant="outline" className="gap-2">
                {doc.nextDoc.title}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </footer>
    </>
  );
}
