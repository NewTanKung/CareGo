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
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootadmin',
  database: process.env.DB_NAME || 'CareGoDB',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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
      `SELECT id, email, username, password_hash, password AS password_plain
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

app.use((_req, res) => {
  res.status(404).json({ message: 'ไม่พบบริการที่เรียกใช้งาน' });
});

app.listen(PORT, () => {
  console.log(`Auth API running on http://localhost:${PORT}`);
});
