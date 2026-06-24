// Halaman daftar semua dokumen
// Redirect ke intro atau tampilkan list dokumen

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight } from "lucide-react";

// Sample data - dalam implementasi nyata dari API/database
const docsCategories = [
  {
    title: "Pengenalan",
    description: "Kenali SIAKADKU dan mulai menggunakan sistem",
    docs: [
      { title: "Perkenalan", slug: "intro" },
      { title: "Instalasi", slug: "installation" },
      { title: "Konfigurasi", slug: "configuration" },
    ],
  },
  {
    title: "Panduan Pengguna",
    description: "Pelajari cara menggunakan fitur-fitur utama",
    docs: [
      { title: "Login & Akses", slug: "login" },
      { title: "Dashboard", slug: "dashboard" },
      { title: "Manajemen Mahasiswa", slug: "students" },
      { title: "Manajemen Dosen", slug: "lecturers" },
    ],
  },
  {
    title: "Akademik",
    description: "Kelola data akademik dan nilai",
    docs: [
      { title: "Kelola Kelas", slug: "classes" },
      { title: "Input Nilai", slug: "grades" },
      { title: "KRS & KHS", slug: "krs-khs" },
    ],
  },
  {
    title: "Referensi API",
    description: "Dokumentasi API untuk integrasi",
    docs: [
      { title: "Autentikasi API", slug: "api-auth" },
      { title: "Endpoints", slug: "api-endpoints" },
      { title: "Error Handling", slug: "api-errors" },
    ],
  },
];

export default function DocsIndexPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dokumentasi SIAKADKU</h1>
        <p className="text-muted-foreground">
          Pilih kategori di bawah ini untuk mulai membaca dokumentasi
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {docsCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.docs.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
