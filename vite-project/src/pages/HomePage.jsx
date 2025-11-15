import NavigationBar from '../components/NavigationBar.jsx';

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

export default function HomePage({ user, onLogout, onNavigate, displayName }) {
  const resolvedDisplayName = displayName || user?.full_name || '';
  const avatarLetter = resolvedDisplayName ? resolvedDisplayName.charAt(0).toUpperCase() : '';
  const locationText = 'ศูนย์ดูแลผู้สูงอายุ CareGo';

  return (
    <div className="min-h-screen bg-[#cfe5e7] px-4 pb-36 pt-10 md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="rounded-[42px] bg-gradient-to-r from-[#3a6f86] to-[#6ea9ba] px-8 py-10 text-white shadow-[0_25px_60px_rgba(42,110,131,0.35)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-2xl font-semibold">
                {avatarLetter}
              </div>
              <div>
                <p className="text-sm text-white/80">ยินดีต้อนรับ</p>
                <p className="text-2xl font-semibold">{resolvedDisplayName || ' '}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30 transition"
            >
              ออกจากระบบ
            </button>
          </div>
          <div className="mt-8 rounded-3xl bg-white/15 p-5 backdrop-blur">
            <p className="text-sm text-white/80">ที่อยู่ปัจจุบัน</p>
            <p className="text-lg font-semibold">{locationText}</p>
          </div>
        </header>

        <main className="-mt-10 space-y-6 rounded-[40px] bg-white/90 px-6 pb-16 pt-12 shadow-[0_25px_70px_rgba(31,107,126,0.2)] ring-1 ring-white/60 md:px-10">
          <section className="rounded-3xl bg-white p-6 shadow-md shadow-[#2f6f80]/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">อยู่กับผู้ดูแล</p>
                <p className="text-xl font-semibold text-[#34505d]">สถานะปกติ</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600">
                ดูแลอยู่
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className={`bg-gradient-to-br ${action.colors} rounded-2xl p-4 text-left shadow-sm flex gap-3 hover:shadow-lg transition`}
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

          <section className="rounded-3xl bg-white p-6 shadow-md shadow-[#2f6f80]/10">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6efe2] text-2xl">🗓️</div>
              <div>
                <p className="text-base font-semibold text-slate-700">นัดหมาย</p>
                <p className="text-xs text-gray-500">วันนี้</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-[#f4faf6] py-6 text-center text-[#3d6d6c] font-semibold">
              ท่านยังไม่มีการนัดหมาย
            </div>
          </section>
        </main>
      </div>

      <NavigationBar activeKey="home" onNavigate={onNavigate} />
    </div>
  );
}
