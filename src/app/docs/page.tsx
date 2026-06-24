// Halaman daftar semua dokumen
// Read JSON file directly via fs

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight } from "lucide-react";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

interface Doc {
  slug: string;
  title: string;
  category: string;
  description: string;
  order: number;
}

const CATEGORY_ORDER = ["Pengenalan", "Flow", "Panduan Pengguna", "Akademik", "Referensi API"];

export const dynamic = "force-dynamic";

function getDocs(): Doc[] {
  const jsonPath = join(process.cwd(), "backend", "data", "docs.json");
  if (!existsSync(jsonPath)) return [];
  try {
    const raw = readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(raw);
    // Handle both plain array [] and {data: [...]} formats
    const arr = Array.isArray(parsed) ? parsed : (parsed.data || []);
    // No status field in JSON — treat all docs as published
    return arr.filter((d: any) => !d.status || d.status === "published");
  } catch {
    return [];
  }
}

export default async function DocsIndexPage() {
  const docs = getDocs();

  // Group by category
  const grouped: Record<string, Doc[]> = {};
  for (const doc of docs) {
    const cat = doc.category || "Lainnya";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(doc);
  }

  // Sort within categories
  for (const cat in grouped) {
    grouped[cat].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  // Order categories
  const ordered = CATEGORY_ORDER
    .filter((c) => grouped[c]?.length)
    .map((c) => ({ title: c, docs: grouped[c] }));
  for (const cat of Object.keys(grouped).sort()) {
    if (!CATEGORY_ORDER.includes(cat)) {
      ordered.push({ title: cat, docs: grouped[cat] });
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dokumentasi SIAKADKU</h1>
        <p className="text-muted-foreground">
          Pilih kategori di bawah ini untuk mulai membaca dokumentasi
        </p>
      </div>

      {ordered.length === 0 ? (
        <p className="text-muted-foreground">Belum ada dokumentasi.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {ordered.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {category.title}
                </CardTitle>
                <CardDescription>
                  {category.docs.length} dokumen
                </CardDescription>
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
      )}
    </div>
  );
}
