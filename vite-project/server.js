import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = Number(process.env.API_PORT) || 3000;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : true;

app.use(cors({ origin: corsOrigins }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'carego',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const HOSPITAL_SEED = [
  { name: 'โรงพยาบาล A', location: 'เขตเมือง' },
  { name: 'โรงพยาบาล B', location: 'เหนือเมือง' },
  { name: 'โรงพยาบาล C', location: 'ฝั่งตะวันออก' },
  { name: 'โรงพยาบาล D', location: 'ฝั่งตะวันตก' },
];

const CAREGIVER_SEED = [
  { name: 'พยาบาล กานต์พิชชา', specialty: 'ดูแลผู้สูงอายุ' },
  { name: 'พยาบาล ปาริฉัตร', specialty: 'เวชศาสตร์ผู้สูงวัย' },
  { name: 'ผู้ช่วย สุภาพร', specialty: 'กายภาพบำบัด' },
  { name: 'ผู้ช่วย กัญญาภัค', specialty: 'ดูแลหลังผ่าตัด' },
];

const buildInsertStatement = (items, columns) => {
  const placeholders = items.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
  const values = items.flatMap((item) => columns.map((col) => item[col] ?? null));
  return { placeholders, values };
};

const ensureSchema = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS hospitals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS caregivers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      specialty VARCHAR(255),
      avatar_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      hospital_id INT NOT NULL,
      caregiver_id INT NOT NULL,
      appointment_date DATETIME NOT NULL,
      address VARCHAR(255) NOT NULL,
      notes TEXT,
      status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_bookings_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE RESTRICT,
      CONSTRAINT fk_bookings_caregiver FOREIGN KEY (caregiver_id) REFERENCES caregivers(id) ON DELETE RESTRICT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  const [[{ count: hospitalCount }]] = await pool.query('SELECT COUNT(*) AS count FROM hospitals');
  if (hospitalCount === 0) {
    const { placeholders, values } = buildInsertStatement(HOSPITAL_SEED, ['name', 'location']);
    await pool.query(`INSERT INTO hospitals (name, location) VALUES ${placeholders}`, values);
  }

  const [[{ count: caregiverCount }]] = await pool.query('SELECT COUNT(*) AS count FROM caregivers');
  if (caregiverCount === 0) {
    const { placeholders, values } = buildInsertStatement(CAREGIVER_SEED, ['name', 'specialty']);
    await pool.query(`INSERT INTO caregivers (name, specialty) VALUES ${placeholders}`, values);
  }
};

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้/อีเมลและรหัสผ่าน' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT id, email, username, password_hash
         FROM users
         WHERE email = ? OR username = ?
         LIMIT 1`,
      [email, email],
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'ไม่พบผู้ใช้งานนี้' });
    }

    const user = rows[0];
    const storedSecret = user.password_hash ?? user.password_plain ?? '';

    let isMatch = false;
    if (storedSecret.startsWith('$2')) {
      isMatch = await bcrypt.compare(password, storedSecret);
    } else {
      isMatch = password === storedSecret;
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    const { password_hash, password_plain, ...safeUser } = user;

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      user: safeUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์', error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, email, password, status = 1 } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้ อีเมล และรหัสผ่าน' });
  }

  try {
    const normalizedStatus = Number(status) === 0 ? 0 : 1;
    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (username, email, password_hash, status)
       VALUES (?, ?, ?, ?)`,
      [username.trim(), email.trim(), passwordHash, normalizedStatus],
    );

    res.status(201).json({
      message: 'สร้างผู้ใช้สำเร็จ',
      userId: result.insertId,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: error.message.includes('username') ? 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' : 'อีเมลนี้ถูกใช้แล้ว',
      });
    }

    console.error('Create user error:', error);
    res.status(500).json({ message: 'ไม่สามารถสร้างผู้ใช้ได้', error: error.message });
  }
});

app.get('/api/hospitals', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, location, created_at
         FROM hospitals
         ORDER BY name ASC`,
    );
    res.json({ hospitals: rows });
  } catch (error) {
    console.error('Fetch hospitals error:', error);
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลโรงพยาบาลได้', error: error.message });
  }
});

app.get('/api/caregivers', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, specialty, avatar_url, created_at
         FROM caregivers
         ORDER BY name ASC`,
    );
    res.json({ caregivers: rows });
  } catch (error) {
    console.error('Fetch caregivers error:', error);
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลผู้ช่วยดูแลได้', error: error.message });
  }
});

app.get('/api/users/:userId/bookings', async (req, res) => {
  const userId = Number(req.params.userId);
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ message: 'รหัสผู้ใช้ไม่ถูกต้อง' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT
          b.id,
          b.address,
          b.notes,
          b.status,
          b.appointment_date,
          h.id AS hospital_id,
          h.name AS hospital_name,
          h.location AS hospital_location,
          c.id AS caregiver_id,
          c.name AS caregiver_name,
          c.specialty AS caregiver_specialty
        FROM bookings b
        JOIN hospitals h ON b.hospital_id = h.id
        JOIN caregivers c ON b.caregiver_id = c.id
        WHERE b.user_id = ?
        ORDER BY b.appointment_date ASC`,
      [userId],
    );
    res.json({ bookings: rows });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลการจองได้', error: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { userId, hospitalId, caregiverId, appointmentDate, address, notes = '' } = req.body;

  const numericUserId = Number(userId);
  const numericHospitalId = Number(hospitalId);
  const numericCaregiverId = Number(caregiverId);
  const appointment = new Date(appointmentDate);

  if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
    return res.status(400).json({ message: 'รหัสผู้ใช้ไม่ถูกต้อง' });
  }

  if (!Number.isInteger(numericHospitalId) || numericHospitalId <= 0) {
    return res.status(400).json({ message: 'โรงพยาบาลไม่ถูกต้อง' });
  }

  if (!Number.isInteger(numericCaregiverId) || numericCaregiverId <= 0) {
    return res.status(400).json({ message: 'ผู้ช่วยดูแลไม่ถูกต้อง' });
  }

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ message: 'กรุณากรอกที่อยู่' });
  }

  if (Number.isNaN(appointment.getTime())) {
    return res.status(400).json({ message: 'วันและเวลาไม่ถูกต้อง' });
  }

  try {
    const [insertResult] = await pool.query(
      `INSERT INTO bookings (user_id, hospital_id, caregiver_id, appointment_date, address, notes)
         VALUES (?, ?, ?, ?, ?, ?)`,
      [numericUserId, numericHospitalId, numericCaregiverId, appointment, address.trim(), notes],
    );

    const [[booking]] = await pool.query(
      `SELECT
          b.id,
          b.address,
          b.notes,
          b.status,
          b.appointment_date,
          h.id AS hospital_id,
          h.name AS hospital_name,
          h.location AS hospital_location,
          c.id AS caregiver_id,
          c.name AS caregiver_name,
          c.specialty AS caregiver_specialty
        FROM bookings b
        JOIN hospitals h ON b.hospital_id = h.id
        JOIN caregivers c ON b.caregiver_id = c.id
        WHERE b.id = ?`,
      [insertResult.insertId],
    );

    res.status(201).json({
      message: 'สร้างการจองสำเร็จ',
      booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'ไม่สามารถสร้างการจองได้', error: error.message });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: 'ไม่พบบริการที่เรียกใช้งาน' });
});

const startServer = async () => {
  try {
    await ensureSchema();
    app.listen(PORT, () => {
      console.log(`Auth API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize API:', error);
    process.exit(1);
  }
};

startServer();
