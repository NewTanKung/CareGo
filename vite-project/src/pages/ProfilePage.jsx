import { useState } from 'react';
import NavigationBar from '../components/NavigationBar.jsx';

const GENDER_OPTIONS = ['หญิง', 'ชาย', 'อื่นๆ'];

const HEALTH_FIELDS = [
  { key: 'height_cm', label: 'ส่วนสูง', unit: 'เซนติเมตร' },
  { key: 'weight_kg', label: 'น้ำหนัก', unit: 'กิโลกรัม' },
  { key: 'blood_type', label: 'กรุ๊ปเลือด' },
  { key: 'chronic_dise', label: 'โรคประจำตัว' },
  { key: 'food_allerg', label: 'ภูมิแพ้อาหาร' },
  { key: 'drug_allerg', label: 'ภูมิแพ้ยา' },
  { key: 'surgery_hist', label: 'ประวัติการผ่าตัด' },
  { key: 'health_note', label: 'หมายเหตุ/ข้อมูลเพิ่มเติม', multiline: true },
];

export default function ProfilePage({
  user,
  profileName,
  profileGender,
  profilePhone,
  profileEmergencyContact,
  onProfileNameChange,
  onProfileGenderChange,
  onProfilePhoneChange,
  onProfileEmergencyContactChange,
  healthInfo,
  onHealthInfoChange,
  onNavigate,
}) {
  const [showHealthPanel, setShowHealthPanel] = useState(false);
  const headerName = profileName || user?.full_name || '';
  const avatarLetter = headerName ? headerName.charAt(0).toUpperCase() : '';

  const handleHealthChange = (key, value) => {
    if (onHealthInfoChange) {
      onHealthInfoChange(key, value);
    }
  };

  return (
    <div className="min-h-screen bg-[#cfe5e7] flex flex-col items-center px-4 pt-8 pb-24">
      <div className="w-full max-w-md">
        <div className="rounded-[36px] shadow-[0_20px_60px_rgba(10,79,94,0.25)] overflow-hidden bg-[#cfe5e7] relative">
          <header className="relative bg-gradient-to-r from-[#3a6f86] to-[#6ea9ba] text-white px-6 pt-10 pb-32 rounded-[36px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-semibold">
                  {avatarLetter || ' '}
                </div>
                <div>
                  <p className="text-sm text-white/80">ยินดีต้อนรับ</p>
                  <p className="text-xl font-semibold">{headerName || ' '}</p>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">🔔</span>
              </div>
            </div>
          </header>

          <main className="-mt-16 px-5 pb-36 space-y-6">
            {!showHealthPanel && (
              <section className="bg-white rounded-[32px] shadow-xl p-6 space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-2xl font-semibold text-[#1b3d4f]">ข้อมูลส่วนตัว</p>
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-full h-full rounded-full bg-[#f2f9f9] shadow-inner flex items-center justify-center text-5xl text-[#2a6e83]">
                      👩🏻
                    </div>
                    <span className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center text-[#2a6e83]">
                      🔒
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-[#1b3d4f]">ชื่อ-นามสกุล</label>
                    <input
                      type="text"
                      value={profileName || ''}
                      onChange={(e) => onProfileNameChange(e.target.value)}
                      className="w-full rounded-2xl border border-white bg-[#f6fbfb] px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-[#1b3d4f]">เพศ</label>
                    <div className="relative">
                      <select
                        value={profileGender}
                        onChange={(e) => onProfileGenderChange(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-white bg-[#f6fbfb] px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                      >
                        {GENDER_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 right-4 flex items-center text-slate-400 pointer-events-none">⌄</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-[#1b3d4f]">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      value={profilePhone || ''}
                      onChange={(e) => onProfilePhoneChange(e.target.value)}
                      className="w-full rounded-2xl border border-white bg-[#f6fbfb] px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                      placeholder="XXX-XXX-XXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-[#1b3d4f]">ญาติ / เบอร์ติดต่อฉุกเฉิน</label>
                    <input
                      type="tel"
                      value={profileEmergencyContact || ''}
                      onChange={(e) => onProfileEmergencyContactChange(e.target.value)}
                      className="w-full rounded-2xl border border-white bg-[#f6fbfb] px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                      placeholder="XXX-XXX-XXXX"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHealthPanel(true)}
                  className="w-full rounded-2xl bg-[#1f6b7e] text-white py-3 text-lg font-semibold shadow-lg shadow-[#1f6b7e]/30 hover:bg-[#175361] transition"
                >
                  ข้อมูลสุขภาพ
                </button>
              </section>
            )}

            {showHealthPanel && (
              <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-2xl font-semibold text-[#1b3d4f]">ข้อมูลสุขภาพ</h2>
                  <button
                    type="button"
                    onClick={() => setShowHealthPanel(false)}
                    className="text-xl text-gray-600 hover:text-gray-800"
                    aria-label="กลับไปหน้าข้อมูลส่วนตัว"
                  >
                    ×
                  </button>
                </div>
                <div className="bg-white rounded-[32px] shadow-xl p-6 space-y-4">
                  {HEALTH_FIELDS.map((field) => (
                    <label key={field.key} className="block text-sm text-slate-600">
                      <span className="flex items-baseline justify-between">
                        <span>{field.label}</span>
                        {field.unit && <span className="text-xs text-slate-400">{field.unit}</span>}
                      </span>
                      {field.multiline ? (
                        <textarea
                          value={healthInfo[field.key] || ''}
                          onChange={(e) => handleHealthChange(field.key, e.target.value)}
                          className="mt-1 w-full rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                          rows={3}
                          placeholder="เพิ่มรายละเอียดสุขภาพเพิ่มเติม"
                        />
                      ) : (
                        <input
                          type="text"
                          value={healthInfo[field.key] || ''}
                          onChange={(e) => handleHealthChange(field.key, e.target.value)}
                          className="mt-1 w-full rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                          placeholder="ระบุข้อมูล"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      <NavigationBar activeKey="profile" onNavigate={onNavigate} />
    </div>
  );
}
