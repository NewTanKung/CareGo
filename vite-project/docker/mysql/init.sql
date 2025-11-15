CREATE DATABASE IF NOT EXISTS carego CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE carego;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  password_plain VARCHAR(255),
  status TINYINT DEFAULT 1,
  full_name VARCHAR(255),
  gender VARCHAR(50),
  phone VARCHAR(50),
  emergency VARCHAR(255),
  height_cm DECIMAL(5,2),
  weight_kg DECIMAL(5,2),
  blood_type VARCHAR(50),
  chronic_dise TEXT,
  food_allerg TEXT,
  drug_allerg TEXT,
  surgery_hist TEXT,
  health_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
