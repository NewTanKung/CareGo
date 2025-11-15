import { useState } from 'react';
import careGoLogo from './assets/CareGo.svg';

// ไอคอน SVG ที่ใช้ซ้ำในทุกฟอร์ม
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691c-1.645 3.174-2.656 6.786-2.656 10.609c0 3.823 1.011 7.435 2.656 10.609L12.7 30.7C11.083 27.97 10 24.961 10 21.7s1.083-6.27 2.7-8.999L6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657C30.046 35.053 27.268 36 24 36c-5.218 0-9.64-3.34-11.303-7.918l-6.394 4.969C9.183 40.402 16.087 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.087 5.571l5.657 5.657C41.832 35.097 44 30.024 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-5 h-5"
    fill="#1877F2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.323-1.325z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.104 3.636-4.098 6-7.542 6-3.444 0-6.438-2.364-7.542-6z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .274-1.004.68-1.944 1.21-2.785M14.79 14.79a3 3 0 01-4.242-4.242l-1.06 1.06M1.5 1s3.15 4.418 7.5 7.5M22.5 23s-3.15-4.418-7.5-7.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 5c1.47 0 2.88.31 4.148.87m3.86 3.86a10.025 10.025 0 01-3.86 3.86"
    />
  </svg>
);

const QUICK_ACTIONS = [
  {
    label: 'ผู้ช่วยดูแล',
    description: 'ดูข้อมูลผู้ช่วย',
    icon: '🧑‍⚕️',
    colors: 'from-[#f3f7fb] to-[#e0eaf9]',
  },
  {
    label: 'จองคิว/เวลา',
    description: 'ตรวจสอบตาราง',
    icon: '🗓️',
    colors: 'from-[#f3f9f4] to-[#dff0e5]',
  },
  {
    label: 'สอบถามข้อมูล',
    description: 'แชทกับ CareGo',
    icon: '💬',
    colors: 'from-[#faf2fd] to-[#eadcf5]',
  },
  {
    label: 'สถานะคนไข้',
    description: 'ติดตามอาการ',
    icon: '📊',
    colors: 'from-[#fef6eb] to-[#fae3c8]',
  },
];

const NAV_ITEMS = [
  { label: 'หน้าหลัก', icon: '🏠', active: true },
  { label: 'แชท', icon: '💬', active: false },
  { label: 'จองคิว', icon: '🗓️', active: false },
  { label: 'ข้อมูลส่วนตัว', icon: '👤', active: false },
];

export default function App() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const switchMode = (nextMode) => {
    if (nextMode === mode) {
      return;
    }

    resetMessages();
    setShowPassword(false);
    setNewShowPassword(false);

    if (nextMode === 'login') {
      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
      setNewConfirmPassword('');
    } else if (nextMode === 'create') {
      setEmail('');
      setPassword('');
    }

    setMode(nextMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }

      setCurrentUser(result.user || { username: email });
      setMode('home');
      setEmail('');
      setPassword('');
      setShowPassword(false);
    } catch (error) {
      setErrorMessage(error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    resetMessages();

    if (newPassword !== newConfirmPassword) {
      setErrorMessage('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          password: newPassword,
          status: 1,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'ไม่สามารถสร้างผู้ใช้ได้');
      }

      setSuccessMessage(result.message || 'ลงทะเบียนสำเร็จ กรุณาเข้าสู่ระบบ');
      setMode('login');
      setEmail(newEmail);
      setPassword('');
      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
      setNewConfirmPassword('');
      setNewShowPassword(false);
    } catch (error) {
      setErrorMessage(error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMode('login');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    resetMessages();
  };

  const renderFeedback = (variant = 'light') => {
    if (!errorMessage && !successMessage) {
      return null;
    }

    if (variant === 'dark') {
      return (
        <div className="mt-6 space-y-2">
          {errorMessage && (
            <p className="text-center text-sm text-red-100 font-medium" role="alert">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-center text-sm text-emerald-100 font-medium" role="status">
              {successMessage}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {errorMessage && (
          <p className="text-center text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-center text-sm text-green-600" role="status">
            {successMessage}
          </p>
        )}
      </div>
    );
  };

  if (mode === 'home' && currentUser) {
    return <HomePage user={currentUser} onLogout={handleLogout} />;
  }

  if (mode === 'create') {
    return (
      <main className="min-h-screen bg-[#bcd7d9] flex items-center justify-center px-4 py-10">
        <section className="relative w-full max-w-md bg-gradient-to-b from-[#2a6e83] to-[#9ccfd2] text-white rounded-[42px] shadow-2xl overflow-hidden">
          <div className="absolute -top-32 -right-16 w-80 h-80 bg-white/20 rounded-full" aria-hidden />
          <div className="absolute -top-12 -left-24 w-64 h-64 bg-white/15 rounded-full" aria-hidden />

          <div className="relative px-7 py-8 flex flex-col min-h-[660px]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                aria-label="ย้อนกลับไปหน้าเข้าสู่ระบบ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <p className="text-sm text-white/80">ย้อนกลับ</p>
            </div>

            <div className="mt-10 space-y-2">
              <p className="text-xl font-semibold">ลงทะเบียน</p>
              <h1 className="text-4xl font-bold leading-tight">ลงทะเบียนบัญชีของท่าน</h1>
              <p className="text-sm text-white/80">
                ดูแลทุกขั้นตอนอย่างใกล้ชิด เพื่อให้ประสบการณ์การดูแลสุขภาพใน CareGo เป็นเรื่องง่าย
              </p>
            </div>

            <form onSubmit={handleCreateUser} className="mt-10 space-y-4 flex-1">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="ชื่อผู้ใช้งาน (Username)"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/90 text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1d4c5a]"
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="อีเมล"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/90 text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1d4c5a]"
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <LockIcon />
                </span>
                <input
                  type={newShowPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="รหัสผ่าน"
                  className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/90 text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1d4c5a]"
                />
                <button
                  type="button"
                  onClick={() => setNewShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                  aria-label="สลับการแสดงรหัสผ่าน"
                >
                  {newShowPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <LockIcon />
                </span>
                <input
                  type={newShowPassword ? 'text' : 'password'}
                  required
                  value={newConfirmPassword}
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  placeholder="ยืนยันรหัสผ่าน"
                  className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/90 text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1d4c5a]"
                />
                <button
                  type="button"
                  onClick={() => setNewShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                  aria-label="สลับการแสดงยืนยันรหัสผ่าน"
                >
                  {newShowPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#0e4f66] text-white text-lg font-semibold shadow-xl shadow-[#0e4f66]/30 hover:bg-[#0b4052] transition disabled:opacity-60"
                disabled={isCreating}
              >
                {isCreating ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
              </button>
            </form>

            {renderFeedback('dark')}

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-4">
                <span className="flex-1 h-px bg-white/30" />
                <span className="text-sm text-white/80">หรือ</span>
                <span className="flex-1 h-px bg-white/30" />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg"
                  aria-label="Sign up with Google"
                >
                  <GoogleIcon />
                </button>
                <button
                  type="button"
                  className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg"
                  aria-label="Sign up with Facebook"
                >
                  <FacebookIcon />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#e0eff0] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md bg-white/90 backdrop-blur border border-white rounded-[36px] shadow-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto h-24 w-24 bg-[#d7eef1] rounded-full flex items-center justify-center shadow-inner">
            <img src={careGoLogo} alt="CareGo logo" className="h-12" />
          </div>
          <p className="text-sm text-slate-500 tracking-[0.3em] uppercase">CareGo Portal</p>
          <h1 className="text-3xl font-bold text-slate-800">เข้าสู่ระบบ</h1>
          <p className="text-sm text-slate-500">ดูแลทุกการเดินทางของการแพทย์</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <UserIcon />
            </span>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ชื่อผู้ใช้หรืออีเมล"
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#f3f7f8] text-slate-900 placeholder-slate-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#4d8a9a]"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <LockIcon />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-[#f3f7f8] text-slate-900 placeholder-slate-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#4d8a9a]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-4"
              aria-label="สลับการแสดงรหัสผ่าน"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm font-medium text-[#1f6b7e] hover:underline">
              ลืมรหัสผ่าน ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#1f6b7e] text-white text-lg font-semibold shadow-lg shadow-[#1f6b7e]/30 hover:bg-[#185565] transition disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

          <button
            type="button"
            onClick={() => switchMode('create')}
            className="w-full py-3 rounded-2xl border border-[#1f6b7e] text-[#1f6b7e] font-semibold hover:bg-[#e7f0f2] transition"
          >
            ลงทะเบียนบัญชีใหม่
          </button>
        </form>

        {renderFeedback('light')}

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">หรือ</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"
              aria-label="Sign in with Google"
            >
              <GoogleIcon />
            </button>
            <button
              type="button"
              className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"
              aria-label="Sign in with Facebook"
            >
              <FacebookIcon />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function HomePage({ user, onLogout }) {
  const displayName = user?.username || user?.email || 'ผู้ใช้งาน CareGo';
  const locationText = 'ศูนย์ดูแลผู้สูงอายุ CareGo';

  return (
    <div className="min-h-screen bg-[#cfe5e7] flex flex-col">
      <header className="relative bg-gradient-to-r from-[#3a6f86] to-[#6ea9ba] text-white px-6 pt-10 pb-28 rounded-b-[36px] shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-white/80">ยินดีต้อนรับ</p>
              <p className="text-xl font-semibold">{displayName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 rounded-full bg-white/20 text-sm font-semibold backdrop-blur hover:bg-white/30 transition"
          >
            ออกจากระบบ
          </button>
        </div>

        <div className="mt-6 bg-white/15 rounded-2xl p-4 backdrop-blur">
          <p className="text-sm text-white/80">ที่อยู่ปัจจุบัน</p>
          <p className="text-lg font-semibold">{locationText}</p>
        </div>
      </header>

      <main className="-mt-16 px-5 flex-1 pb-24 space-y-6">
        <section className="bg-white rounded-3xl shadow-xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">อยู่กับผู้ดูแล</p>
              <p className="text-lg font-semibold text-[#34505d]">สถานะปกติ</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
              ดูแลอยู่
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                className={`bg-gradient-to-br ${action.colors} rounded-2xl p-4 text-left shadow-md flex gap-3 hover:shadow-lg transition`}
              >
                <span className="text-2xl">{action.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-[#2f4d5a]">{action.label}</p>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-[#f6efe2] flex items-center justify-center text-2xl">🗓️</div>
            <div>
              <p className="text-sm font-semibold text-slate-700">นัดหมาย</p>
              <p className="text-xs text-gray-500">วันนี้</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#f4faf6] text-center py-6 text-[#3d6d6c] font-semibold">
            ท่านยังไม่มีการนัดหมาย
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-inner">
        <nav className="flex justify-around py-3">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.label}
              className="flex flex-col items-center gap-1"
            >
              <span className={`text-2xl ${item.active ? 'text-[#2f6f80]' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              <span className={`text-xs ${item.active ? 'text-[#2f6f80] font-semibold' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}
