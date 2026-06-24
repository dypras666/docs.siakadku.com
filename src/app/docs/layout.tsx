// Layout untuk halaman dokumentasi
// Includes: header, sidebar, TOC, responsive design

"use client";

import { useState } from "react";
import { DocsHeader } from "@/components/layout/docs-header";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsTOC } from "@/components/docs/docs-toc";
import { PrintButton } from "@/components/docs/docs-content";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <DocsHeader
        isMenuOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <DocsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="container mx-auto px-4 py-8">
            <div className="flex gap-8">
              {/* Article Content */}
              <article className="flex-1 min-w-0 max-w-3xl">
                {/* Actions Bar */}
                <div className="flex justify-end mb-6 no-print">
                  <PrintButton />
                </div>

                {/* Document Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {children}
                </div>
              </article>

              {/* Table of Contents */}
              <DocsTOC />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
