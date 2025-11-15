import { useCallback, useEffect, useMemo, useState } from 'react';
import NavigationBar from '../components/NavigationBar.jsx';

const mapDateToInput = (date) => {
  const pad = (value) => String(value).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const createDefaultForm = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  defaultDate.setHours(9, 0, 0, 0);
  return {
    address: '',
    appointmentDate: mapDateToInput(defaultDate),
    hospital: null,
    caregiver: null,
    notes: '',
  };
};

const parseOrThrow = async (response, fallbackMessage) => {
  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(payload?.message || fallbackMessage);
  }

  return payload;
};

const normalizeBookings = (rawBookings) =>
  rawBookings.map((item) => ({
    id: item.id,
    address: item.address,
    notes: item.notes,
    status: item.status,
    appointmentDate: item.appointment_date,
    hospital: {
      id: item.hospital_id,
      name: item.hospital_name,
      location: item.hospital_location,
    },
    caregiver: {
      id: item.caregiver_id,
      name: item.caregiver_name,
      specialty: item.caregiver_specialty,
    },
  }));

const formatBookingDateParts = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return {
      weekday: 'ไม่ทราบวัน',
      day: '--',
      month: '',
      time: '',
    };
  }

  return {
    weekday: date.toLocaleDateString('th-TH', { weekday: 'long' }),
    day: date.toLocaleDateString('th-TH', { day: '2-digit' }),
    month: date.toLocaleDateString('th-TH', { month: 'long' }),
    time: date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
  };
};

const STATUS_LABEL = {
  scheduled: 'กำลังจะมาถึง',
  completed: 'เสร็จสิ้น',
  cancelled: 'ยกเลิก',
};

const BookingCard = ({ booking }) => {
  const parts = useMemo(() => formatBookingDateParts(booking.appointmentDate), [booking.appointmentDate]);
  const statusLabel = STATUS_LABEL[booking.status] ?? booking.status;

  return (
    <article className="flex flex-col gap-5 rounded-[32px] bg-white/90 p-6 shadow-lg shadow-[#3a6f86]/15 ring-1 ring-white/60 md:flex-row">
      <div className="flex flex-col items-center justify-center rounded-3xl bg-[#f1f7fb] px-6 py-4 text-center leading-tight shadow-inner shadow-white/40 md:w-28">
        <p className="text-xs text-[#6f8797]">{parts.weekday}</p>
        <p className="text-4xl font-semibold text-[#25445a]">{parts.day}</p>
        <p className="text-xs text-[#6f8797]">{parts.month}</p>
        <p className="mt-3 text-xs font-semibold text-[#1f6b7e]">{parts.time}</p>
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-lg font-semibold text-[#153744]">การดูแลกับ {booking.caregiver.name}</p>
          <span className="shrink-0 rounded-full bg-[#e6f6f4] px-4 py-1 text-xs font-semibold text-[#1f6b7e]">
            {statusLabel}
          </span>
        </div>
        <p className="text-sm text-[#45616e]">📍 {booking.hospital.name}</p>
        <p className="text-sm text-[#7a8e99]">ที่อยู่: {booking.address}</p>
        {booking.caregiver.specialty && (
          <p className="text-xs text-[#a0b2ba]">ความเชี่ยวชาญ: {booking.caregiver.specialty}</p>
        )}
      </div>
    </article>
  );
};

const SelectionSheet = ({ title, items, icon, visible, onSelect, onClose }) => {
  if (!visible) {
    return null;
  }

  const finalIcon = icon || '🏥';
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 pb-6" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-[#1b3d4f]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500 transition hover:text-gray-700"
            aria-label="ปิดหน้าต่างเลือก"
          >
            ×
          </button>
        </div>
        <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-2">
          {items.length === 0 && <p className="text-center text-sm text-gray-500">ยังไม่มีข้อมูล</p>}
          {items.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item)}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-left shadow-sm transition hover:border-[#1f6b7e]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow">
                {item.icon || finalIcon}
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-[#1b3d4f]">{item.name}</p>
                {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
              </div>
              <span className="text-xl text-[#1f6b7e]">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookingFormSheet = ({
  visible,
  form,
  onClose,
  onChange,
  onSubmit,
  onOpenHospital,
  onOpenCaregiver,
  submitState,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/30 px-4 pb-6" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-[36px] bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-[#1b3d4f]">จองคิว</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-3xl text-gray-500 transition hover:text-gray-700"
            aria-label="ปิดหน้าจองคิว"
          >
            ×
          </button>
        </div>

        <div className="mb-5 h-44 w-full rounded-[30px] bg-gradient-to-tr from-[#c9e8f3] via-[#e0f2f1] to-[#f6fbfa] p-4 shadow-inner">
          <div className="flex h-full flex-col justify-between">
            <p className="text-sm font-semibold text-[#356070]">ที่ตั้งการให้บริการ</p>
            <div className="text-sm text-[#5e7a89]">
              แผนที่ตัวอย่าง <span className="text-xs text-[#a3bbc6]">(เพื่ออ้างอิงการเดินทาง)</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-[#356070]">
              <span>🧭</span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">CareGo Map</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-[#4a6371]">
            ที่อยู่
            <textarea
              value={form.address}
              onChange={(event) => onChange('address', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-[#1b3d4f] focus:outline-none focus:ring-2 focus:ring-[#1f6b7e]"
              rows={2}
              placeholder="กรอกสถานที่ให้บริการ"
            />
          </label>

          <label className="block text-sm text-[#4a6371]">
            วัน / เวลา
            <input
              type="datetime-local"
              value={form.appointmentDate}
              onChange={(event) => onChange('appointmentDate', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-[#1b3d4f] focus:outline-none focus:ring-2 focus:ring-[#1f6b7e]"
            />
          </label>

          <div className="space-y-3">
            <button
              type="button"
              onClick={onOpenHospital}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-left text-[#1b3d4f] focus:outline-none focus:ring-2 focus:ring-[#1f6b7e]"
            >
              <div>
                <p className="text-xs text-[#7d9aa9]">โรงพยาบาล</p>
                <p className="text-base font-semibold">{form.hospital?.name || 'เลือกโรงพยาบาล'}</p>
              </div>
              <span className="text-xl text-[#1f6b7e]">›</span>
            </button>

            <button
              type="button"
              onClick={onOpenCaregiver}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-left text-[#1b3d4f] focus:outline-none focus:ring-2 focus:ring-[#1f6b7e]"
            >
              <div>
                <p className="text-xs text-[#7d9aa9]">ผู้ช่วยดูแล</p>
                <p className="text-base font-semibold">{form.caregiver?.name || 'เลือกผู้ช่วยดูแล'}</p>
              </div>
              <span className="text-xl text-[#1f6b7e]">›</span>
            </button>
          </div>

          <label className="block text-sm text-[#4a6371]">
            หมายเหตุเพิ่มเติม (ถ้ามี)
            <textarea
              value={form.notes}
              onChange={(event) => onChange('notes', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-100 bg-[#f6fbfb] px-4 py-3 text-[#1b3d4f] focus:outline-none focus:ring-2 focus:ring-[#1f6b7e]"
              rows={2}
              placeholder="ระบุข้อมูลเพิ่มเติมที่ผู้ช่วยควรทราบ"
            />
          </label>

          {submitState.error && <p className="text-sm text-red-500">{submitState.error}</p>}

          <button
            type="button"
            onClick={onSubmit}
            disabled={submitState.loading}
            className="w-full rounded-2xl bg-[#1f6b7e] py-3 text-lg font-semibold text-white shadow-lg shadow-[#1f6b7e]/30 transition hover:bg-[#15505e] disabled:cursor-not-allowed disabled:bg-[#84aeb8]"
          >
            {submitState.loading ? 'กำลังบันทึก...' : 'ยืนยันการจอง'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BookingPage({ user, onNavigate, displayName }) {
  const [bookings, setBookings] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [selectionSheet, setSelectionSheet] = useState(null);
  const [bookingForm, setBookingForm] = useState(createDefaultForm);
  const [submitState, setSubmitState] = useState({ loading: false, error: '' });
  const [toastMessage, setToastMessage] = useState('');

  const resolvedDisplayName = displayName || user?.full_name || user?.username || '';
  const avatarLetter = resolvedDisplayName ? resolvedDisplayName.charAt(0).toUpperCase() : '';

  const refreshBookings = useCallback(async () => {
    if (!user?.id) {
      setBookings([]);
      return;
    }
    setIsRefreshing(true);
    setFetchError('');
    try {
      const response = await fetch(`/api/users/${user.id}/bookings`);
      const data = await parseOrThrow(response, 'ไม่สามารถโหลดข้อมูลการจองได้');
      setBookings(
        normalizeBookings(data.bookings ?? []).sort(
          (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate),
        ),
      );
    } catch (error) {
      setFetchError(error.message || 'ไม่สามารถโหลดข้อมูลการจองได้');
    } finally {
      setIsRefreshing(false);
    }
  }, [user?.id]);

  const loadInitialData = useCallback(async () => {
    if (!user?.id) {
      setBookings([]);
      setHospitals([]);
      setCaregivers([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setFetchError('');
    try {
      const [hospitalResponse, caregiverResponse] = await Promise.all([fetch('/api/hospitals'), fetch('/api/caregivers')]);
      const hospitalData = await parseOrThrow(hospitalResponse, 'ไม่สามารถโหลดข้อมูลโรงพยาบาลได้');
      const caregiverData = await parseOrThrow(caregiverResponse, 'ไม่สามารถโหลดข้อมูลผู้ช่วยดูแลได้');

      setHospitals(hospitalData.hospitals ?? []);
      setCaregivers(caregiverData.caregivers ?? []);
      await refreshBookings();
    } catch (error) {
      setFetchError(error.message || 'ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  }, [refreshBookings, user?.id]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }
    const timer = setTimeout(() => setToastMessage(''), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (!isBooking) {
      setSelectionSheet(null);
      setSubmitState({ loading: false, error: '' });
    }
  }, [isBooking]);

  const handleOpenBooking = () => {
    setBookingForm(createDefaultForm());
    setSubmitState({ loading: false, error: '' });
    setIsBooking(true);
  };

  const handleBookingChange = (field, value) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = async () => {
    if (!user?.id) {
      return;
    }

    if (!bookingForm.address.trim() || !bookingForm.appointmentDate || !bookingForm.hospital || !bookingForm.caregiver) {
      setSubmitState({ loading: false, error: 'กรุณากรอกข้อมูลให้ครบ' });
      return;
    }

    setSubmitState({ loading: true, error: '' });

    try {
      const payload = {
        userId: user.id,
        hospitalId: bookingForm.hospital.id,
        caregiverId: bookingForm.caregiver.id,
        appointmentDate: bookingForm.appointmentDate,
        address: bookingForm.address.trim(),
        notes: bookingForm.notes,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      await parseOrThrow(response, 'ไม่สามารถจองคิวได้');

      await refreshBookings();
      setIsBooking(false);
      setBookingForm(createDefaultForm());
      setToastMessage('จองคิวสำเร็จ');
    } catch (error) {
      setSubmitState({ loading: false, error: error.message || 'ไม่สามารถจองคิวได้' });
      return;
    }

    setSubmitState({ loading: false, error: '' });
  };

  const handleSelectHospital = (hospital) => {
    setBookingForm((prev) => ({ ...prev, hospital }));
    setSelectionSheet(null);
  };

  const handleSelectCaregiver = (caregiver) => {
    setBookingForm((prev) => ({ ...prev, caregiver }));
    setSelectionSheet(null);
  };

  const hospitalOptions = hospitals.map((item) => ({
    ...item,
    subtitle: item.location,
    icon: '🏥',
  }));

  const caregiverOptions = caregivers.map((item) => ({
    ...item,
    subtitle: item.specialty,
    icon: '👩🏻‍⚕️',
  }));

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-sm text-gray-600">กำลังโหลดข้อมูล...</p>;
    }

    if (fetchError) {
      return (
        <div className="rounded-2xl bg-white/80 p-6 text-center text-sm text-red-600">
          <p>{fetchError}</p>
          <button
            type="button"
            onClick={loadInitialData}
            className="mt-4 rounded-full bg-[#1f6b7e] px-6 py-2 text-white"
          >
            โหลดอีกครั้ง
          </button>
        </div>
      );
    }

    if (bookings.length === 0) {
      return (
        <div className="rounded-3xl bg-white/80 p-6 text-center text-[#45616e]">
          <p className="text-base font-semibold">ยังไม่มีการจอง</p>
          <p className="text-sm text-[#7b92a0]">กดปุ่มด้านล่างเพื่อจองผู้ช่วยดูแล</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {isRefreshing && (
          <p className="text-center text-xs text-[#5b7b87]">กำลังอัปเดตรายการล่าสุด...</p>
        )}
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#cfe5e7] px-4 pb-40 pt-10 md:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <header className="rounded-[42px] bg-gradient-to-r from-[#3a6f86] to-[#6ea9ba] px-8 py-10 text-white shadow-[0_25px_60px_rgba(42,110,131,0.35)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-2xl font-semibold">
                {avatarLetter || ' '}
              </div>
              <div>
                <p className="text-sm text-white/80">ยินดีต้อนรับกลับ</p>
                <p className="text-2xl font-semibold">{resolvedDisplayName || ' '}</p>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
              🔔
            </div>
          </div>
        </header>

        <section className="-mt-12 rounded-[40px] bg-white/90 px-6 pb-16 pt-12 shadow-[0_25px_70px_rgba(31,107,126,0.25)] ring-1 ring-white/60 md:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#7b92a0]">คิวของคุณ</p>
              <h2 className="text-2xl font-semibold text-[#1b3d4f]">การจองทั้งหมด</h2>
            </div>
            <button
              type="button"
              onClick={handleOpenBooking}
              className="flex items-center gap-2 rounded-2xl bg-[#2c8199] px-6 py-3 text-white shadow-lg shadow-[#2c8199]/40 transition hover:bg-[#22667b]"
            >
              <span className="text-xl">＋</span>
              <span className="text-base font-semibold">จองคิว</span>
            </button>
          </div>

          {toastMessage && (
            <div className="mb-4 rounded-2xl bg-[#e7f6f8] px-6 py-3 text-center text-sm font-semibold text-[#1f6b7e] shadow">
              {toastMessage}
            </div>
          )}

          <div className="space-y-6">{renderContent()}</div>
        </section>
      </div>

      <NavigationBar activeKey="booking" onNavigate={onNavigate} />

      <BookingFormSheet
        visible={isBooking}
        form={bookingForm}
        onClose={() => setIsBooking(false)}
        onChange={handleBookingChange}
        onSubmit={handleBookingSubmit}
        onOpenHospital={() => setSelectionSheet('hospital')}
        onOpenCaregiver={() => setSelectionSheet('caregiver')}
        submitState={submitState}
      />

      <SelectionSheet
        title="โรงพยาบาล"
        items={hospitalOptions}
        visible={selectionSheet === 'hospital'}
        onClose={() => setSelectionSheet(null)}
        onSelect={handleSelectHospital}
      />

      <SelectionSheet
        title="ผู้ช่วยดูแล"
        items={caregiverOptions}
        icon="👩🏻‍⚕️"
        visible={selectionSheet === 'caregiver'}
        onClose={() => setSelectionSheet(null)}
        onSelect={handleSelectCaregiver}
      />
    </div>
  );
}
