// API Route untuk dokumen - GET list, POST create
// Baca dari JSON file di backend/data/docs.json

import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

interface Doc {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  description: string;
  tags?: string[];
  published?: boolean;
  order: number;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

const DATA_FILE = join(process.cwd(), "backend", "data", "docs.json");

function readDocs(): Doc[] {
  if (!existsSync(DATA_FILE)) return [];
  const raw = readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeDocs(docs: Doc[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(docs, null, 2), "utf-8");
}

function toApiFormat(doc: Doc) {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    description: doc.description || "",
    content: doc.content || "",
    status: doc.published !== undefined ? (doc.published ? "published" : "draft") : (doc.status || "published"),
    order: doc.order || 0,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

// GET - Ambil semua dokumen
export async function GET() {
  try {
    const docs = readDocs();
    const published = docs.filter(d => d.published !== false);
    return NextResponse.json({
      success: true,
      data: published.map(toApiFormat),
      total: published.length,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal membaca dokumen" }, { status: 500 });
  }
}

// POST - Buat dokumen baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const docs = readDocs();

    const newDoc: Doc = {
      id: `doc-${Date.now()}`,
      slug: body.slug,
      title: body.title,
      category: body.category || "Uncategorized",
      content: body.content || "",
      description: body.description || "",
      tags: body.tags || [],
      published: body.published !== undefined ? body.published : (body.status === "published"),
      order: body.order || docs.length + 1,
      status: body.status || "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    docs.push(newDoc);
    writeDocs(docs);

    return NextResponse.json({
      success: true,
      data: toApiFormat(newDoc),
      message: "Dokumen berhasil dibuat",
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Gagal membuat dokumen",
    }, { status: 400 });
  }
}
