"use client";

// Sidebar komponen untuk navigasi dokumen
// Fetch dari API secara dinamis

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

// Group Flow docs INTO Pengenalan section
const CATEGORY_ORDER = ["Pengenalan", "Flow", "Panduan Pengguna", "Akademik", "Referensi API"];

export function DocsSidebar({ isOpen = true, onClose }: DocsSidebarProps) {
  const pathname = usePathname();
  const [navigation, setNavigation] = useState<NavSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/docs")
      .then((r) => r.json())
      .then((res) => {
        const docs = res.data || [];
        const grouped: Record<string, NavItem[]> = {};
        for (const doc of docs) {
          const cat = doc.category || "Lainnya";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push({ title: doc.title, href: `/docs/${doc.slug}` });
        }
        const ordered: NavSection[] = CATEGORY_ORDER
          .filter((c) => grouped[c]?.length)
          .map((cat) => ({ title: cat, items: grouped[cat] }));
        // Append any remaining categories not in the order list
        for (const cat of Object.keys(grouped).sort()) {
          if (!CATEGORY_ORDER.includes(cat)) {
            ordered.push({ title: cat, items: grouped[cat] });
          }
        }
        setNavigation(ordered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 ease-in-out md:static md:z-auto md:block md:w-64 md:border-r-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <span className="font-semibold">Navigasi</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] py-4 custom-scrollbar">
          {loading ? (
            <div className="px-6 space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-muted rounded animate-pulse mb-1" />
              ))}
            </div>
          ) : (
            <nav className="px-2 space-y-6">
              {navigation.map((section) => (
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
          )}
        </ScrollArea>
      </aside>
    </>
  );
}

interface DocsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}
