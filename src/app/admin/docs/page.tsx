// Halaman daftar dokumen di admin panel
// CRUD operations untuk dokumen

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search, Edit, Trash2, Eye } from "lucide-react";

// Sample documents data
const sampleDocuments = [
  {
    id: "1",
    title: "Perkenalan SIAKADKU",
    slug: "intro",
    category: "Pengenalan",
    status: "Published",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Instalasi",
    slug: "installation",
    category: "Pengenalan",
    status: "Published",
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Konfigurasi",
    slug: "configuration",
    category: "Pengenalan",
    status: "Draft",
    updatedAt: "2024-01-10",
  },
  {
    id: "4",
    title: "Login & Akses",
    slug: "login",
    category: "Panduan",
    status: "Published",
    updatedAt: "2024-01-08",
  },
  {
    id: "5",
    title: "Dashboard",
    slug: "dashboard",
    category: "Panduan",
    status: "Published",
    updatedAt: "2024-01-05",
  },
];

export default function AdminDocsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter documents based on search
  const filteredDocs = sampleDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dokumen</h1>
          <p className="text-muted-foreground">
            Kelola dokumentasi SIAKADKU
          </p>
        </div>
        <Link href="/admin/docs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Dokumen Baru
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari dokumen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Dokumen</CardTitle>
          <CardDescription>
            {filteredDocs.length} dokumen ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diupdate</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell className="text-muted-foreground">
                    /{doc.slug}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === "Published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.updatedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/docs/${doc.slug}`} className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/docs/${doc.id}/edit`} className="flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
