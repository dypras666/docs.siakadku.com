// Halaman kategori di admin panel
// CRUD untuk kategori dokumen

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample categories
const sampleCategories = [
  { id: "1", name: "Pengenalan", slug: "pengenalan", order: 1, docCount: 5 },
  { id: "2", name: "Panduan Pengguna", slug: "panduan", order: 2, docCount: 8 },
  { id: "3", name: "Akademik", slug: "akademik", order: 3, docCount: 6 },
  { id: "4", name: "Referensi API", slug: "api", order: 4, docCount: 4 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(sampleCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });

  const handleAddCategory = () => {
    if (!newCategory.name) return;

    const slug = newCategory.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const category = {
      id: Date.now().toString(),
      name: newCategory.name,
      slug,
      order: categories.length + 1,
      docCount: 0,
    };

    setCategories([...categories, category]);
    setNewCategory({ name: "", slug: "" });
    setIsAdding(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Kategori</h1>
          <p className="text-muted-foreground">
            Kelola kategori dokumentasi
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Kategori Baru
        </Button>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kategori</CardTitle>
          <CardDescription>
            {categories.length} kategori ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      /{category.slug} • {category.docCount} dokumen
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Category Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Kategori Baru</CardTitle>
            <CardDescription>
              Tambahkan kategori baru untuk dokumen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Nama Kategori</Label>
              <Input
                id="categoryName"
                placeholder="Contoh: Panduan Developer"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorySlug">Slug</Label>
              <Input
                id="categorySlug"
                placeholder="auto-generated-from-name"
                value={
                  newCategory.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "") || newCategory.slug
                }
                onChange={(e) =>
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddCategory}>Simpan</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
