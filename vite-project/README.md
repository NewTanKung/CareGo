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

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/api/health` | Quick MySQL connectivity check. |
| POST | `/api/login` | Accepts `{ email, password }` and returns user data if credentials are valid. |
| POST | `/api/users` | Registers a new user (username, email, password). |
| GET | `/api/hospitals` | Returns the master hospital list (auto-seeded on first run). |
| GET | `/api/caregivers` | Returns the available caregiver list (auto-seeded on first run). |
| GET | `/api/users/:userId/bookings` | Returns every appointment booking for the specified user (joined with hospital & caregiver info). |
| POST | `/api/bookings` | Creates a new booking. Requires `{ userId, hospitalId, caregiverId, appointmentDate, address, notes? }`. |

The login handler compares the password using bcrypt when a hash (`password_hash`) exists and falls back to a plain-text comparison (`password` column) so that it works with both hashed and legacy records.

### Booking data bootstrap

`server.js` now ensures that three tables (`hospitals`, `caregivers`, and `bookings`) exist and seeds the hospital/caregiver tables with a small starter list for development. This logic runs automatically before the Express app starts listening, so you only need to run migrations manually when you want to customize the data.

## Frontend behavior

- The login form now makes a real request to `/api/login`.
- A loading state disables the submit button, while success/error messages appear under the form.
- Successful responses log the sanitized user payload to the browser console for further handling (e.g., storing a token or redirecting).
- After logging in you can switch to the **จองคิว/เวลา** tab to view every booking tied to the logged-in user, and submit a new booking with address, date/time, hospital, and caregiver selections. The form talks to the new booking endpoints and refreshes automatically after a booking is created.

## Frontend behavior

- The login form now makes a real request to `/api/login`.
- A loading state disables the submit button, while success/error messages appear under the form.
- Successful responses log the sanitized user payload to the browser console for further handling (e.g., storing a token or redirecting).

## Docker Compose stack

This repo now provides a full stack Docker setup that builds the React frontend, runs the Express API, and provisions a MySQL instance.

1. Ensure Docker Desktop (or the Docker Engine + Compose plugin) is installed and running.
2. From the `vite-project` directory run:
   ```bash
   docker compose up --build -d
   ```
3. Visit `http://localhost:8080` for the frontend. The API is reachable on `http://localhost:3000`, and MySQL accepts connections on `localhost:3306` (user: `carego`, password: `carego123`).
4. Tail container logs if needed:
   ```bash
   docker compose logs -f backend
   ```
5. Stop everything with:
   ```bash
   docker compose down
   ```

Notes:

- The frontend image is built once and served by Nginx, which also proxies `/api/*` calls to the backend container, so no code changes are required.
- `docker/mysql/init.sql` makes sure the `users` table exists before the API attempts to create tables with foreign keys.
- Change credentials or exposed ports by editing `docker-compose.yml` before running `docker compose up`.
