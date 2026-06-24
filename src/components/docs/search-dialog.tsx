"use client";

// Search dialog/modal component
// Untuk pencarian dokumen

"use client";

import * as React from "react";
import { Search, FileText, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}

// Sample search results
const sampleResults: SearchResult[] = [
  { title: "Perkenalan SIAKADKU", slug: "intro", category: "Pengenalan", excerpt: "Kenali Sistem Informasi AkademikKU..." },
  { title: "Instalasi", slug: "installation", category: "Pengenalan", excerpt: "Panduan instalasi lengkap..." },
  { title: "Manajemen Mahasiswa", slug: "students", category: "Panduan", excerpt: "Kelola data mahasiswa..." },
  { title: "API Autentikasi", slug: "api-auth", category: "API", excerpt: "Autentikasi dan otorisasi..." },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);

  React.useEffect(() => {
    if (query.length > 0) {
      // Filter results based on query
      const filtered = sampleResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        {/* Search Input */}
        <div className="flex items-center border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input
            placeholder="Cari dokumentasi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-lg h-14"
            autoFocus
          />
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-accent rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <a
                  key={result.slug}
                  href={`/docs/${result.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-accent transition-colors"
                >
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{result.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.category} • {result.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              Tidak ada hasil untuk &quot;{query}&quot;
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Ketik untuk mencari dokumentasi...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-2 text-xs text-muted-foreground flex justify-between">
          <span>Tekan ESC untuk menutup</span>
          <span>{results.length} hasil</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
