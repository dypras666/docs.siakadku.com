"use client";

// Sidebar komponen untuk navigasi dokumen
// Mobile responsive dengan overlay

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Struktur navigasi dokumen
const docsNavigation = [
  {
    title: "Pengenalan",
    items: [
      { title: "Perkenalan", href: "/docs/intro" },
      { title: "Instalasi", href: "/docs/installation" },
      { title: "Konfigurasi", href: "/docs/configuration" },
    ],
  },
  {
    title: "Panduan Pengguna",
    items: [
      { title: "Login & Akses", href: "/docs/login" },
      { title: "Dashboard", href: "/docs/dashboard" },
      { title: "Manajemen Mahasiswa", href: "/docs/students" },
      { title: "Manajemen Dosen", href: "/docs/lecturers" },
    ],
  },
  {
    title: "Akademik",
    items: [
      { title: "Kelola Kelas", href: "/docs/classes" },
      { title: "Input Nilai", href: "/docs/grades" },
      { title: "KRS & KHS", href: "/docs/krs-khs" },
    ],
  },
  {
    title: "Referensi API",
    items: [
      { title: "Autentikasi", href: "/docs/api-auth" },
      { title: "Endpoints", href: "/docs/api-endpoints" },
      { title: "Error Handling", href: "/docs/api-errors" },
    ],
  },
];

interface DocsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function DocsSidebar({ isOpen = true, onClose }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 ease-in-out md:static md:z-auto md:block md:w-64 md:border-r-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <span className="font-semibold">Navigasi</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Content */}
        <ScrollArea className="h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] py-4 custom-scrollbar">
          <nav className="px-2 space-y-6">
            {docsNavigation.map((section) => (
              <div key={section.title}>
                <h4 className="px-3 mb-2 text-sm font-semibold text-foreground">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
