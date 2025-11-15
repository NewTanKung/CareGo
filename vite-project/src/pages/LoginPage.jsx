import careGoLogo from '../assets/CareGo.svg';
import FeedbackMessages from '../components/FeedbackMessages.jsx';
import { UserIcon, LockIcon, GoogleIcon, FacebookIcon, EyeIcon, EyeOffIcon } from '../components/Icons.jsx';

export default function LoginPage({
  email,
  password,
  showPassword,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onToggleShowPassword,
  onSubmit,
  onSwitchMode,
  errorMessage,
  successMessage,
}) {
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

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <UserIcon />
            </span>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
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
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-[#f3f7f8] text-slate-900 placeholder-slate-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#4d8a9a]"
            />
            <button
              type="button"
              onClick={onToggleShowPassword}
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
            onClick={onSwitchMode}
            className="w-full py-3 rounded-2xl border border-[#1f6b7e] text-[#1f6b7e] font-semibold hover:bg-[#e7f0f2] transition"
          >
            ลงทะเบียนบัญชีใหม่
          </button>
        </form>

        <FeedbackMessages errorMessage={errorMessage} successMessage={successMessage} />

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
