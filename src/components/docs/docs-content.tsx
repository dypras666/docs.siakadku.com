"use client";

// Tombol Print untuk export PDF
// Menggunakan window.print() dengan CSS print styles

"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="no-print gap-2"
    >
      <Printer className="h-4 w-4" />
      <span className="hidden sm:inline">Cetak / PDF</span>
    </Button>
  );
}
