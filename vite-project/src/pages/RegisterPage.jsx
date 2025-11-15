import FeedbackMessages from '../components/FeedbackMessages.jsx';
import { UserIcon, MailIcon, LockIcon, GoogleIcon, FacebookIcon, EyeIcon, EyeOffIcon } from '../components/Icons.jsx';

export default function RegisterPage({
  newUsername,
  newEmail,
  newPassword,
  newConfirmPassword,
  newShowPassword,
  isCreating,
  onSubmit,
  onBack,
  onToggleShowPassword,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  errorMessage,
  successMessage,
}) {
  return (
    <main className="min-h-screen bg-[#bcd7d9] flex items-center justify-center px-4 py-10">
      <section className="relative w-full max-w-md bg-gradient-to-b from-[#2a6e83] to-[#9ccfd2] text-white rounded-[42px] shadow-2xl overflow-hidden">
        <div className="absolute -top-32 -right-16 w-80 h-80 bg-white/20 rounded-full" aria-hidden />
        <div className="absolute -top-12 -left-24 w-64 h-64 bg-white/15 rounded-full" aria-hidden />

        <div className="relative px-7 py-8 flex flex-col min-h-[660px]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
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

          <form onSubmit={onSubmit} className="mt-10 space-y-4 flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <UserIcon />
              </span>
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => onUsernameChange(e.target.value)}
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
                onChange={(e) => onEmailChange(e.target.value)}
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
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="รหัสผ่าน"
                className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/90 text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1d4c5a]"
              />
              <button
                type="button"
                onClick={onToggleShowPassword}
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
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                placeholder="ยืนยันรหัสผ่าน"
                className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/90 text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1d4c5a]"
              />
              <button
                type="button"
                onClick={onToggleShowPassword}
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

          <FeedbackMessages
            errorMessage={errorMessage}
            successMessage={successMessage}
            variant="dark"
          />

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
