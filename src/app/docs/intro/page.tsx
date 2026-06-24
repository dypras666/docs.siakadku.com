// Halaman Perkenalan — menampilkan semua flow docs di atas
import Link from "next/link";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

interface Doc {
  slug: string;
  title: string;
  category: string;
  description: string;
  order: number;
}

export const dynamic = "force-dynamic";

function getDocs(): Doc[] {
  const jsonPath = join(process.cwd(), "backend", "data", "docs.json");
  if (!existsSync(jsonPath)) return [];
  try {
    const raw = readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) ? parsed : (parsed.data || []);
    return arr.filter((d: any) => !d.status || d.status === "published");
  } catch {
    return [];
  }
}

export default async function IntroPage() {
  const allDocs = getDocs();
  const flowDocs = allDocs.filter((d) => d.category === "Flow");
  const otherDocs = allDocs.filter((d) => d.category !== "Flow");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Perkenalan SIAKADKU</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Dokumentasi lengkap untuk memahami alur data dan fitur utama Sistem Informasi AkademikKU.
        </p>
      </div>

      {/* Flow Docs — Hero Section */}
      {flowDocs.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">Alur Data</span>
            <span className="text-sm font-normal text-muted-foreground">
              Visualisasi lengkap alur kerja sistem
            </span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {flowDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group block p-6 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary">
                  {doc.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {doc.description || `Lihat alur ${doc.title}`}
                </p>
                <span className="text-xs text-primary mt-3 block">Baca selengkapnya →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Other Docs */}
      {otherDocs.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Dokumentasi Lainnya</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {otherDocs.slice(0, 6).map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group block p-5 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {doc.category}
                    </span>
                    <h3 className="font-medium mt-1 group-hover:text-primary">
                      {doc.title}
                    </h3>
                    {doc.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {doc.description}
                      </p>
                    )}
                  </div>
                  <span className="text-primary text-sm shrink-0 ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>
          {otherDocs.length > 6 && (
            <div className="mt-4 text-center">
              <Link
                href="/docs"
                className="text-sm text-primary hover:underline"
              >
                Lihat semua {otherDocs.length} dokumen →
              </Link>
            </div>
          )}
        </div>
      )}

      {allDocs.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Belum ada dokumentasi tersedia.
        </p>
      )}
    </div>
  );
}
