import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Gamepad2, 
  FileText, 
  Database, 
  Settings, 
  LogOut,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';
import ModulTransaksi from './ModulTransaksi';
import ModulLaporan from './ModulLaporan';
import MasterData from './MasterData';
import Pengaturan from './Pengaturan';
import DashboardUtama from './DashboardUtama';

interface DashboardProps {
  onLogout: () => void;
}

type ActiveModule = 'dashboard' | 'transaksi' | 'laporan' | 'master' | 'pengaturan';
type TransaksiTab = 'new' | 'console' | 'duration' | 'active';
type MasterTab = 'customers' | 'consoles' | 'packages';
type LaporanTab = 'revenue' | 'transactions' | 'export';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [transaksiTab, setTransaksiTab] = useState<TransaksiTab>('console');
  const [masterTab, setMasterTab] = useState<MasterTab>('customers');
  const [laporanTab, setLaporanTab] = useState<LaporanTab>('revenue');

  const navigateToTransaksi = (tab: TransaksiTab) => {
    setTransaksiTab(tab);
    setActiveModule('transaksi');
  };

  const navigateToMaster = (tab: MasterTab) => {
    setMasterTab(tab);
    setActiveModule('master');
  };

  const navigateToLaporan = (tab: LaporanTab) => {
    setLaporanTab(tab);
    setActiveModule('laporan');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-8 h-8" />
              <div>
                <h1>Rental PlayStation</h1>
                <p className="text-blue-100 text-sm">Sistem Manajemen Rental</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Operator: Admin</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeModule === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setActiveModule('dashboard')}
            className="whitespace-nowrap"
          >
            <Activity className="w-4 h-4 mr-2" />
            Dashboard Utama
          </Button>
          <Button
            variant={activeModule === 'transaksi' ? 'default' : 'outline'}
            onClick={() => setActiveModule('transaksi')}
            className="whitespace-nowrap"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Modul Transaksi
          </Button>
          <Button
            variant={activeModule === 'laporan' ? 'default' : 'outline'}
            onClick={() => setActiveModule('laporan')}
            className="whitespace-nowrap"
          >
            <FileText className="w-4 h-4 mr-2" />
            Modul Laporan
          </Button>
          <Button
            variant={activeModule === 'master' ? 'default' : 'outline'}
            onClick={() => setActiveModule('master')}
            className="whitespace-nowrap"
          >
            <Database className="w-4 h-4 mr-2" />
            Master Data
          </Button>
          <Button
            variant={activeModule === 'pengaturan' ? 'default' : 'outline'}
            onClick={() => setActiveModule('pengaturan')}
            className="whitespace-nowrap"
          >
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan
          </Button>
        </div>

        {/* Content Area */}
        <div>
          {activeModule === 'dashboard' && (
            <DashboardUtama 
              onNavigateToTransaksi={navigateToTransaksi}
              onNavigateToMaster={navigateToMaster}
              onNavigateToLaporan={navigateToLaporan}
            />
          )}
          {activeModule === 'transaksi' && <ModulTransaksi activeTab={transaksiTab} onTabChange={setTransaksiTab} />}
          {activeModule === 'laporan' && <ModulLaporan activeTab={laporanTab} />}
          {activeModule === 'master' && <MasterData activeTab={masterTab} />}
          {activeModule === 'pengaturan' && <Pengaturan />}
        </div>
      </div>
    </div>
  );
}