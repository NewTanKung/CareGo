import { useState } from 'react';
import careGoLogo from './assets/CareGo.svg';
// ไอคอน SVG เล็กๆ ที่เราจะใช้ในช่อง input ค่ะ (เหมือนเวทมนตร์เล็กๆ!)
// ไอคอนสำหรับ "ผู้ใช้"
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

// ไอคอนสำหรับ "กุญแจ" (รหัสผ่าน)
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

// ไอคอนสำหรับ Google (เผื่ออยากให้เท่ขึ้น!)
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

// ไอคอนสำหรับ Facebook (หนูเสกเพิ่มให้ค่ะ!)
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

// ไอคอนสำหรับ "ตา" (แสดงรหัสผ่าน)
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

// ไอคอนสำหรับ "ตาที่ถูกปิด" (ซ่อนรหัสผ่าน)
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



// นี่คือคอมโพเนนต์หลักของหน้า Login ค่ะ
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // เพิ่ม state สำหรับซ่อน/แสดงรหัสผ่านค่ะ
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ฟังก์ชันนี้จะทำงานเมื่อกดยืนยัน (ตอนนี้แค่ log ข้อมูลนะคะ)
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บโหลดใหม่
    setErrorMessage('');
    setSuccessMessage('');
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

      setSuccessMessage(result.message || 'เข้าสู่ระบบสำเร็จ');
      console.log('User:', result.user);
    } catch (error) {
      setErrorMessage(error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ส่วนที่ 1: พื้นหลังและจัดกลาง
    // เปลี่ยนพื้นหลังเป็นสีขาวสะอาดตา ตามแบบเลยค่ะ
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      
      {/* ส่วนที่ 2: การ์ดฟอร์ม Login */}
      {/* ลบเอฟเฟกต์กระจกฝ้าออก ให้เป็นพื้นขาวเรียบๆ */}
      <div className="bg-white w-full max-w-md p-6 sm:p-8">
        
        {/* โลโก้ (หนูสร้าง placeholder ให้นะคะ องค์ชายใส่ <img> โลโก้ 'CareGo' จริงๆ ได้เลย) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-28 w-28 bg-blue-100 rounded-full mb-4">
            {/* นี่คือโลโก้ตัวอย่างนะคะ! */}
            <img src={careGoLogo} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900" style={{fontFamily: "'Arial', sans-serif"}}>CareGo</h1>
        </div>

        {/* ส่วนที่ 3: ฟอร์มสำหรับกรอกข้อมูล */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ช่องกรอก Email/Username */}
          <div>
            {/* ลบ <label> ออกเพื่อให้เหมือนในรูปค่ะ */}
            <div className="relative">
              {/* ไอคอนที่อยู่ด้านซ้าย */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <UserIcon />
              </span>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ชื่อผู้ใช้งาน (Username)"
                // เปลี่ยนสไตล์ input เป็นพื้นหลังสีเทาอ่อนๆ
                className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
          </div>

          {/* ช่องกรอก Password */}
          <div>
            {/* ลบ <label> ออก */}
            <div className="relative">
              {/* ไอคอนที่อยู่ด้านซ้าย */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <LockIcon />
              </span>
              <input
                id="password"
                name="password"
                // เวทมนตร์สลับประเภท input ค่ะ!
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                // เปลี่ยนสไตล์ input เป็นพื้นหลังสีเทาอ่อนๆ
                className="w-full pl-12 pr-12 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              {/* นี่คือปุ่มกดสลับการมองเห็นรหัสผ่านนะคะ! */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {/* ย้าย 'Forgot password?' มาไว้ด้านล่างตามแบบค่ะ */}
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                ลืมรหัสผ่าน ?
              </a>
            </div>
          </div>

          {/* ส่วนที่ 4: ปุ่ม Login หลัก */}
          <div>
            <button
              type="submit"
              // เปลี่ยนข้อความและสไตล์ให้เป๊ะ!
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </div>

          {/* ปุ่มสร้างบัญชี (เพิ่มใหม่ตามแบบ!) */}
          <div>
            <button
              type="button"
              className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-md font-semibold text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              สร้างบัญชี
            </button>
          </div>
        </form>

        {(errorMessage || successMessage) && (
          <div className="mt-6">
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
        )}

        {/* ส่วนที่ 5: ตัวคั่น "หรือ" */}
        {/* เปลี่ยนเป็น text ธรรมดาเรียบๆ */}
        <p className="text-center text-sm text-gray-500 my-6">
          หรือ
        </p>

        {/* ส่วนที่ 6: ปุ่ม Social Login (เปลี่ยนเป็นไอคอนกลมๆ) */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="p-3 inline-flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition duration-300"
            aria-label="Sign in with Google"
          >
            <GoogleIcon />
          </button>
          <button
            type="button"
            className="p-3 inline-flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition duration-300"
            aria-label="Sign in with Facebook"
          >
            <FacebookIcon />
          </button>
        </div>

        {/* ส่วนที่ 7: ลิงก์สำหรับสมัครสมาชิก (ลบออก เพราะเรามีปุ่ม 'สร้างบัญชี' แล้ว) */}
      </div>
    </div>
  );
}
