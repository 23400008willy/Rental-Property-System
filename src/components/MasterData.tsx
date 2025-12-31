import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Edit, Trash2, Search, Gamepad2, Users, Tag, DollarSign, Clock, Package, Phone, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

type Console = {
  id: number;
  name: string;
  type: string;
  price: number;
  status: string;
};

type Customer = {
  id: number;
  name: string;
  phone: string;
  totalRentals: number;
};

type PackageType = {
  id: number;
  name: string;
  duration: number;
  price: number;
  discount: number;
};

export default function MasterData() {
  const [consoles, setConsoles] = useState<Console[]>([
    { id: 1, name: 'PS5 #1', type: 'PlayStation 5', price: 20000, status: 'Tersedia' },
    { id: 2, name: 'PS5 #2', type: 'PlayStation 5', price: 20000, status: 'Tersedia' },
    { id: 3, name: 'PS4 #1', type: 'PlayStation 4', price: 15000, status: 'Tersedia' },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'Ahmad Ridwan', phone: '081234567890', totalRentals: 15 },
    { id: 2, name: 'Siti Nurhaliza', phone: '081234567891', totalRentals: 8 },
    { id: 3, name: 'Budi Santoso', phone: '081234567892', totalRentals: 12 },
  ]);

  const [packages, setPackages] = useState<PackageType[]>([
    { id: 1, name: 'Paket 1 Jam', duration: 1, price: 15000, discount: 0 },
    { id: 2, name: 'Paket 3 Jam', duration: 3, price: 40000, discount: 5000 },
    { id: 3, name: 'Paket 5 Jam', duration: 5, price: 65000, discount: 10000 },
  ]);

  // Console states
  const [consoleDialogOpen, setConsoleDialogOpen] = useState(false);
  const [editingConsole, setEditingConsole] = useState<Console | null>(null);
  const [consoleName, setConsoleName] = useState('');
  const [consoleType, setConsoleType] = useState('');
  const [consolePrice, setConsolePrice] = useState('');

  // Customer states
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Package states
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);
  const [packageName, setPackageName] = useState('');
  const [packageDuration, setPackageDuration] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [packageDiscount, setPackageDiscount] = useState('');

  // Console functions
  const handleAddConsole = () => {
    if (!consoleName || !consoleType || !consolePrice) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    const newConsole: Console = {
      id: Math.max(...consoles.map(c => c.id), 0) + 1,
      name: consoleName,
      type: consoleType,
      price: parseInt(consolePrice),
      status: 'Tersedia'
    };

    setConsoles([...consoles, newConsole]);
    toast.success('Konsol berhasil ditambahkan');
    resetConsoleForm();
    setConsoleDialogOpen(false);
  };

  const handleEditConsole = (console: Console) => {
    setEditingConsole(console);
    setConsoleName(console.name);
    setConsoleType(console.type);
    setConsolePrice(console.price.toString());
    setConsoleDialogOpen(true);
  };

  const handleUpdateConsole = () => {
    if (!editingConsole || !consoleName || !consoleType || !consolePrice) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    setConsoles(consoles.map(c => 
      c.id === editingConsole.id 
        ? { ...c, name: consoleName, type: consoleType, price: parseInt(consolePrice) }
        : c
    ));
    toast.success('Konsol berhasil diperbarui');
    resetConsoleForm();
    setConsoleDialogOpen(false);
  };

  const handleDeleteConsole = (id: number) => {
    setConsoles(consoles.filter(c => c.id !== id));
    toast.success('Konsol berhasil dihapus');
  };

  const resetConsoleForm = () => {
    setEditingConsole(null);
    setConsoleName('');
    setConsoleType('');
    setConsolePrice('');
  };

  // Customer functions
  const handleAddCustomer = () => {
    if (!customerName || !customerPhone) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    const newCustomer: Customer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      name: customerName,
      phone: customerPhone,
      totalRentals: 0
    };

    setCustomers([...customers, newCustomer]);
    toast.success('Pelanggan berhasil ditambahkan');
    resetCustomerForm();
    setCustomerDialogOpen(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setCustomerName(customer.name);
    setCustomerPhone(customer.phone);
    setCustomerDialogOpen(true);
  };

  const handleUpdateCustomer = () => {
    if (!editingCustomer || !customerName || !customerPhone) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    setCustomers(customers.map(c => 
      c.id === editingCustomer.id 
        ? { ...c, name: customerName, phone: customerPhone }
        : c
    ));
    toast.success('Pelanggan berhasil diperbarui');
    resetCustomerForm();
    setCustomerDialogOpen(false);
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
    toast.success('Pelanggan berhasil dihapus');
  };

  const resetCustomerForm = () => {
    setEditingCustomer(null);
    setCustomerName('');
    setCustomerPhone('');
  };

  // Package functions
  const handleAddPackage = () => {
    if (!packageName || !packageDuration || !packagePrice) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    const newPackage: PackageType = {
      id: Math.max(...packages.map(p => p.id), 0) + 1,
      name: packageName,
      duration: parseInt(packageDuration),
      price: parseInt(packagePrice),
      discount: parseInt(packageDiscount || '0')
    };

    setPackages([...packages, newPackage]);
    toast.success('Paket berhasil ditambahkan');
    resetPackageForm();
    setPackageDialogOpen(false);
  };

  const handleEditPackage = (pkg: PackageType) => {
    setEditingPackage(pkg);
    setPackageName(pkg.name);
    setPackageDuration(pkg.duration.toString());
    setPackagePrice(pkg.price.toString());
    setPackageDiscount(pkg.discount.toString());
    setPackageDialogOpen(true);
  };

  const handleUpdatePackage = () => {
    if (!editingPackage || !packageName || !packageDuration || !packagePrice) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    setPackages(packages.map(p => 
      p.id === editingPackage.id 
        ? { 
            ...p, 
            name: packageName, 
            duration: parseInt(packageDuration), 
            price: parseInt(packagePrice),
            discount: parseInt(packageDiscount || '0')
          }
        : p
    ));
    toast.success('Paket berhasil diperbarui');
    resetPackageForm();
    setPackageDialogOpen(false);
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(p => p.id !== id));
    toast.success('Paket berhasil dihapus');
  };

  const resetPackageForm = () => {
    setEditingPackage(null);
    setPackageName('');
    setPackageDuration('');
    setPackagePrice('');
    setPackageDiscount('');
  };

  return (
    <div className="space-y-6">
      {/* Header dengan gradient dan background image */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1631864032962-950ceb71ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2NzAyMjI4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Database Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <h2 className="text-white">Master Data</h2>
          </div>
          <p className="text-violet-100">Kelola data konsol, pelanggan, dan tarif rental</p>
        </div>
      </div>

      <Tabs defaultValue="konsol" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gradient-to-r from-gray-100 to-gray-200">
          <TabsTrigger 
            value="konsol"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Data Konsol
          </TabsTrigger>
          <TabsTrigger 
            value="pelanggan"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Data Pelanggan
          </TabsTrigger>
          <TabsTrigger 
            value="tarif"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
          >
            <Tag className="w-4 h-4 mr-2" />
            Tarif & Paket
          </TabsTrigger>
        </TabsList>

        {/* TAB: DATA KONSOL */}
        <TabsContent value="konsol" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    Data Konsol PlayStation
                  </CardTitle>
                  <CardDescription>Kelola informasi konsol PlayStation yang tersedia</CardDescription>
                </div>
                <Dialog open={consoleDialogOpen} onOpenChange={(open) => {
                  setConsoleDialogOpen(open);
                  if (!open) resetConsoleForm();
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Unit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{editingConsole ? 'Edit Konsol' : 'Tambah Konsol Baru'}</DialogTitle>
                      <DialogDescription>
                        {editingConsole ? 'Ubah informasi konsol PlayStation' : 'Masukkan informasi konsol PlayStation baru'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Gamepad2 className="w-4 h-4 text-blue-600" />
                          Nama Konsol
                        </Label>
                        <Input 
                          placeholder="Contoh: PS5 #4" 
                          value={consoleName}
                          onChange={(e) => setConsoleName(e.target.value)}
                          className="border-blue-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-purple-600" />
                          Tipe
                        </Label>
                        <Input 
                          placeholder="PlayStation 5 / PlayStation 4" 
                          value={consoleType}
                          onChange={(e) => setConsoleType(e.target.value)}
                          className="border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          Harga per Jam
                        </Label>
                        <Input 
                          type="number" 
                          placeholder="20000" 
                          value={consolePrice}
                          onChange={(e) => setConsolePrice(e.target.value)}
                          className="border-green-200"
                        />
                      </div>
                      <Button 
                        onClick={editingConsole ? handleUpdateConsole : handleAddConsole} 
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        {editingConsole ? 'Perbarui' : 'Simpan'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <Input placeholder="Cari konsol..." className="pl-10 max-w-sm border-blue-200" />
                  </div>
                  <Button variant="outline" className="border-2 border-blue-200">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border-2 border-blue-100 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Harga/Jam</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consoles.map((console) => (
                      <TableRow key={console.id} className="hover:bg-blue-50/50">
                        <TableCell className="font-medium">{console.name}</TableCell>
                        <TableCell>{console.type}</TableCell>
                        <TableCell className="text-green-600">Rp {console.price.toLocaleString('id-ID')}</TableCell>
                        <TableCell>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            {console.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditConsole(console)}
                              className="border-blue-300 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteConsole(console.id)}
                              className="border-red-300 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Konsol</p>
                      <p className="text-2xl">{consoles.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Harga Rata-rata</p>
                      <p className="text-2xl">Rp {Math.round(consoles.reduce((sum, c) => sum + c.price, 0) / consoles.length).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tersedia</p>
                      <p className="text-2xl">{consoles.filter(c => c.status === 'Tersedia').length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: DATA PELANGGAN */}
        <TabsContent value="pelanggan" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Users className="w-5 h-5" />
                    </div>
                    Data Pelanggan
                  </CardTitle>
                  <CardDescription>Kelola informasi pelanggan rental</CardDescription>
                </div>
                <Dialog open={customerDialogOpen} onOpenChange={(open) => {
                  setCustomerDialogOpen(open);
                  if (!open) resetCustomerForm();
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{editingCustomer ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}</DialogTitle>
                      <DialogDescription>
                        {editingCustomer ? 'Ubah informasi pelanggan' : 'Masukkan informasi pelanggan baru'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-600" />
                          Nama Lengkap
                        </Label>
                        <Input 
                          placeholder="Nama pelanggan" 
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-pink-600" />
                          No. Telepon
                        </Label>
                        <Input 
                          placeholder="08xxxxxxxxxx" 
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="border-pink-200"
                        />
                      </div>
                      <Button 
                        onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer} 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {editingCustomer ? 'Perbarui' : 'Simpan'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <Input placeholder="Cari pelanggan..." className="pl-10 max-w-sm border-purple-200" />
                  </div>
                  <Button variant="outline" className="border-2 border-purple-200">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border-2 border-purple-100 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>No. Telepon</TableHead>
                      <TableHead>Total Rental</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-purple-50/50">
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {customer.totalRentals} kali
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditCustomer(customer)}
                              className="border-purple-300 hover:bg-purple-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="border-red-300 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Pelanggan</p>
                      <p className="text-2xl">{customers.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Rental</p>
                      <p className="text-2xl">{customers.reduce((sum, c) => sum + c.totalRentals, 0)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rata-rata Rental</p>
                      <p className="text-2xl">{Math.round(customers.reduce((sum, c) => sum + c.totalRentals, 0) / customers.length)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: TARIF & PAKET */}
        <TabsContent value="tarif" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white">
                      <Tag className="w-5 h-5" />
                    </div>
                    Tarif & Paket Rental
                  </CardTitle>
                  <CardDescription>Kelola harga dan paket rental</CardDescription>
                </div>
                <Dialog open={packageDialogOpen} onOpenChange={(open) => {
                  setPackageDialogOpen(open);
                  if (!open) resetPackageForm();
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Harga
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{editingPackage ? 'Edit Paket' : 'Tambah Paket Baru'}</DialogTitle>
                      <DialogDescription>
                        {editingPackage ? 'Ubah paket rental' : 'Buat paket rental baru dengan harga spesial'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-orange-600" />
                          Nama Paket
                        </Label>
                        <Input 
                          placeholder="Contoh: Paket Hemat 10 Jam" 
                          value={packageName}
                          onChange={(e) => setPackageName(e.target.value)}
                          className="border-orange-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Durasi (Jam)
                        </Label>
                        <Input 
                          type="number" 
                          placeholder="10" 
                          value={packageDuration}
                          onChange={(e) => setPackageDuration(e.target.value)}
                          className="border-blue-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          Harga
                        </Label>
                        <Input 
                          type="number" 
                          placeholder="120000" 
                          value={packagePrice}
                          onChange={(e) => setPackagePrice(e.target.value)}
                          className="border-green-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-purple-600" />
                          Diskon (Opsional)
                        </Label>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          value={packageDiscount}
                          onChange={(e) => setPackageDiscount(e.target.value)}
                          className="border-purple-200"
                        />
                      </div>
                      <Button 
                        onClick={editingPackage ? handleUpdatePackage : handleAddPackage} 
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                      >
                        {editingPackage ? 'Perbarui' : 'Simpan'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="rounded-xl border-2 border-orange-100 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                    <TableRow>
                      <TableHead>Nama Paket</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Diskon</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id} className="hover:bg-orange-50/50">
                        <TableCell className="font-medium">{pkg.name}</TableCell>
                        <TableCell>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {pkg.duration} Jam
                          </span>
                        </TableCell>
                        <TableCell className="text-green-600 font-medium">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell>
                          {pkg.discount > 0 ? (
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                              Rp {pkg.discount.toLocaleString('id-ID')}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPackage(pkg)}
                              className="border-orange-300 hover:bg-orange-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeletePackage(pkg.id)}
                              className="border-red-300 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Paket</p>
                      <p className="text-2xl">{packages.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Harga Tertinggi</p>
                      <p className="text-2xl">Rp {Math.max(...packages.map(p => p.price)).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Durasi Terlama</p>
                      <p className="text-2xl">{Math.max(...packages.map(p => p.duration))} Jam</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}