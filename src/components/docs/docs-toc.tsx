"use client";

// Table of Contents (TOC) komponen
// Menampilkan heading dari dokumen saat ini

"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// Sample TOC - dalam implementasi nyata, ini akan di-generate dari konten
const sampleTOC: TOCItem[] = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "features", text: "Fitur Utama", level: 2 },
  { id: "installation", text: "Instalasi", level: 2 },
  { id: "requirements", text: "Persyaratan Sistem", level: 3 },
  { id: "steps", text: "Langkah Instalasi", level: 3 },
  { id: "configuration", text: "Konfigurasi", level: 2 },
  { id: "next-steps", text: "Langkah Selanjutnya", level: 2 },
];

interface DocsTOCProps {
  className?: string;
}

export function DocsTOC({ className }: DocsTOCProps) {
  return (
    <aside
      className={cn(
        "hidden xl:block w-64 shrink-0 no-print",
        className
      )}
    >
      <div className="sticky top-20">
        <h4 className="mb-4 text-sm font-semibold">On This Page</h4>
        <ScrollArea className="h-[calc(100vh-10rem)] custom-scrollbar">
          <nav className="space-y-2">
            {sampleTOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm text-muted-foreground hover:text-foreground transition-colors",
                  item.level === 3 && "pl-4",
                  item.level === 4 && "pl-8"
                )}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
