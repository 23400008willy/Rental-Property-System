import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileDown, TrendingUp, Calendar, BarChart3, DollarSign, Activity, Award, Download, PieChart as PieChartIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

export default function ModulLaporan() {
  const dailyReport = [
    { date: '7 Nov 2024', transactions: 12, revenue: 'Rp 450.000', hours: 28 },
    { date: '6 Nov 2024', transactions: 15, revenue: 'Rp 520.000', hours: 32 },
    { date: '5 Nov 2024', transactions: 10, revenue: 'Rp 380.000', hours: 24 },
    { date: '4 Nov 2024', transactions: 18, revenue: 'Rp 625.000', hours: 38 },
  ];

  const topConsoles = [
    { name: 'PS5 #1', usage: 145, revenue: 'Rp 2.900.000' },
    { name: 'PS5 #2', usage: 138, revenue: 'Rp 2.760.000' },
    { name: 'PS4 #3', usage: 122, revenue: 'Rp 1.830.000' },
    { name: 'PS4 #1', usage: 115, revenue: 'Rp 1.725.000' },
  ];

  // Data untuk grafik pendapatan 7 hari terakhir
  const revenueData = [
    { day: 'Sen', pendapatan: 380, transaksi: 10 },
    { day: 'Sel', pendapatan: 520, transaksi: 15 },
    { day: 'Rab', pendapatan: 380, transaksi: 11 },
    { day: 'Kam', pendapatan: 625, transaksi: 18 },
    { day: 'Jum', pendapatan: 520, transaksi: 14 },
    { day: 'Sab', pendapatan: 450, transaksi: 12 },
    { day: 'Min', pendapatan: 490, transaksi: 13 },
  ];

  // Data untuk grafik konsol type distribution
  const consoleTypeData = [
    { name: 'PS5', value: 283, color: '#3b82f6' },
    { name: 'PS4', value: 237, color: '#8b5cf6' },
  ];

  // Data peak hours
  const peakHoursData = [
    { hour: '09:00', count: 3 },
    { hour: '12:00', count: 8 },
    { hour: '15:00', count: 12 },
    { hour: '18:00', count: 18 },
    { hour: '21:00', count: 14 },
    { hour: '24:00', count: 6 },
  ];

  const handleExport = (format: string) => {
    toast.success(`Laporan berhasil di-export ke format ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Header dengan gradient dan background image */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjcwMDA3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Analytics Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-cyan-900/50"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-white">Modul Laporan</h2>
          </div>
          <p className="text-emerald-100">Analisis dan laporan keuangan rental PlayStation</p>
        </div>
      </div>

      <Tabs defaultValue="pendapatan" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gradient-to-r from-gray-100 to-gray-200">
          <TabsTrigger 
            value="pendapatan"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Laporan Pendapatan
          </TabsTrigger>
          <TabsTrigger 
            value="statistik"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            <Activity className="w-4 h-4 mr-2" />
            Statistik Data
          </TabsTrigger>
          <TabsTrigger 
            value="export"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export Laporan
          </TabsTrigger>
        </TabsList>

        {/* TAB: LAPORAN PENDAPATAN */}
        <TabsContent value="pendapatan" className="space-y-4">
          {/* Summary Cards dengan gradient */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Pendapatan Hari Ini</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-green-600 mb-1">Rp 450.000</div>
                <p className="text-xs text-gray-600">12 transaksi • 28 jam</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Pendapatan Minggu Ini</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-blue-600 mb-1">Rp 2.850.000</div>
                <p className="text-xs text-gray-600">68 transaksi • 164 jam</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Pendapatan Bulan Ini</CardTitle>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-purple-600 mb-1">Rp 12.450.000</div>
                <p className="text-xs text-gray-600">285 transaksi • 712 jam</p>
              </CardContent>
            </Card>
          </div>

          {/* Grid Layout untuk Grafik dan Riwayat */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue Chart */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      Grafik Pendapatan Mingguan
                    </CardTitle>
                    <CardDescription>Trend pendapatan 7 hari terakhir</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-green-600">+18%</p>
                    <p className="text-xs text-gray-600">vs minggu lalu</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
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
                    <Area type="monotone" dataKey="pendapatan" stroke="#10b981" strokeWidth={3} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Report List dengan warna bervariasi */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center text-white">
                    <Calendar className="w-5 h-5" />
                  </div>
                  Riwayat Pendapatan Harian
                </CardTitle>
                <CardDescription>Ringkasan pendapatan per hari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyReport.map((day, index) => (
                    <div 
                      key={day.date} 
                      className={`relative p-4 rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg ${
                        index === 0 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                          : index === 1 
                          ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                          : index === 2
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                          : 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            index === 0 ? 'bg-green-600' :
                            index === 1 ? 'bg-blue-600' :
                            index === 2 ? 'bg-purple-600' : 'bg-orange-600'
                          } text-white shadow-lg`}>
                            <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium">{day.date}</p>
                            <p className="text-sm text-gray-600">{day.transactions} transaksi • {day.hours} jam</p>
                          </div>
                        </div>
                        <div className="text-green-600 text-xl">{day.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB: STATISTIK DATA */}
        <TabsContent value="statistik" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <Activity className="w-5 h-5" />
                </div>
                Statistik Pendapatan
              </CardTitle>
              <CardDescription>Lihat statistik pendapatan berdasarkan periode waktu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select defaultValue="week">
                  <SelectTrigger className="w-[200px] border-2 border-blue-200">
                    <SelectValue placeholder="Pilih periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hari Ini</SelectItem>
                    <SelectItem value="week">Minggu Ini</SelectItem>
                    <SelectItem value="month">Bulan Ini</SelectItem>
                    <SelectItem value="year">Tahun Ini</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-40 pointer-events-none"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span>Total Transaksi</span>
                    </div>
                    <div className="text-4xl mb-2">68</div>
                    <p className="text-sm text-gray-600">Minggu ini</p>
                  </div>
                </div>

                <div className="relative p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-40 pointer-events-none"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <span>Rata-rata Harian</span>
                    </div>
                    <div className="text-4xl mb-2">Rp 407K</div>
                    <p className="text-sm text-gray-600">Per hari</p>
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Peak Hours */}
                <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <h3 className="mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    Jam Tersibuk
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={peakHoursData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" stroke="#888" fontSize={11} />
                      <YAxis stroke="#888" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Console Type Distribution */}
                <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                  <h3 className="mb-4 flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-orange-600" />
                    Distribusi Tipe Konsol
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={consoleTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {consoleTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend formatter={(value, entry: any) => `${value}: ${entry.payload.value}h`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Consoles dengan ranking warna */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                Konsol Terpopuler
              </CardTitle>
              <CardDescription>Ranking konsol berdasarkan penggunaan dan pendapatan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topConsoles.map((console, index) => (
                  <div 
                    key={console.name} 
                    className={`relative flex items-center gap-4 p-5 rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300' :
                      'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-slate-500' :
                      index === 2 ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                      'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}>
                      <span className="text-2xl">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">{console.name}</p>
                      <p className="text-sm text-gray-600">{console.usage} jam penggunaan</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 text-xl">{console.revenue}</p>
                    </div>
                    {index === 0 && (
                      <Award className="absolute top-2 right-2 w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: EXPORT LAPORAN */}
        <TabsContent value="export" className="space-y-4">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <Download className="w-5 h-5" />
                </div>
                Export Laporan
              </CardTitle>
              <CardDescription>Download laporan dalam format PDF atau Excel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Pilih Periode Laporan
                    </label>
                    <Select defaultValue="month">
                      <SelectTrigger className="bg-white border-2 border-blue-200">
                        <SelectValue placeholder="Pilih periode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Hari Ini</SelectItem>
                        <SelectItem value="week">Minggu Ini</SelectItem>
                        <SelectItem value="month">Bulan Ini</SelectItem>
                        <SelectItem value="custom">Custom Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileDown className="w-4 h-4 text-purple-600" />
                      Jenis Laporan
                    </label>
                    <Select defaultValue="full">
                      <SelectTrigger className="bg-white border-2 border-purple-200">
                        <SelectValue placeholder="Pilih jenis laporan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Laporan Lengkap</SelectItem>
                        <SelectItem value="revenue">Laporan Pendapatan</SelectItem>
                        <SelectItem value="transactions">Laporan Transaksi</SelectItem>
                        <SelectItem value="consoles">Laporan Konsol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleExport('PDF')} 
                  className="h-28 flex-col gap-3 bg-gradient-to-br from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-xl text-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <FileDown className="w-8 h-8" />
                  </div>
                  Export ke PDF
                </Button>
                <Button 
                  onClick={() => handleExport('Excel')} 
                  className="h-28 flex-col gap-3 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl text-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <FileDown className="w-8 h-8" />
                  </div>
                  Export ke Excel
                </Button>
              </div>

              {/* Preview Section */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200">
                <h3 className="mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-600" />
                  Preview Data yang Akan Di-export
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Total Transaksi</span>
                    <span className="font-medium">285 transaksi</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Total Pendapatan</span>
                    <span className="font-medium text-green-600">Rp 12.450.000</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Total Jam Operasional</span>
                    <span className="font-medium">712 jam</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Rata-rata per Transaksi</span>
                    <span className="font-medium">Rp 43.684</span>
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