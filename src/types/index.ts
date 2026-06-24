// Tipe data untuk dokumen

export interface Doc {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tipe data untuk TOC (Table of Contents)
export interface TOCItem {
  id: string;
  text: string;
  level: number;
  children?: TOCItem[];
}

// Tipe data untuk kategori dokumen
export interface DocCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  order: number;
}
