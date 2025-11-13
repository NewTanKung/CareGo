# CareGo Login Prototype

This project now bundles a Vite + React frontend together with a lightweight Express API that authenticates users against a MySQL database.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**  
   Copy `.env.example` to `.env` and fill in your MySQL connection info.
   ```
   API_PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=carego
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Start the API server**
   ```bash
   npm run server
   ```

4. **Start the Vite dev server** (separate terminal)
   ```bash
   npm run dev
   ```

The Vite dev server proxies every request beginning with `/api` to `http://localhost:3000`, so the React app can call `POST /api/login` without worrying about ports.

## API endpoints

| Method | Path        | Description                                            |
| ------ | ----------- | ------------------------------------------------------ |
| GET    | `/api/health` | Quick MySQL connectivity check.                        |
| POST   | `/api/login`  | Accepts `{ email, password }` and returns user data if credentials are valid. |

The login handler compares the password using bcrypt when a hash (`password_hash`) exists and falls back to a plain-text comparison (`password` column) so that it works with both hashed and legacy records.

## Frontend behavior

- The login form now makes a real request to `/api/login`.
- A loading state disables the submit button, while success/error messages appear under the form.
- Successful responses log the sanitized user payload to the browser console for further handling (e.g., storing a token or redirecting).
