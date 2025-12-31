import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Printer, Database, Tv, ExternalLink, Info, BookOpen, Download, CheckCircle, AlertCircle, ChevronRight, Settings, Wifi, Shield, Save, FileText, Phone, MapPin, Mail, HardDrive, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import SelfServiceMode from './SelfServiceMode';

export default function Pengaturan() {
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showUpdateCheck, setShowUpdateCheck] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showSelfService, setShowSelfService] = useState(false);
  const [selfServiceEnabled, setSelfServiceEnabled] = useState(false);

  const handleCheckUpdate = () => {
    setIsCheckingUpdate(true);
    setTimeout(() => {
      setIsCheckingUpdate(false);
      setUpdateAvailable(Math.random() > 0.5);
      toast.success('Pengecekan update selesai');
    }, 2000);
  };

  const handleOpenSelfService = () => {
    if (!selfServiceEnabled) {
      toast.error('Aktifkan Mode Self-Service terlebih dahulu');
      return;
    }
    setShowSelfService(true);
  };

  if (showSelfService) {
    return <SelfServiceMode onClose={() => setShowSelfService(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header dengan gradient dan background image */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1765294029562-510258233b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXR0aW5ncyUyMGdlYXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NzAyMzA1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Settings Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-cyan-900/50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <h2 className="text-white">Pengaturan Sistem</h2>
          </div>
          <p className="text-indigo-100">Konfigurasi sistem dan perangkat rental PlayStation</p>
        </div>
      </div>

      <Tabs defaultValue="printer" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-gradient-to-r from-gray-100 to-gray-200">
          <TabsTrigger 
            value="printer"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
          >
            <Printer className="w-4 h-4 mr-2" />
            Printer & Struk
          </TabsTrigger>
          <TabsTrigger 
            value="tv"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            <Tv className="w-4 h-4 mr-2" />
            Koneksi TV & PS
          </TabsTrigger>
          <TabsTrigger 
            value="backup"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
          >
            <Database className="w-4 h-4 mr-2" />
            Backup Database
          </TabsTrigger>
          <TabsTrigger 
            value="aplikasi"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            <Info className="w-4 h-4 mr-2" />
            Tentang Aplikasi
          </TabsTrigger>
        </TabsList>

        {/* TAB: PRINTER & STRUK */}
        <TabsContent value="printer" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                  <Printer className="w-5 h-5" />
                </div>
                Pengaturan Printer
              </CardTitle>
              <CardDescription>Konfigurasi printer untuk cetak struk transaksi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-green-600" />
                  Nama Printer
                </Label>
                <Input 
                  placeholder="Pilih printer yang tersedia" 
                  defaultValue="Thermal Printer POS-80"
                  className="border-green-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Ukuran Kertas
                </Label>
                <select className="w-full p-2 border-2 border-blue-200 rounded-md">
                  <option>80mm (Thermal)</option>
                  <option>58mm (Thermal)</option>
                  <option>A4</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div>
                  <p className="font-medium">Auto Print</p>
                  <p className="text-sm text-gray-600">Cetak otomatis setelah transaksi</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div>
                  <p className="font-medium">Print Logo Toko</p>
                  <p className="text-sm text-gray-600">Tampilkan logo di struk</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={() => toast.success('Pengaturan printer berhasil disimpan')} 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Pengaturan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                Pengaturan Struk
              </CardTitle>
              <CardDescription>Kustomisasi informasi yang ditampilkan di struk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-600" />
                  Nama Toko
                </Label>
                <Input 
                  defaultValue="Rental PlayStation Game Center"
                  className="border-purple-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Alamat
                </Label>
                <Input 
                  defaultValue="Jl. Gaming Street No. 123, Jakarta"
                  className="border-blue-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  No. Telepon
                </Label>
                <Input 
                  defaultValue="021-12345678"
                  className="border-green-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-600" />
                  Pesan Footer
                </Label>
                <Input 
                  defaultValue="Terima kasih atas kunjungan Anda!"
                  className="border-orange-200"
                />
              </div>

              <Button 
                onClick={() => toast.success('Pengaturan struk berhasil disimpan')} 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: KONEKSI TV & PS */}
        <TabsContent value="tv" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <Tv className="w-5 h-5" />
                </div>
                Koneksi Perangkat ke TV dan PS
              </CardTitle>
              <CardDescription>Kelola koneksi antar perangkat dan monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TV Area 1 */}
              <div className="relative p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-40 pointer-events-none"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                        <Tv className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">TV Area 1 - PS5 #1</p>
                        <p className="text-sm text-gray-600">Status: Terhubung</p>
                      </div>
                    </div>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Online
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-2 border-green-300 hover:bg-green-50"
                    onClick={() => toast.success('Koneksi TV Area 1 berhasil')}
                  >
                    Test Koneksi
                  </Button>
                </div>
              </div>

              {/* TV Area 2 */}
              <div className="relative p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-40 pointer-events-none"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg">
                        <Tv className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">TV Area 2 - PS5 #2</p>
                        <p className="text-sm text-gray-600">Status: Terhubung</p>
                      </div>
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Online
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-2 border-blue-300 hover:bg-blue-50"
                    onClick={() => toast.success('Koneksi TV Area 2 berhasil')}
                  >
                    Test Koneksi
                  </Button>
                </div>
              </div>

              {/* TV Area 3 */}
              <div className="relative p-5 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-gray-300 overflow-hidden">
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center text-white shadow-lg">
                        <Tv className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">TV Area 3 - PS4 #1</p>
                        <p className="text-sm text-gray-600">Status: Terputus</p>
                      </div>
                    </div>
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Offline
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => toast.info('Mencoba menghubungkan ulang...')}
                  >
                    Coba Hubungkan Ulang
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <Wifi className="w-5 h-5" />
                </div>
                Pengaturan Jaringan
              </CardTitle>
              <CardDescription>Konfigurasi koneksi Wi-Fi dan jaringan lokal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-purple-600" />
                  Nama Jaringan (SSID)
                </Label>
                <Input 
                  defaultValue="GameCenter_WiFi"
                  className="border-purple-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  IP Address Range
                </Label>
                <Input 
                  defaultValue="192.168.1.100 - 192.168.1.200"
                  className="border-blue-200"
                />
              </div>

              <Button 
                onClick={() => toast.success('Pengaturan jaringan berhasil disimpan')} 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: BACKUP DATABASE */}
        <TabsContent value="backup" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                  <Database className="w-5 h-5" />
                </div>
                Backup & Restore Database
              </CardTitle>
              <CardDescription>Kelola backup data untuk keamanan informasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200 rounded-full blur-2xl opacity-40 pointer-events-none"></div>
                <div className="relative flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-1">Backup Otomatis</p>
                    <p className="text-sm text-gray-600 mb-3">
                      Backup terakhir: 7 November 2024, 02:00 WIB
                    </p>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">Aktifkan backup harian otomatis</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => toast.success('Backup database dimulai...')}
                  className="h-20 flex-col gap-2 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                >
                  <Database className="w-6 h-6" />
                  Backup Sekarang
                </Button>
                <Button 
                  variant="outline"
                  className="h-20 flex-col gap-2 border-2 border-blue-300 hover:bg-blue-50"
                  onClick={() => toast.info('Pilih file backup untuk restore')}
                >
                  <HardDrive className="w-6 h-6" />
                  Restore Database
                </Button>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  Riwayat Backup
                </h3>
                <div className="space-y-2">
                  {[
                    { date: '7 November 2024', time: '02:00 WIB', file: 'backup_2024-11-07.sql', color: 'blue' },
                    { date: '6 November 2024', time: '02:00 WIB', file: 'backup_2024-11-06.sql', color: 'purple' },
                    { date: '5 November 2024', time: '02:00 WIB', file: 'backup_2024-11-05.sql', color: 'green' },
                  ].map((backup, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-4 bg-gradient-to-r rounded-xl border-2 ${
                        backup.color === 'blue' ? 'from-blue-50 to-cyan-50 border-blue-200' :
                        backup.color === 'purple' ? 'from-purple-50 to-pink-50 border-purple-200' :
                        'from-green-50 to-emerald-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md ${
                          backup.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                          backup.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                          'bg-gradient-to-br from-green-500 to-emerald-600'
                        }`}>
                          <Database className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{backup.file}</p>
                          <p className="text-sm text-gray-600">{backup.date}, {backup.time}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-2 border-gray-300"
                        onClick={() => toast.success(`Mengunduh ${backup.file}`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: TENTANG APLIKASI */}
        <TabsContent value="aplikasi" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <Info className="w-5 h-5" />
                </div>
                Tentang Aplikasi
              </CardTitle>
              <CardDescription>Informasi aplikasi dan versi sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-6 px-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Settings className="w-10 h-10 text-white" />
                </div>
                <h3>Rental PlayStation System</h3>
                <p className="text-gray-600 mb-2">Versi 1.0.0</p>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Lisensi Aktif
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <span className="font-medium">Versi Aplikasi</span>
                  <span className="text-blue-600 font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <span className="font-medium">Database Version</span>
                  <span className="text-green-600 font-medium">MySQL 8.0</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <span className="font-medium">Lisensi</span>
                  <span className="text-green-600 font-medium">✓ Aktif</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                  <span className="font-medium">Support</span>
                  <span className="text-orange-600 font-medium">support@rentalps.com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-300 hover:bg-blue-50"
                  onClick={() => setShowUserGuide(true)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Panduan Pengguna
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-purple-300 hover:bg-purple-50"
                  onClick={() => setShowUpdateCheck(true)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Cek Update
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <ExternalLink className="w-5 h-5" />
                </div>
                Window 2 (Self-Service Mode)
              </CardTitle>
              <CardDescription>Akses mode layanan mandiri untuk pelanggan</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Mode Self-Service</p>
                    <p className="text-sm text-gray-600">
                      Memungkinkan pelanggan untuk melakukan rental sendiri tanpa operator
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-13">
                  <Switch defaultChecked={selfServiceEnabled} onCheckedChange={setSelfServiceEnabled} />
                  <span className="text-sm font-medium">Aktifkan Mode Self-Service</span>
                </div>
              </div>
              
              <Button 
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                onClick={handleOpenSelfService}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Buka Window Self-Service
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog: Panduan Pengguna */}
      <Dialog open={showUserGuide} onOpenChange={setShowUserGuide}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Panduan Pengguna
            </DialogTitle>
            <DialogDescription>
              Panduan lengkap untuk menggunakan Rental PlayStation System
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span>Dashboard Utama</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Dashboard menampilkan ringkasan operasional bisnis rental PlayStation Anda:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 ml-4">
                      <li>• <strong>Statistik Harian:</strong> Lihat konsol tersedia, sedang dipakai, total pendapatan hari ini</li>
                      <li>• <strong>Quick Actions:</strong> Akses cepat ke fitur rental baru, daftar konsol, dan laporan harian</li>
                      <li>• <strong>Status Real-time:</strong> Monitor status semua konsol secara langsung</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span>Modul Transaksi</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Kelola semua transaksi rental dengan mudah:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 ml-4">
                      <li>• <strong>Pilih Konsol:</strong> Klik kotak konsol yang tersedia (hijau) untuk memulai rental</li>
                      <li>• <strong>Isi Data:</strong> Masukkan nama pelanggan dan pilih paket sewa</li>
                      <li>• <strong>Mulai Sewa:</strong> Sistem otomatis menghitung waktu dan biaya</li>
                      <li>• <strong>Perpanjang Sewa:</strong> Untuk konsol yang sedang disewa, klik untuk perpanjang</li>
                      <li>• <strong>Stop Sewa:</strong> Selesaikan transaksi dan cetak struk pembayaran</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span>Master Data</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Kelola data konsol, pelanggan, dan tarif:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 ml-4">
                      <li>• <strong>Data Konsol:</strong> Tambah, edit, atau hapus data konsol (PS4/PS5)</li>
                      <li>• <strong>Data Pelanggan:</strong> Kelola database pelanggan dan riwayat rental</li>
                      <li>• <strong>Tarif & Paket:</strong> Atur harga per jam dan paket bundle (2 jam, 3 jam, dll)</li>
                      <li>• <strong>Tombol Aksi:</strong> Gunakan ikon edit (pensil) dan hapus (tempat sampah) pada setiap baris</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span>Modul Laporan</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Analisis bisnis dan export data:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 ml-4">
                      <li>• <strong>Laporan Harian:</strong> Ringkasan transaksi dan pendapatan hari ini</li>
                      <li>• <strong>Laporan Periode:</strong> Analisis bulanan atau custom date range</li>
                      <li>• <strong>Grafik Analitik:</strong> Visualisasi data pendapatan dan penggunaan konsol</li>
                      <li>• <strong>Export Data:</strong> Unduh laporan dalam format Excel atau PDF</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span>Pengaturan Sistem</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Konfigurasi sistem dan perangkat:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 ml-4">
                      <li>• <strong>Printer & Struk:</strong> Setup printer thermal dan format struk</li>
                      <li>• <strong>Koneksi TV & PS:</strong> Monitor koneksi perangkat ke jaringan</li>
                      <li>• <strong>Backup Database:</strong> Backup otomatis dan manual untuk keamanan data</li>
                      <li>• <strong>Self-Service Mode:</strong> Aktifkan mode layanan mandiri untuk pelanggan</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span>Tips & Trik</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <ul className="text-sm text-gray-600 space-y-2 ml-4">
                      <li>• <strong>Shortcut Dashboard:</strong> Gunakan quick action cards untuk akses cepat</li>
                      <li>• <strong>Warna Status:</strong> Hijau = Tersedia, Biru = Sedang Disewa, Abu = Maintenance</li>
                      <li>• <strong>Auto-Save:</strong> Semua perubahan data tersimpan otomatis</li>
                      <li>• <strong>Backup Rutin:</strong> Aktifkan backup otomatis untuk mencegah kehilangan data</li>
                      <li>• <strong>Multi-Session:</strong> Bisa melayani beberapa pelanggan bersamaan</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span>FAQ (Pertanyaan Umum)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm mb-1"><strong>Q: Bagaimana cara menambah konsol baru?</strong></p>
                      <p className="text-sm text-gray-600 ml-4">A: Masuk ke Master Data → Data Konsol → Klik tombol "Tambah Konsol Baru"</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1"><strong>Q: Apa yang harus dilakukan jika printer tidak terdeteksi?</strong></p>
                      <p className="text-sm text-gray-600 ml-4">A: Cek koneksi USB/Bluetooth printer, pastikan driver terinstall, lalu refresh pada Pengaturan → Printer & Struk</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1"><strong>Q: Bagaimana cara export laporan?</strong></p>
                      <p className="text-sm text-gray-600 ml-4">A: Masuk ke Modul Laporan, pilih periode, lalu klik tombol "Export Excel" atau "Export PDF"</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1"><strong>Q: Apakah data aman jika listrik mati?</strong></p>
                      <p className="text-sm text-gray-600 ml-4">A: Ya, sistem memiliki auto-save dan backup otomatis. Data tersimpan secara real-time</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">
                <strong>Butuh bantuan lebih lanjut?</strong><br />
                Hubungi support kami di: <strong>support@rentalps.com</strong> atau WhatsApp: <strong>0812-3456-7890</strong>
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Dialog: Cek Update */}
      <Dialog open={showUpdateCheck} onOpenChange={setShowUpdateCheck}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Cek Update Aplikasi
            </DialogTitle>
            <DialogDescription>
              Periksa ketersediaan versi terbaru Rental PlayStation System
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {!isCheckingUpdate && !updateAvailable && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">Versi Saat Ini: 1.0.0</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Klik tombol di bawah untuk memeriksa update terbaru
                </p>
                <Button 
                  onClick={handleCheckUpdate} 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Periksa Update
                </Button>
              </div>
            )}

            {isCheckingUpdate && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Download className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="mb-2">Memeriksa Update...</h3>
                <p className="text-sm text-gray-600">
                  Mohon tunggu, sedang mengecek server untuk update terbaru
                </p>
              </div>
            )}

            {!isCheckingUpdate && updateAvailable && (
              <div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="mb-1">Update Tersedia!</h3>
                      <p className="text-sm text-gray-600">Versi 1.1.0 telah tersedia untuk diunduh</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="mb-2">Yang Baru di Versi 1.1.0:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Fitur notifikasi rental hampir habis</li>
                      <li>• Integrasi payment gateway untuk pembayaran digital</li>
                      <li>• Peningkatan kecepatan sistem</li>
                      <li>• Perbaikan bug minor</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Update
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}