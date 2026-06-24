// API Route untuk dokumen - GET list, POST create
// Dalam implementasi nyata, terhubung ke database

import { NextResponse } from "next/server";

// Sample data - dalam implementasi nyata dari database
let documents = [
  {
    id: "1",
    title: "Perkenalan SIAKADKU",
    slug: "intro",
    description: "Kenali Sistem Informasi AkademikKU",
    content: "# Perkenalan\n\nSIAKADKU adalah...",
    category: "Pengenalan",
    status: "published",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Instalasi",
    slug: "installation",
    description: "Panduan instalasi SIAKADKU",
    content: "# Instalasi\n\nLangkah-langkah instalasi...",
    category: "Pengenalan",
    status: "published",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET - Ambil semua dokumen
export async function GET() {
  return NextResponse.json({
    success: true,
    data: documents,
    total: documents.length,
  });
}

// POST - Buat dokumen baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newDoc = {
      id: Date.now().toString(),
      title: body.title,
      slug: body.slug,
      description: body.description || "",
      content: body.content || "",
      category: body.category || "Uncategorized",
      status: body.status || "draft",
      order: body.order || documents.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    documents.push(newDoc);

    return NextResponse.json({
      success: true,
      data: newDoc,
      message: "Dokumen berhasil dibuat",
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Gagal membuat dokumen",
    }, { status: 400 });
  }
}
