import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Gamepad2, Clock, Wallet, CreditCard, QrCode, Sparkles, Star, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type UserType = 'dewasa' | 'remaja' | 'anak';
type Page = 'splash' | 'select-user' | 'select-console' | 'select-duration' | 'payment' | 'confirm' | 'finish';
type PaymentMethod = 'cash' | 'qris' | null;

interface Console {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'rented';
}

interface Duration {
  id: string;
  label: string;
  hours: number;
  price: number;
}

export default function SelfServiceMode({ onClose }: { onClose: () => void }) {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedConsole, setSelectedConsole] = useState<Console | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<Duration | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [countdown, setCountdown] = useState(5);

  const consoles: Console[] = [
    { id: 'ps5-1', name: 'PlayStation 5 #1', type: 'PS5', status: 'available' },
    { id: 'ps5-2', name: 'PlayStation 5 #2', type: 'PS5', status: 'available' },
    { id: 'ps5-3', name: 'PlayStation 5 #3', type: 'PS5', status: 'rented' },
    { id: 'ps4-1', name: 'PlayStation 4 #1', type: 'PS4', status: 'available' },
    { id: 'ps4-2', name: 'PlayStation 4 #2', type: 'PS4', status: 'available' },
    { id: 'ps4-3', name: 'PlayStation 4 #3', type: 'PS4', status: 'rented' },
  ];

  const durations: Duration[] = [
    { id: '30min', label: '30 Menit', hours: 0.5, price: 10000 },
    { id: '1jam', label: '1 Jam', hours: 1, price: 15000 },
    { id: '2jam', label: '2 Jam', hours: 2, price: 28000 },
    { id: '3jam', label: '3 Jam', hours: 3, price: 40000 },
    { id: '4jam', label: '4 Jam', hours: 4, price: 50000 },
    { id: 'paket', label: 'Paket Full Day', hours: 12, price: 120000 },
  ];

  useEffect(() => {
    if (currentPage === 'finish') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentPage, onClose]);

  const getThemeColors = () => {
    switch (userType) {
      case 'dewasa':
        return {
          bg: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900',
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'bg-slate-600 hover:bg-slate-700',
          card: 'bg-slate-800 border-slate-600',
          text: 'text-white',
          textSecondary: 'text-slate-300',
          accent: 'bg-slate-700',
        };
      case 'remaja':
        return {
          bg: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-cyan-900',
          primary: 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700',
          secondary: 'bg-purple-700 hover:bg-purple-800',
          card: 'bg-gradient-to-br from-purple-800/50 to-cyan-800/50 border-purple-500/50',
          text: 'text-white',
          textSecondary: 'text-cyan-200',
          accent: 'bg-gradient-to-r from-purple-600 to-cyan-600',
        };
      case 'anak':
        return {
          bg: 'bg-gradient-to-br from-yellow-300 via-orange-200 to-blue-300',
          primary: 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500',
          secondary: 'bg-blue-400 hover:bg-blue-500',
          card: 'bg-white/90 border-yellow-400 shadow-xl',
          text: 'text-gray-800',
          textSecondary: 'text-gray-600',
          accent: 'bg-gradient-to-r from-yellow-400 to-orange-400',
        };
      default:
        return {
          bg: 'bg-gray-100',
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'bg-gray-600 hover:bg-gray-700',
          card: 'bg-white border-gray-300',
          text: 'text-gray-900',
          textSecondary: 'text-gray-600',
          accent: 'bg-blue-600',
        };
    }
  };

  const theme = getThemeColors();

  // Splash Screen
  if (currentPage === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Gamepad2 className="w-24 h-24 text-purple-600" />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl text-white">Rental PlayStation</h1>
            <p className="text-2xl text-white/90">Self-Service Mode</p>
          </div>
          <Button 
            onClick={() => setCurrentPage('select-user')} 
            className="bg-white text-purple-600 hover:bg-gray-100 text-2xl px-12 py-8 shadow-2xl"
            size="lg"
          >
            Mulai Sekarang
          </Button>
        </div>
      </div>
    );
  }

  // Select User Type
  if (currentPage === 'select-user') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
        <div className="max-w-5xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl text-white">Pilih Kategori Usia Anda</h1>
            <p className="text-xl text-white/90">Kami akan menyesuaikan tampilan sesuai dengan pilihan Anda</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dewasa */}
            <Card
              onClick={() => {
                setUserType('dewasa');
                setCurrentPage('select-console');
                toast.success('Mode Dewasa dipilih');
              }}
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 text-white"
            >
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Gamepad2 className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-3xl">Dewasa</h3>
                <p className="text-slate-300">Tampilan minimalis & profesional</p>
              </div>
            </Card>

            {/* Remaja */}
            <Card
              onClick={() => {
                setUserType('remaja');
                setCurrentPage('select-console');
                toast.success('Mode Remaja dipilih');
              }}
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-purple-800 to-cyan-800 border-purple-500 text-white"
            >
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-3xl">Remaja</h3>
                <p className="text-cyan-200">Tampilan modern & energik</p>
              </div>
            </Card>

            {/* Anak-anak */}
            <Card
              onClick={() => {
                setUserType('anak');
                setCurrentPage('select-console');
                toast.success('Mode Anak-anak dipilih');
              }}
              className="p-8 cursor-pointer hover:scale-105 transition-all bg-gradient-to-br from-yellow-400 to-orange-400 border-yellow-500"
            >
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-16 h-16 text-orange-500" />
                </div>
                <h3 className="text-3xl text-white">Anak-anak</h3>
                <p className="text-white/90">Tampilan ceria & ramah anak</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Select Console
  if (currentPage === 'select-console') {
    return (
      <div className={`min-h-screen ${theme.bg} p-6`}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className={`${userType === 'dewasa' ? 'text-4xl' : userType === 'remaja' ? 'text-5xl' : 'text-6xl'} ${theme.text}`}>
              {userType === 'anak' ? '🎮 Pilih PlayStation Kamu! 🎮' : 'Pilih Konsol PlayStation'}
            </h1>
            <Button
              onClick={() => setCurrentPage('select-user')}
              className={`${theme.secondary} ${theme.text} p-4 w-16 h-16`}
              size="lg"
            >
              <ArrowLeft className="w-8 h-8" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {consoles.map((console) => (
              <Card
                key={console.id}
                onClick={() => {
                  if (console.status === 'available') {
                    setSelectedConsole(console);
                    setCurrentPage('select-duration');
                    toast.success(`${console.name} dipilih!`);
                  } else {
                    toast.error('Konsol sedang dipakai');
                  }
                }}
                className={`p-6 cursor-pointer transition-all ${
                  console.status === 'available'
                    ? `${theme.card} hover:scale-105 border-4`
                    : 'bg-gray-500/50 opacity-50 cursor-not-allowed border-gray-400'
                }`}
              >
                <div className="text-center space-y-4">
                  <div className={`w-24 h-24 ${console.status === 'available' ? theme.accent : 'bg-gray-400'} rounded-full flex items-center justify-center mx-auto`}>
                    <Gamepad2 className={`w-12 h-12 ${console.status === 'available' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <h3 className={`${userType === 'anak' ? 'text-3xl' : 'text-2xl'} ${theme.text}`}>
                    {userType === 'anak' ? console.name.replace('PlayStation', 'PS') : console.name}
                  </h3>
                  <div className={`px-4 py-2 rounded-full ${console.status === 'available' ? 'bg-green-500' : 'bg-red-500'} text-white text-xl`}>
                    {console.status === 'available' ? (userType === 'anak' ? '✓ Bisa Dimainkan' : 'Tersedia') : (userType === 'anak' ? '✗ Sedang Dimainkan' : 'Sedang Disewa')}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Select Duration
  if (currentPage === 'select-duration') {
    return (
      <div className={`min-h-screen ${theme.bg} p-6`}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`${userType === 'anak' ? 'text-5xl' : 'text-4xl'} ${theme.text} mb-2`}>
                {userType === 'anak' ? '⏰ Mau Main Berapa Lama? ⏰' : 'Pilih Durasi Rental'}
              </h1>
              <p className={`${userType === 'anak' ? 'text-2xl' : 'text-xl'} ${theme.textSecondary}`}>
                Konsol: <strong>{selectedConsole?.name}</strong>
              </p>
            </div>
            <Button
              onClick={() => setCurrentPage('select-console')}
              className={`${theme.secondary} ${theme.text} p-4 w-16 h-16`}
              size="lg"
            >
              <ArrowLeft className="w-8 h-8" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {durations.map((duration) => (
              <Card
                key={duration.id}
                onClick={() => {
                  setSelectedDuration(duration);
                  setCurrentPage('payment');
                  toast.success(`Durasi ${duration.label} dipilih!`);
                }}
                className={`p-6 cursor-pointer hover:scale-105 transition-all ${theme.card} border-4`}
              >
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 ${theme.accent} rounded-full flex items-center justify-center mx-auto`}>
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`${userType === 'anak' ? 'text-4xl' : 'text-3xl'} ${theme.text}`}>
                    {duration.label}
                  </h3>
                  <div className={`text-2xl ${userType === 'anak' ? 'text-orange-600' : userType === 'remaja' ? 'text-cyan-400' : 'text-blue-400'}`}>
                    Rp {duration.price.toLocaleString('id-ID')}
                  </div>
                  {duration.id === 'paket' && (
                    <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-lg">
                      ⭐ {userType === 'anak' ? 'Hemat!' : 'Promo!'}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Payment
  if (currentPage === 'payment') {
    return (
      <div className={`min-h-screen ${theme.bg} p-6`}>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className={`${userType === 'anak' ? 'text-5xl' : 'text-4xl'} ${theme.text}`}>
              {userType === 'anak' ? '💰 Cara Bayar 💰' : 'Pilih Metode Pembayaran'}
            </h1>
            <Button
              onClick={() => setCurrentPage('select-duration')}
              className={`${theme.secondary} ${theme.text} p-4 w-16 h-16`}
              size="lg"
            >
              <ArrowLeft className="w-8 h-8" />
            </Button>
          </div>

          {/* Summary */}
          <Card className={`p-6 ${theme.card} border-4`}>
            <h3 className={`text-2xl ${theme.text} mb-4`}>
              {userType === 'anak' ? '📋 Ringkasan Pesanan' : 'Ringkasan Pembayaran'}
            </h3>
            <div className={`space-y-3 ${theme.text}`}>
              <div className="flex justify-between text-xl">
                <span>Konsol:</span>
                <strong>{selectedConsole?.name}</strong>
              </div>
              <div className="flex justify-between text-xl">
                <span>Durasi:</span>
                <strong>{selectedDuration?.label}</strong>
              </div>
              <div className="border-t pt-3 flex justify-between text-3xl">
                <span>Total:</span>
                <strong className={userType === 'anak' ? 'text-orange-600' : userType === 'remaja' ? 'text-cyan-400' : 'text-blue-400'}>
                  Rp {selectedDuration?.price.toLocaleString('id-ID')}
                </strong>
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          {!paymentMethod && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                onClick={() => setPaymentMethod('cash')}
                className={`p-8 cursor-pointer hover:scale-105 transition-all ${theme.card} border-4`}
              >
                <div className="text-center space-y-4">
                  <div className={`w-24 h-24 ${theme.accent} rounded-full flex items-center justify-center mx-auto`}>
                    <Wallet className="w-12 h-12 text-white" />
                  </div>
                  <h3 className={`${userType === 'anak' ? 'text-4xl' : 'text-3xl'} ${theme.text}`}>
                    {userType === 'anak' ? '💵 Tunai / Cash' : 'Tunai (Cash)'}
                  </h3>
                </div>
              </Card>

              <Card
                onClick={() => setPaymentMethod('qris')}
                className={`p-8 cursor-pointer hover:scale-105 transition-all ${theme.card} border-4`}
              >
                <div className="text-center space-y-4">
                  <div className={`w-24 h-24 ${theme.accent} rounded-full flex items-center justify-center mx-auto`}>
                    <CreditCard className="w-12 h-12 text-white" />
                  </div>
                  <h3 className={`${userType === 'anak' ? 'text-4xl' : 'text-3xl'} ${theme.text}`}>
                    {userType === 'anak' ? '📱 QRIS / E-Wallet' : 'QRIS / E-Wallet'}
                  </h3>
                </div>
              </Card>
            </div>
          )}

          {/* QRIS Display */}
          {paymentMethod === 'qris' && (
            <Card className={`p-8 ${theme.card} border-4`}>
              <div className="text-center space-y-6">
                <h3 className={`text-3xl ${theme.text}`}>
                  {userType === 'anak' ? '📱 Scan QR Code ini ya! 📱' : 'Scan QR Code untuk Pembayaran'}
                </h3>
                
                {/* QR Code Display */}
                <div className="bg-white p-8 rounded-xl inline-block">
                  <div className="w-64 h-64 bg-white border-4 border-gray-300 flex items-center justify-center">
                    <QrCode className="w-48 h-48 text-gray-800" />
                  </div>
                  <p className="text-gray-800 mt-4 text-xl">
                    Total: <strong>Rp {selectedDuration?.price.toLocaleString('id-ID')}</strong>
                  </p>
                </div>

                <p className={`${theme.textSecondary} text-xl`}>
                  {userType === 'anak' 
                    ? 'Minta bantuan orang tua untuk scan ya!' 
                    : 'Scan dengan aplikasi e-wallet Anda (GoPay, OVO, DANA, dll)'}
                </p>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => setPaymentMethod(null)}
                    className={`${theme.secondary} ${theme.text} text-xl px-8 py-6`}
                    size="lg"
                  >
                    Kembali
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentPage('confirm');
                      toast.success('Pembayaran QRIS berhasil!');
                    }}
                    className={`${theme.primary} text-white text-xl px-8 py-6`}
                    size="lg"
                  >
                    {userType === 'anak' ? '✓ Sudah Bayar!' : 'Konfirmasi Pembayaran'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Cash Display */}
          {paymentMethod === 'cash' && (
            <Card className={`p-8 ${theme.card} border-4`}>
              <div className="text-center space-y-6">
                <div className={`w-32 h-32 ${theme.accent} rounded-full flex items-center justify-center mx-auto animate-pulse`}>
                  <Wallet className="w-16 h-16 text-white" />
                </div>
                <h3 className={`text-3xl ${theme.text}`}>
                  {userType === 'anak' 
                    ? '💵 Bayar ke Kasir ya! 💵' 
                    : 'Silakan Lakukan Pembayaran ke Kasir'}
                </h3>
                <p className={`${theme.textSecondary} text-2xl`}>
                  Total: <strong>Rp {selectedDuration?.price.toLocaleString('id-ID')}</strong>
                </p>
                <p className={`${theme.textSecondary} text-xl`}>
                  {userType === 'anak' 
                    ? 'Tunggu operator mengkonfirmasi ya...' 
                    : 'Menunggu konfirmasi dari operator...'}
                </p>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => setPaymentMethod(null)}
                    className={`${theme.secondary} ${theme.text} text-xl px-8 py-6`}
                    size="lg"
                  >
                    Kembali
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentPage('confirm');
                      toast.success('Pembayaran tunai dikonfirmasi!');
                    }}
                    className={`${theme.primary} text-white text-xl px-8 py-6`}
                    size="lg"
                  >
                    {userType === 'anak' ? '✓ Sudah Bayar!' : 'Konfirmasi Pembayaran'}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Confirm
  if (currentPage === 'confirm') {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-6`}>
        <Card className={`p-12 ${theme.card} border-4 max-w-3xl w-full`}>
          <div className="text-center space-y-8">
            <div className={`w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto`}>
              <Gamepad2 className="w-16 h-16 text-white" />
            </div>
            
            <h1 className={`${userType === 'anak' ? 'text-5xl' : 'text-4xl'} ${theme.text}`}>
              {userType === 'anak' ? '🎉 Yay! Siap Main! 🎉' : 'Pembayaran Berhasil!'}
            </h1>

            <div className={`${theme.text} space-y-4 text-left`}>
              <div className="flex justify-between text-xl border-b pb-2">
                <span>Konsol:</span>
                <strong>{selectedConsole?.name}</strong>
              </div>
              <div className="flex justify-between text-xl border-b pb-2">
                <span>Durasi:</span>
                <strong>{selectedDuration?.label}</strong>
              </div>
              <div className="flex justify-between text-xl border-b pb-2">
                <span>Pembayaran:</span>
                <strong>{paymentMethod === 'cash' ? 'Tunai' : 'QRIS'}</strong>
              </div>
              <div className="flex justify-between text-2xl pt-2">
                <span>Total Bayar:</span>
                <strong className="text-green-500">Rp {selectedDuration?.price.toLocaleString('id-ID')}</strong>
              </div>
            </div>

            <div className={`p-6 ${userType === 'anak' ? 'bg-yellow-400' : theme.accent} rounded-xl`}>
              <p className={`${userType === 'anak' ? 'text-gray-900 text-3xl' : 'text-white text-2xl'}`}>
                {userType === 'anak' 
                  ? `🎮 Yuk ke ${selectedConsole?.name}! 🎮` 
                  : `Silakan menuju ${selectedConsole?.name}`}
              </p>
            </div>

            <Button
              onClick={() => setCurrentPage('finish')}
              className={`${theme.primary} text-white text-2xl px-12 py-8 w-full`}
              size="lg"
            >
              {userType === 'anak' ? '🚀 Ayo Main!' : 'Mulai Bermain'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Finish
  if (currentPage === 'finish') {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-6`}>
        <div className="text-center space-y-8">
          <div className={`w-40 h-40 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce`}>
            <Star className="w-20 h-20 text-white" />
          </div>
          
          <h1 className={`${userType === 'anak' ? 'text-6xl' : 'text-5xl'} ${theme.text}`}>
            {userType === 'anak' ? '🎉 Selamat Bermain! 🎉' : 'Terima Kasih!'}
          </h1>

          <p className={`${theme.textSecondary} text-2xl`}>
            {userType === 'anak' 
              ? 'Jangan lupa, main yang seru ya!' 
              : 'Selamat bermain dan nikmati pengalaman gaming Anda!'}
          </p>

          <p className={`${theme.text} text-xl`}>
            Menutup dalam {countdown} detik...
          </p>

          <Button
            onClick={onClose}
            className={`${theme.primary} text-white text-xl px-8 py-6`}
            size="lg"
          >
            Tutup Sekarang
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
