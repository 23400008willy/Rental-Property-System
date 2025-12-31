import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, Users, Gamepad2, DollarSign, Clock, FileText, ArrowUpRight, Activity, Trophy, Star } from 'lucide-react';
import { Button } from './ui/button';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface DashboardUtamaProps {
  onNavigateToTransaksi: (tab: 'new' | 'console' | 'duration' | 'active') => void;
  onNavigateToMaster: (tab: 'customers' | 'consoles' | 'packages') => void;
  onNavigateToLaporan: (tab: 'revenue' | 'transactions' | 'export') => void;
}

export default function DashboardUtama({ onNavigateToTransaksi, onNavigateToMaster, onNavigateToLaporan }: DashboardUtamaProps) {
  const stats = [
    {
      title: 'Total Pendapatan Hari Ini',
      value: 'Rp 450.000',
      icon: DollarSign,
      description: '+12% dari kemarin',
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      trend: '+12%'
    },
    {
      title: 'Konsol Tersedia',
      value: '8 / 15',
      icon: Gamepad2,
      description: '7 konsol sedang disewa',
      gradient: 'from-blue-500 to-cyan-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: '53%'
    },
    {
      title: 'Pelanggan Aktif',
      value: '23',
      icon: Users,
      description: 'Bulan ini',
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trend: '+8'
    },
    {
      title: 'Rata-rata Durasi Sewa',
      value: '3.5 Jam',
      icon: Clock,
      description: 'Per transaksi',
      gradient: 'from-orange-500 to-amber-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      trend: '+0.5h'
    }
  ];

  const recentTransactions = [
    { id: 1, customer: 'Ahmad Ridwan', console: 'PS5 #1', duration: '2 Jam', status: 'Aktif', total: 'Rp 40.000' },
    { id: 2, customer: 'Siti Nurhaliza', console: 'PS4 #3', duration: '3 Jam', status: 'Aktif', total: 'Rp 45.000' },
    { id: 3, customer: 'Budi Santoso', console: 'PS5 #2', duration: '4 Jam', status: 'Selesai', total: 'Rp 80.000' },
    { id: 4, customer: 'Dewi Lestari', console: 'PS4 #1', duration: '1 Jam', status: 'Aktif', total: 'Rp 15.000' },
  ];

  // Data untuk grafik pendapatan 7 hari terakhir
  const revenueData = [
    { day: 'Sen', pendapatan: 380 },
    { day: 'Sel', pendapatan: 420 },
    { day: 'Rab', pendapatan: 350 },
    { day: 'Kam', pendapatan: 520 },
    { day: 'Jum', pendapatan: 480 },
    { day: 'Sab', pedapatan: 625 },
    { day: 'Min', pendapatan: 450 },
  ];

  // Data untuk grafik konsol usage
  const consoleUsageData = [
    { name: 'PS5', value: 145, color: '#3b82f6' },
    { name: 'PS4', value: 122, color: '#8b5cf6' },
    { name: 'Tersedia', value: 53, color: '#10b981' },
  ];

  // Data peak hours
  const peakHoursData = [
    { hour: '10:00', transaksi: 2 },
    { hour: '12:00', transaksi: 5 },
    { hour: '14:00', transaksi: 8 },
    { hour: '16:00', transaksi: 12 },
    { hour: '18:00', transaksi: 15 },
    { hour: '20:00', transaksi: 10 },
    { hour: '22:00', transaksi: 6 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

  return (
    <div className="space-y-6">
      {/* Header dengan gambar background */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-2">Dashboard Utama</h2>
              <p className="text-blue-100">Ringkasan dan statistik bisnis rental PlayStation</p>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1612725009553-90115a117ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwcGxheXN0YXRpb258ZW58MXx8fHwxNzY2OTkzNzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="PlayStation Console" 
                className="w-48 h-32 object-cover rounded-lg shadow-2xl opacity-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards dengan Gradient */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl mb-1">{stat.value}</div>
                    <p className="text-xs text-gray-600">{stat.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="text-xs">{stat.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grafik Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Pendapatan 7 Hari Terakhir
                </CardTitle>
                <CardDescription>Grafik tren pendapatan harian</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl text-green-600">Rp 3.2 Jt</p>
                <p className="text-xs text-gray-600">Total minggu ini</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [`Rp ${value}.000`, 'Pendapatan']}
                />
                <Area type="monotone" dataKey="pendapatan" stroke="#10b981" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peak Hours Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Jam Sibuk Hari Ini
                </CardTitle>
                <CardDescription>Pola aktivitas rental per jam</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl text-blue-600">18:00</p>
                <p className="text-xs text-gray-600">Jam tersibuk</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value} transaksi`, 'Jumlah']}
                />
                <Bar dataKey="transaksi" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Transaksi Terbaru
            </CardTitle>
            <CardDescription>Aktivitas rental terkini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      index === 1 ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                      index === 2 ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                      'bg-gradient-to-br from-green-400 to-emerald-500'
                    } text-white`}>
                      {transaction.customer.charAt(0)}
                    </div>
                    <div>
                      <p>{transaction.customer}</p>
                      <p className="text-sm text-gray-600">{transaction.console} - {transaction.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">{transaction.total}</p>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      transaction.status === 'Aktif' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Console Usage Pie Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-blue-600" />
              Penggunaan Konsol
            </CardTitle>
            <CardDescription>Distribusi status konsol</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={consoleUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {consoleUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry: any) => `${value}: ${entry.payload.value}h`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Konsol dengan warna lebih variatif */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600" />
            Status Konsol & Durasi Tersisa
          </CardTitle>
          <CardDescription>Monitoring real-time konsol yang disewa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-blue-600" />
                  <span>PS5 #1</span>
                </span>
                <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">Aktif</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Ahmad Ridwan</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Durasi: 2 Jam</span>
                <span className="text-orange-600">⏱ 45 menit</span>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-purple-600" />
                  <span>PS4 #3</span>
                </span>
                <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full">Aktif</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Siti Nurhaliza</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Durasi: 3 Jam</span>
                <span className="text-green-600">⏱ 2:15</span>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-orange-600" />
                  <span>PS4 #1</span>
                </span>
                <span className="text-xs bg-orange-600 text-white px-3 py-1 rounded-full">Aktif</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Dewi Lestari</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Durasi: 1 Jam</span>
                <span className="text-red-600">⏱ 10 menit!</span>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-green-600" />
                  <span>PS5 #2</span>
                </span>
                <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">Tersedia</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Siap disewa</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Star className="w-4 h-4 fill-green-600" />
                <span>Ready!</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions dengan warna */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Akses Cepat
          </CardTitle>
          <CardDescription>Pintasan untuk modul yang sering digunakan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="h-auto flex-col py-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg hover:scale-105 transition-all"
              onClick={() => onNavigateToTransaksi('new')}
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm">Transaksi Baru</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col py-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg hover:scale-105 transition-all"
              onClick={() => onNavigateToTransaksi('console')}
            >
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm">Pilih Konsol</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col py-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg hover:scale-105 transition-all"
              onClick={() => onNavigateToMaster('customers')}
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm">Tambah Pelanggan</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col py-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg hover:scale-105 transition-all"
              onClick={() => onNavigateToLaporan('revenue')}
            >
              <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm">Lihat Laporan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
