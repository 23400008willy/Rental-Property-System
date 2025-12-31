import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Search, Clock, CheckCircle, XCircle, QrCode, Banknote, Gamepad2, User, Phone, DollarSign, Zap, Timer, PlayCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ModulTransaksiProps {
  activeTab: 'new' | 'console' | 'duration' | 'active';
  onTabChange: (tab: 'new' | 'console' | 'duration' | 'active') => void;
}

export default function ModulTransaksi({ activeTab, onTabChange }: ModulTransaksiProps) {
  const [selectedConsole, setSelectedConsole] = useState('');
  const [duration, setDuration] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'qris' | null>(null);

  const consoles = [
    { id: 'ps5-1', name: 'PS5 #1', type: 'PlayStation 5', booth: 'Bilik 1', status: 'tersedia', price: 20000 },
    { id: 'ps5-2', name: 'PS5 #2', type: 'PlayStation 5', booth: 'Bilik 2', status: 'tersedia', price: 20000 },
    { id: 'ps5-3', name: 'PS5 #3', type: 'PlayStation 5', booth: 'Bilik 3', status: 'disewa', price: 20000 },
    { id: 'ps4-1', name: 'PS4 #1', type: 'PlayStation 4', booth: 'Bilik 4', status: 'tersedia', price: 15000 },
    { id: 'ps4-2', name: 'PS4 #2', type: 'PlayStation 4', booth: 'Bilik 5', status: 'disewa', price: 15000 },
    { id: 'ps4-3', name: 'PS4 #3', type: 'PlayStation 4', booth: 'Bilik 6', status: 'tersedia', price: 15000 },
  ];

  const activeTransactions = [
    { id: 1, console: 'PS5 #3', consoleType: 'PlayStation 5', booth: 'Bilik 3', customer: 'Ahmad Ridwan', start: '14:00', duration: '2 Jam', remaining: '45 menit' },
    { id: 2, console: 'PS4 #2', consoleType: 'PlayStation 4', booth: 'Bilik 5', customer: 'Siti Nurhaliza', start: '13:30', duration: '3 Jam', remaining: '2 jam 15 menit' },
  ];

  const handleStartTransaction = () => {
    if (!selectedConsole || !duration || !customerName) {
      toast.error('Mohon lengkapi semua data');
      return;
    }
    toast.success('Transaksi berhasil dimulai!');
    setSelectedConsole('');
    setDuration('');
    setCustomerName('');
  };

  const handleConsoleClick = (console: typeof consoles[0]) => {
    if (console.status === 'disewa') {
      onTabChange('duration');
    } else {
      setSelectedConsole(console.id);
      onTabChange('new');
    }
  };

  const handlePaymentMethod = (method: 'cash' | 'qris') => {
    setSelectedPaymentMethod(method);
    setShowPaymentConfirm(true);
  };

  const handlePaymentConfirm = () => {
    if (selectedPaymentMethod === 'cash') {
      toast.success('Pembayaran tunai berhasil dikonfirmasi!');
      setShowPaymentConfirm(false);
      setSelectedPaymentMethod(null);
    } else if (selectedPaymentMethod === 'qris') {
      toast.success('Kode QR ditampilkan di layar pelanggan');
      // Simulasi komunikasi dengan layar pelanggan
      setTimeout(() => {
        toast.success('Pembayaran QRIS berhasil!');
        setShowPaymentConfirm(false);
        setSelectedPaymentMethod(null);
      }, 3000);
    }
  };

  const handleAddDuration = (transactionId: number) => {
    toast.success('Durasi berhasil ditambahkan!');
    // Simulasi update ke ESP32
    toast.info('Timer diperbarui ke konsol pelanggan');
  };

  const handleFinishTransaction = (transactionId: number) => {
    toast.success('Transaksi selesai!');
    // Simulasi update ke ESP32
    toast.info('Konsol dinonaktifkan secara otomatis');
  };

  const handleUpdateTimer = (transactionId: number) => {
    toast.success('Timer diperbarui ke konsol!');
    // Simulasi komunikasi IoT ESP32
    toast.info('Perintah dikirim ke ESP32');
  };

  return (
    <div className="space-y-6">
      {/* Header dengan gradient dan background image */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1563277267-0e9f2dabb9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzY2OTMxMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Gaming Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-900/50"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h2 className="text-white">Modul Transaksi</h2>
          </div>
          <p className="text-indigo-100">Kelola transaksi rental PlayStation dengan mudah</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as typeof activeTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-gradient-to-r from-gray-100 to-gray-200">
          <TabsTrigger 
            value="new" 
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Transaksi Baru
          </TabsTrigger>
          <TabsTrigger 
            value="console"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Pilih Konsol
          </TabsTrigger>
          <TabsTrigger 
            value="duration"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
          >
            <Clock className="w-4 h-4 mr-2" />
            Durasi & Pembayaran
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Transaksi Aktif
          </TabsTrigger>
        </TabsList>

        {/* TAB: TRANSAKSI BARU */}
        <TabsContent value="new" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <Plus className="w-5 h-5" />
                </div>
                Quick Start - Transaksi Baru
              </CardTitle>
              <CardDescription>Mulai transaksi rental dengan cepat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Nama Pelanggan
                  </Label>
                  <Input
                    id="customer"
                    placeholder="Masukkan nama pelanggan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-600" />
                    No. Telepon (Opsional)
                  </Label>
                  <Input
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="console-select" className="flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-green-600" />
                    Pilih Konsol
                  </Label>
                  <Select value={selectedConsole} onValueChange={setSelectedConsole}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue placeholder="Pilih konsol yang tersedia" />
                    </SelectTrigger>
                    <SelectContent>
                      {consoles
                        .filter(c => c.status === 'tersedia')
                        .map(console => (
                          <SelectItem key={console.id} value={console.id}>
                            {console.name} - Rp {console.price.toLocaleString('id-ID')}/jam
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration-select" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    Durasi Sewa
                  </Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="border-orange-200 focus:border-orange-400">
                      <SelectValue placeholder="Pilih durasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Jam</SelectItem>
                      <SelectItem value="2">2 Jam</SelectItem>
                      <SelectItem value="3">3 Jam</SelectItem>
                      <SelectItem value="4">4 Jam</SelectItem>
                      <SelectItem value="5">5 Jam</SelectItem>
                      <SelectItem value="custom">Durasi Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedConsole && duration && (
                <div className="relative p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-200 shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-2xl opacity-30"></div>
                  <div className="relative flex justify-between items-center">
                    <div>
                      <p className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span>Total Biaya</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        {consoles.find(c => c.id === selectedConsole)?.name} - {duration} Jam
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 text-4xl">
                        Rp {(
                          (consoles.find(c => c.id === selectedConsole)?.price || 0) * 
                          parseInt(duration || '0')
                        ).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleStartTransaction} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg h-12"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Mulai Transaksi
                </Button>
                <Button variant="outline" className="border-2">
                  Kembali ke Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: PILIH KONSOL */}
        <TabsContent value="console">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                Pilih Konsol
              </CardTitle>
              <CardDescription>Klik konsol untuk memulai transaksi baru atau tambah durasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {consoles.map((console, index) => (
                  <div
                    key={console.id}
                    onClick={() => handleConsoleClick(console)}
                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-2xl hover:scale-105 overflow-hidden ${
                      console.status === 'tersedia'
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 hover:border-green-400'
                        : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300 hover:border-orange-400'
                    }`}
                  >
                    {/* Decorative circles */}
                    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl ${
                      console.status === 'tersedia' ? 'bg-green-200' : 'bg-orange-200'
                    } opacity-40`}></div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Gamepad2 className={`w-5 h-5 ${console.status === 'tersedia' ? 'text-green-600' : 'text-orange-600'}`} />
                            <h3>{console.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{console.booth}</p>
                          <p className="text-sm text-gray-600">{console.type}</p>
                        </div>
                        {console.status === 'tersedia' ? (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-orange-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Rp {console.price.toLocaleString('id-ID')}/jam
                        </p>
                        <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                          console.status === 'tersedia'
                            ? 'bg-green-600 text-white'
                            : 'bg-orange-500 text-white'
                        }`}>
                          {console.status === 'tersedia' ? 'Tersedia' : 'Sedang Disewa'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: DURASI & PEMBAYARAN */}
        <TabsContent value="duration">
          <div className="space-y-4">
            {/* Tambah Durasi */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white">
                    <Timer className="w-5 h-5" />
                  </div>
                  Tambah Durasi Sewa
                </CardTitle>
                <CardDescription>Perpanjang waktu sewa untuk transaksi yang sedang berjalan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-orange-600" />
                        Pilih Transaksi
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Pilih transaksi aktif" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeTransactions.map((transaction) => (
                            <SelectItem key={transaction.id} value={transaction.id.toString()}>
                              {transaction.console} - {transaction.customer}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        Tambah Durasi
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Tambah jam" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">+1 Jam</SelectItem>
                          <SelectItem value="2">+2 Jam</SelectItem>
                          <SelectItem value="3">+3 Jam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Durasi
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metode Pembayaran */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  Metode Pembayaran
                </CardTitle>
                <CardDescription>Pilih metode pembayaran untuk transaksi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={selectedPaymentMethod === 'cash' ? 'default' : 'outline'}
                    className={`h-32 flex-col gap-3 transition-all hover:scale-105 ${
                      selectedPaymentMethod === 'cash' 
                        ? 'bg-gradient-to-br from-green-600 to-emerald-600 shadow-xl' 
                        : 'border-2 hover:border-green-400 hover:bg-green-50'
                    }`}
                    onClick={() => handlePaymentMethod('cash')}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedPaymentMethod === 'cash' ? 'bg-white/20' : 'bg-green-100'
                    }`}>
                      <Banknote className={`w-8 h-8 ${selectedPaymentMethod === 'cash' ? 'text-white' : 'text-green-600'}`} />
                    </div>
                    <span className="text-lg">Tunai / Cash</span>
                  </Button>
                  
                  <Button 
                    variant={selectedPaymentMethod === 'qris' ? 'default' : 'outline'}
                    className={`h-32 flex-col gap-3 transition-all hover:scale-105 ${
                      selectedPaymentMethod === 'qris' 
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl' 
                        : 'border-2 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                    onClick={() => handlePaymentMethod('qris')}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedPaymentMethod === 'qris' ? 'bg-white/20' : 'bg-purple-100'
                    }`}>
                      <QrCode className={`w-8 h-8 ${selectedPaymentMethod === 'qris' ? 'text-white' : 'text-purple-600'}`} />
                    </div>
                    <span className="text-lg">QRIS</span>
                  </Button>
                </div>

                {showPaymentConfirm && (
                  <div className={`relative p-6 rounded-xl border-2 overflow-hidden ${
                    selectedPaymentMethod === 'cash' 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' 
                      : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                  }`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-50"></div>
                    <div className="relative">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedPaymentMethod === 'cash' ? 'bg-green-600' : 'bg-purple-600'
                          } text-white`}>
                            {selectedPaymentMethod === 'cash' ? <Banknote className="w-6 h-6" /> : <QrCode className="w-6 h-6" />}
                          </div>
                          <div>
                            <p className="font-medium">
                              {selectedPaymentMethod === 'cash' 
                                ? 'Konfirmasi Pembayaran Tunai' 
                                : 'QR Code Ditampilkan di Layar Pelanggan'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedPaymentMethod === 'cash'
                                ? 'Pastikan uang telah diterima sebelum konfirmasi'
                                : 'Pelanggan sedang melakukan scan QRIS di layar monitor'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          onClick={handlePaymentConfirm}
                          className={`${
                            selectedPaymentMethod === 'cash' 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-purple-600 hover:bg-purple-700'
                          }`}
                        >
                          {selectedPaymentMethod === 'cash' ? 'Konfirmasi' : 'Menunggu...'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB: TRANSAKSI AKTIF */}
        <TabsContent value="active">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                  <PlayCircle className="w-5 h-5" />
                </div>
                Transaksi Aktif
              </CardTitle>
              <CardDescription>Monitor dan kelola transaksi yang sedang berjalan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Cari nama pelanggan atau konsol..." className="pl-10 border-green-200" />
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {activeTransactions.map((transaction, index) => (
                  <div 
                    key={transaction.id} 
                    className={`relative p-6 rounded-xl border-2 overflow-hidden transition-all hover:shadow-xl ${
                      index === 0 
                        ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300' 
                        : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                    }`}
                  >
                    {/* Decorative background */}
                    <div className={`absolute -bottom-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-20 ${
                      index === 0 ? 'bg-blue-300' : 'bg-purple-300'
                    }`}></div>
                    
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            index === 0 ? 'bg-blue-600' : 'bg-purple-600'
                          } text-white shadow-lg`}>
                            <Gamepad2 className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className="mb-1">{transaction.console} ({transaction.booth})</h3>
                            <p className="text-sm text-gray-600">{transaction.consoleType}</p>
                            <p className="text-gray-700 flex items-center gap-1 mt-1">
                              <User className="w-4 h-4" />
                              {transaction.customer}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className={`w-4 h-4 ${index === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                          <span className={`${index === 0 ? 'bg-blue-600' : 'bg-purple-600'} text-white text-sm px-4 py-1.5 rounded-full font-medium`}>
                            Aktif
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Waktu Mulai</p>
                          <p className="font-medium">{transaction.start}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Durasi Awal</p>
                          <p className="font-medium">{transaction.duration}</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-xs text-orange-600 mb-1">Waktu Tersisa</p>
                          <p className="font-medium text-orange-600 flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            {transaction.remaining}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-2 hover:bg-orange-50 hover:border-orange-400"
                          onClick={() => {
                            handleAddDuration(transaction.id);
                            onTabChange('duration');
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Tambah Durasi
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-2 hover:bg-green-50 hover:border-green-400"
                          onClick={() => handleFinishTransaction(transaction.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Selesaikan
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-2 hover:bg-blue-50 hover:border-blue-400"
                          onClick={() => handleUpdateTimer(transaction.id)}
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Update Timer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}