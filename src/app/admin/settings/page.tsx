// Halaman pengaturan admin

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground">
          Konfigurasi sistem dokumentasi
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Umum</CardTitle>
          <CardDescription>
            Pengaturan umum dokumentasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Nama Situs</Label>
            <Input
              id="siteName"
              defaultValue="Dokumentasi SIAKADKU"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Deskripsi</Label>
            <Input
              id="siteDescription"
              defaultValue="Portal dokumentasi lengkap SIAKADKU"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              defaultValue="https://docs.siakadku.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Tampilan</CardTitle>
          <CardDescription>
            Pengaturan tampilan dan tema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tema Default</Label>
              <p className="text-sm text-muted-foreground">
                Pilih tema default untuk pengguna baru
              </p>
            </div>
            <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sidebar Tersimpan</Label>
              <p className="text-sm text-muted-foreground">
                Simpan status sidebar di browser
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>TOC Otomatis</Label>
              <p className="text-sm text-muted-foreground">
                Tampilkan TOC berdasarkan heading
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
          <CardDescription>
            Pengaturan optimasi mesin pencari
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              defaultValue="Dokumentasi SIAKADKU"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Input
              id="metaDescription"
              defaultValue="Portal dokumentasi lengkap Sistem Informasi AkademikKU"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ogImage">OG Image URL</Label>
            <Input
              id="ogImage"
              defaultValue="https://docs.siakadku.com/og-image.png"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Simpan Pengaturan</Button>
      </div>
    </div>
  );
}
