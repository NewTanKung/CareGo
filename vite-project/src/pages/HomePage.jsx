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
    <div className="min-h-screen bg-[#cfe5e7] flex flex-col relative pb-24">
      <header className="relative bg-gradient-to-r from-[#3a6f86] to-[#6ea9ba] text-white px-6 pt-10 pb-28 rounded-b-[36px] shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-semibold">
              {avatarLetter}
            </div>
            <div>
              <p className="text-sm text-white/80">ยินดีต้อนรับ</p>
              <p className="text-xl font-semibold">{resolvedDisplayName || ' '}</p>
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

      <main className="-mt-16 px-5 flex-1 pb-36 space-y-6">
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

      <NavigationBar activeKey="home" onNavigate={onNavigate} />
    </div>
  );
}
