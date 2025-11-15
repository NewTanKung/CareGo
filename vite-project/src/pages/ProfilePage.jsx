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
    <div className="min-h-screen bg-[#cfe5e7] px-4 pb-36 pt-10 md:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="rounded-[42px] bg-gradient-to-r from-[#3a6f86] to-[#6ea9ba] px-8 py-10 text-white shadow-[0_25px_60px_rgba(42,110,131,0.35)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-2xl font-semibold">
                {avatarLetter || ' '}
              </div>
              <div>
                <p className="text-sm text-white/80">ยินดีต้อนรับ</p>
                <p className="text-2xl font-semibold">{headerName || ' '}</p>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">🔔</div>
          </div>
        </div>

        <div className="-mt-10 rounded-[40px] bg-white/90 px-6 pb-16 pt-12 shadow-[0_25px_70px_rgba(31,107,126,0.25)] ring-1 ring-white/60 md:px-10">
          {!showHealthPanel && (
            <section className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-2xl font-semibold text-[#1b3d4f]">ข้อมูลส่วนตัว</p>
                <div className="relative mx-auto h-32 w-32">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f2f9f9] text-5xl text-[#2a6e83] shadow-inner">
                    👩🏻
                  </div>
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2a6e83] shadow">
                    🔒
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-[#1b3d4f] md:col-span-2">
                  <span>ชื่อ-นามสกุล</span>
                  <input
                    type="text"
                    value={profileName || ''}
                    onChange={(e) => onProfileNameChange(e.target.value)}
                    className="w-full rounded-2xl border border-white bg-[#f6fbfb] px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                    placeholder="ชื่อ-นามสกุล"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#1b3d4f]">
                  <span>เพศ</span>
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
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">⌄</span>
                  </div>
                </label>

                <label className="space-y-2 text-sm text-[#1b3d4f]">
                  <span>เบอร์โทรศัพท์</span>
                  <input
                    type="tel"
                    value={profilePhone || ''}
                    onChange={(e) => onProfilePhoneChange(e.target.value)}
                    className="w-full rounded-2xl border border-white bg-[#f6fbfb] px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                    placeholder="XXX-XXX-XXXX"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#1b3d4f] md:col-span-2">
                  <span>ญาติ / เบอร์ติดต่อฉุกเฉิน</span>
                  <input
                    type="tel"
                    value={profileEmergencyContact || ''}
                    onChange={(e) => onProfileEmergencyContactChange(e.target.value)}
                    className="w-full rounded-2xl border border-white bg-[#f6fbfb] px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2a6e83]"
                    placeholder="XXX-XXX-XXXX"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowHealthPanel(true)}
                className="w-full rounded-2xl bg-[#1f6b7e] py-3 text-lg font-semibold text-white shadow-lg shadow-[#1f6b7e]/30 transition hover:bg-[#175361]"
              >
                ข้อมูลสุขภาพ
              </button>
            </section>
          )}

          {showHealthPanel && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
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
              <div className="rounded-[32px] bg-white p-6 shadow-xl">
                <div className="grid gap-4 md:grid-cols-2">
                  {HEALTH_FIELDS.map((field) => (
                    <label key={field.key} className="text-sm text-slate-600">
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
              </div>
            </section>
          )}
        </div>
      </div>

      <NavigationBar activeKey="profile" onNavigate={onNavigate} />
    </div>
  );
}
