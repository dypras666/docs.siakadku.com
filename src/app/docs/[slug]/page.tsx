// Halaman viewer dokumen berdasarkan slug
// Read JSON file directly via fs - tidak perlu HTTP fetch

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

interface Doc {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  order: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface DocsJSON {
  data: Doc[];
}

function getDocs(): Doc[] {
  const jsonPath = join(process.cwd(), "backend", "data", "docs.json");
  if (!existsSync(jsonPath)) return [];
  try {
    const raw = readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(raw);
    // Handle both plain array [] and {data: [...]} formats
    const arr = Array.isArray(parsed) ? parsed : (parsed.data || []);
    // No status field in JSON — treat all docs as published
    return arr.filter((d: Doc) => !d.status || d.status === "published");
  } catch {
    return [];
  }
}

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = params;
  const docs = getDocs();
  const doc = docs.find((d) => d.slug === slug);

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

  // Sort docs by category+order for prev/next navigation
  const sorted = [...docs].sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return (a.order || 0) - (b.order || 0);
  });
  const idx = sorted.findIndex((d) => d.slug === slug);
  const prevDoc = idx > 0 ? sorted[idx - 1] : null;
  const nextDoc = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  // Render content with markdown-like formatting
  const renderContent = (content: string | undefined): React.ReactNode[] => {
    if (!content) return [<p key={0} className="my-2 text-muted-foreground">Tidak ada konten.</p>];
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      if (!line) { i++; continue; }

      if (line.startsWith("# ")) {
        elements.push(<h1 key={key++} className="text-2xl font-bold mt-8 mb-4">{line.slice(2)}</h1>);
      } else if (line.startsWith("## ")) {
        elements.push(<h2 key={key++} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={key++} className="text-lg font-medium mt-4 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        const items: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
          items.push(lines[i].trim().slice(2));
          i++;
        }
        elements.push(
          <ul key={key++} className="list-disc pl-6 space-y-1 my-2">
            {items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
          </ul>
        );
        continue;
      } else if (/^\d+\. /.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\. /, ""));
          i++;
        }
        elements.push(
          <ol key={key++} className="list-decimal pl-6 space-y-1 my-2">
            {items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
          </ol>
        );
        continue;
      } else if (line.startsWith("```")) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={key++} className="bg-muted rounded p-4 overflow-x-auto my-3 text-sm">
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        i++;
      } else if (line.startsWith("|")) {
        // Table block
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          tableLines.push(lines[i].trim());
          i++;
        }
        elements.push(<TableRenderer key={key++} lines={tableLines} />);
        continue;
      } else {
        elements.push(<p key={key++} className="my-2 leading-relaxed">{renderInline(line)}</p>);
      }
      i++;
    }
    return elements;
  };

  function TableRenderer({ lines }: { lines: string[] }) {
    if (lines.length < 2) return null;
    const rows = lines.map((l) =>
      l.split("|").filter((c) => c.trim()).map((c) => c.trim())
    );
    const header = rows[0];
    const isSeparator = (row: string[]) =>
      row.every((c) => /^[-:]+$/.test(c));
    if (isSeparator(rows[1])) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="border-b bg-muted">
                {header.map((cell, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(2).map((row, ri) => (
                <tr key={ri} className="border-b">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  }

  function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g);
    // NOTE: re.split with capture groups returns undefined for unmatched groups — must filter
    return parts.filter(Boolean).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={i} className="bg-muted px-1 rounded text-sm">{part.slice(1, -1)}</code>;
      }
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return <Link key={i} href={linkMatch[2]} className="text-primary underline underline-offset-2">{linkMatch[1]}</Link>;
      }
      return part;
    });
  }

  return (
    <>
      <header className="mb-8 pb-8 border-b">
        <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
      </header>

      <div className="doc-content">
        {renderContent(doc.content)}
      </div>

      <footer className="mt-12 pt-8 border-t no-print">
        <div className="flex justify-between">
          {prevDoc ? (
            <Link href={`/docs/${prevDoc.slug}`}>
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                {prevDoc.title}
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {nextDoc && (
            <Link href={`/docs/${nextDoc.slug}`}>
              <Button variant="outline" className="gap-2">
                {nextDoc.title}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </footer>
    </>
  );
}
