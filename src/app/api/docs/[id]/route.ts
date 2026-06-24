// API Route untuk dokumen spesifik - GET, PUT, DELETE by ID

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
];

// Helper function untuk cari dokumen
function findDoc(id: string) {
  return documents.find((doc) => doc.id === id);
}

// GET - Ambil dokumen by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const doc = findDoc(params.id);

  if (!doc) {
    return NextResponse.json({
      success: false,
      error: "Dokumen tidak ditemukan",
    }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: doc,
  });
}

// PUT - Update dokumen by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docIndex = documents.findIndex((doc) => doc.id === params.id);

    if (docIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Dokumen tidak ditemukan",
      }, { status: 404 });
    }

    const body = await request.json();
    
    documents[docIndex] = {
      ...documents[docIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: documents[docIndex],
      message: "Dokumen berhasil diperbarui",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Gagal memperbarui dokumen",
    }, { status: 400 });
  }
}

// DELETE - Hapus dokumen by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const docIndex = documents.findIndex((doc) => doc.id === params.id);

  if (docIndex === -1) {
    return NextResponse.json({
      success: false,
      error: "Dokumen tidak ditemukan",
    }, { status: 404 });
  }

  documents = documents.filter((doc) => doc.id !== params.id);

  return NextResponse.json({
    success: true,
    message: "Dokumen berhasil dihapus",
  });
}
