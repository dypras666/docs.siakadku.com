// Halaman dashboard admin
// Overview statistik dan aksi cepat

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderOpen, Users, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  // Sample statistics - dalam implementasi nyata dari API
  const stats = [
    {
      title: "Total Dokumen",
      value: "24",
      description: "Dokumen aktif",
      icon: FileText,
    },
    {
      title: "Kategori",
      value: "4",
      description: "Kategori dokumen",
      icon: FolderOpen,
    },
    {
      title: "Total Views",
      value: "1,234",
      description: "Pengunjung bulan ini",
      icon: TrendingUp,
    },
    {
      title: "Pengguna",
      value: "156",
      description: "Pengguna terdaftar",
      icon: Users,
    },
  ];

  // Recent documents - sample data
  const recentDocs = [
    { title: "Perkenalan SIAKADKU", category: "Pengenalan", updatedAt: "2 jam lalu" },
    { title: "Instalasi", category: "Pengenalan", updatedAt: "1 hari lalu" },
    { title: "Manajemen Mahasiswa", category: "Panduan", updatedAt: "3 hari lalu" },
    { title: "API Autentikasi", category: "API", updatedAt: "1 minggu lalu" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview sistem dokumentasi SIAKADKU
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Dokumen Terbaru</CardTitle>
            <CardDescription>
              Dokumen yang baru diperbarui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocs.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.category}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {doc.updatedAt}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>
              shortcut untuk操作 umum
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <a
              href="/admin/docs/new"
              className="block p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <FileText className="h-5 w-5 mb-2" />
              <p className="font-medium">Buat Dokumen Baru</p>
              <p className="text-sm text-muted-foreground">
                Tambahkan dokumentasi baru
              </p>
            </a>
            <a
              href="/admin/categories"
              className="block p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <FolderOpen className="h-5 w-5 mb-2" />
              <p className="font-medium">Kelola Kategori</p>
              <p className="text-sm text-muted-foreground">
                Atur struktur kategori dokumen
              </p>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
