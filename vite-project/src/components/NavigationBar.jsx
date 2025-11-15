const NAV_ITEMS = [
  { key: 'home', label: 'หน้าหลัก', icon: '🏠' },
  { key: 'chat', label: 'แชท', icon: '💬' },
  { key: 'booking', label: 'จองคิว', icon: '🗓️' },
  { key: 'profile', label: 'ข้อมูลส่วนตัว', icon: '👤' },
];

export default function NavigationBar({ activeKey = 'home', onNavigate }) {
  const handleNavigate = (key) => {
    if (!onNavigate) {
      return;
    }

    onNavigate(key);
  };

  return (
    <nav className="pointer-events-auto fixed inset-x-0 bottom-6 px-5">
      <div className="mx-auto w-full max-w-3xl bg-white rounded-[32px] shadow-2xl shadow-[#2f6f80]/25 border border-white flex justify-around py-4 px-6">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              type="button"
              key={item.key}
              onClick={() => handleNavigate(item.key)}
              className="flex flex-col items-center gap-1"
            >
              <span className={`text-2xl ${isActive ? 'text-[#2f6f80]' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              <span className={`text-xs ${isActive ? 'text-[#2f6f80] font-semibold' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
