import { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import BookingPage from './pages/BookingPage.jsx';

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
  const [profileName, setProfileName] = useState('');
  const [profileGender, setProfileGender] = useState('หญิง');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileEmergencyContact, setProfileEmergencyContact] = useState('');
  const [healthInfo, setHealthInfo] = useState({
    height_cm: '',
    weight_kg: '',
    blood_type: '',
    chronic_dise: '',
    food_allerg: '',
    drug_allerg: '',
    surgery_hist: '',
    health_note: '',
  });

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
      setProfileName(result.user?.full_name || '');
      setProfileGender(result.user?.gender || 'หญิง');
      setProfilePhone(result.user?.phone || '');
      setProfileEmergencyContact(result.user?.emergency || '');
      setHealthInfo({
        height_cm: result.user?.height_cm ?? '',
        weight_kg: result.user?.weight_kg ?? '',
        blood_type: result.user?.blood_type ?? '',
        chronic_dise: result.user?.chronic_dise ?? '',
        food_allerg: result.user?.food_allerg ?? '',
        drug_allerg: result.user?.drug_allerg ?? '',
        surgery_hist: result.user?.surgery_hist ?? '',
        health_note: result.user?.health_note ?? '',
      });
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

  const handleNavigation = (page) => {
    if (!currentUser) {
      return;
    }

    if (page === 'home' || page === 'profile' || page === 'booking') {
      setMode(page);
    }
  };

  const handleHealthInfoChange = (key, value) => {
    setHealthInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resolvedDisplayName = profileName || currentUser?.full_name || '';

  if (mode === 'home' && currentUser) {
    return (
      <HomePage
        user={currentUser}
        displayName={resolvedDisplayName}
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />
    );
  }

  if (mode === 'booking' && currentUser) {
    return <BookingPage user={currentUser} displayName={resolvedDisplayName} onNavigate={handleNavigation} />;
  }

  if (mode === 'profile' && currentUser) {
    return (
      <ProfilePage
        user={currentUser}
        profileName={profileName}
        profileGender={profileGender}
        profilePhone={profilePhone}
        profileEmergencyContact={profileEmergencyContact}
        onProfileNameChange={setProfileName}
        onProfileGenderChange={setProfileGender}
        onProfilePhoneChange={setProfilePhone}
        onProfileEmergencyContactChange={setProfileEmergencyContact}
        healthInfo={healthInfo}
        onHealthInfoChange={handleHealthInfoChange}
        onNavigate={handleNavigation}
      />
    );
  }

  if (mode === 'create') {
    return (
      <RegisterPage
        newUsername={newUsername}
        newEmail={newEmail}
        newPassword={newPassword}
        newConfirmPassword={newConfirmPassword}
        newShowPassword={newShowPassword}
        isCreating={isCreating}
        onSubmit={handleCreateUser}
        onBack={() => switchMode('login')}
        onToggleShowPassword={() => setNewShowPassword((prev) => !prev)}
        onUsernameChange={setNewUsername}
        onEmailChange={setNewEmail}
        onPasswordChange={setNewPassword}
        onConfirmPasswordChange={setNewConfirmPassword}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    );
  }

  return (
    <LoginPage
      email={email}
      password={password}
      showPassword={showPassword}
      isLoading={isLoading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onToggleShowPassword={() => setShowPassword((prev) => !prev)}
      onSubmit={handleSubmit}
      onSwitchMode={() => switchMode('create')}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
}
