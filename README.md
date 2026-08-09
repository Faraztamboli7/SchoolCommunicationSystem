# 🏫 School Communication Management System

> A full-stack web application for managing, publishing, and tracking school communications through a centralized platform.

[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react\&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite\&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express.js-000000?logo=express\&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql\&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens\&logoColor=white)](https://jwt.io/)

---

## 📌 Overview

The **School Communication Management System** is a full-stack web application designed to help educational institutions manage school-wide communications efficiently.

The system provides administrators with a centralized interface to create, manage, publish, monitor, and distribute important announcements and notifications.

It includes authentication, role-based access, communication management, search and filtering, notifications, acknowledgement tracking, and dashboard statistics.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Secure login system
* JWT-based authentication
* Protected API routes
* Role-based access control
* Persistent authentication using browser local storage
* Password hashing using `bcryptjs`

### 📢 Communication Management

Administrators can:

* Create communications
* Edit/manage communication content
* View communications
* Delete communications
* Manage communication status
* Set communication priority
* Associate communications with an academic year
* Set publishing dates
* Set expiry dates
* Mark communications as requiring acknowledgement

### 🔎 Search & Filtering

Communications can be searched and filtered by:

* Title
* Content
* Communication type
* Creator
* Status
* Priority

### 🔔 Notification System

* Automatic notification creation
* Notifications linked to communications
* User-specific notification records
* Read/unread notification handling

### 📊 Dashboard

The dashboard provides an overview of:

* Total communications
* Published communications
* Scheduled communications
* Draft communications
* Communication statistics

### 🎨 Modern Frontend

* Responsive React interface
* Tailwind CSS styling
* React Router navigation
* Toast notifications
* Icons using Lucide React
* Charts and data visualization using Recharts
* Animations using Framer Motion

---

# 🛠️ Technology Stack

## Frontend

| Technology      | Purpose             |
| --------------- | ------------------- |
| React.js        | User interface      |
| Vite            | Frontend build tool |
| JavaScript      | Application logic   |
| Tailwind CSS    | Styling             |
| Axios           | API communication   |
| React Router    | Client-side routing |
| React Hot Toast | Notifications       |
| Lucide React    | Icons               |
| Framer Motion   | UI animations       |
| Recharts        | Data visualization  |

## Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | JavaScript runtime         |
| Express.js | REST API framework         |
| PostgreSQL | Relational database        |
| `pg`       | PostgreSQL connectivity    |
| JWT        | Authentication             |
| bcryptjs   | Password hashing           |
| CORS       | Cross-origin communication |
| dotenv     | Environment configuration  |

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────────┐
                    │        User / Admin      │
                    │        Web Browser       │
                    └────────────┬─────────────┘
                                 │
                                 │ HTTP / REST
                                 ▼
                    ┌──────────────────────────┐
                    │       React Frontend     │
                    │   React + Vite + Tailwind│
                    └────────────┬─────────────┘
                                 │
                              Axios
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Express Backend      │
                    │       REST API           │
                    └────────────┬─────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
          Authentication   Communications   Notifications
             + JWT              API              API
                │                │                │
                └────────────────┼────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       PostgreSQL         │
                    │         Database         │
                    └──────────────────────────┘
```

---

# 📂 Project Structure

```text
SchoolCommunicationSystem/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── db/
│   │   └── database.js
│   ├── middleware/
│   ├── routes/
│   ├── createTestStudent.js
│   ├── seedAdmin.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🚀 Running the Project Locally

Follow the steps below to run the complete application.

## 1. Prerequisites

Install the following software before starting:

* **Node.js** (LTS recommended)
* **npm**
* **PostgreSQL**
* **Git**
* **pgAdmin** (optional, but recommended for database management)

Verify Node.js and npm:

```bash
node --version
npm --version
```

Verify Git:

```bash
git --version
```

---

# 2. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/Faraztamboli7/SchoolCommunicationSystem.git
```

Navigate into the project:

```bash
cd SchoolCommunicationSystem
```

---

# 🗄️ 3. PostgreSQL Database Setup

The backend uses PostgreSQL and reads the database connection from environment variables.

Create a PostgreSQL database for the project.

For example:

```sql
CREATE DATABASE school_communication;
```

Open the database using pgAdmin or `psql`.

> **Important:** The application expects the required database tables (`users`, communications-related tables, notification-related tables, etc.) to exist before using the application.

If a schema/migration SQL file is added to the repository, run that SQL file against the newly created database before starting the backend.

Example:

```bash
psql -U postgres -d school_communication -f path/to/schema.sql
```

---

# 🔑 4. Backend Environment Variables

Navigate to the backend:

```bash
cd backend
```

Create a file named:

```text
.env
```

Add your PostgreSQL configuration:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=school_communication
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432

JWT_SECRET=YOUR_SECRET_KEY
```

### Environment Variables

| Variable      | Description                            |
| ------------- | -------------------------------------- |
| `PORT`        | Backend server port                    |
| `DB_USER`     | PostgreSQL username                    |
| `DB_HOST`     | PostgreSQL host                        |
| `DB_NAME`     | PostgreSQL database name               |
| `DB_PASSWORD` | PostgreSQL password                    |
| `DB_PORT`     | PostgreSQL port                        |
| `JWT_SECRET`  | Secret key used for JWT authentication |

> ⚠️ Never commit your real `.env` file or database password to GitHub.

---

# ⚙️ 5. Install Backend Dependencies

From the `backend` directory:

```bash
npm install
```

The backend provides the following scripts:

```bash
npm start
```

or for development:

```bash
npm run dev
```

The backend uses:

```text
http://localhost:5000
```

---

# 👤 6. Create Test Accounts

The repository includes scripts for creating test users.

## Create Admin

From the `backend` directory:

```bash
node seedAdmin.js
```

The seed script creates:

```text
Email:    admin@school.com
Password: admin123
Role:     ADMIN
```

If the admin already exists, the script will report that the account already exists.

## Create Test Student

Run:

```bash
node createTestStudent.js
```

The test student credentials are:

```text
Email:    student@school.com
Password: Student@123
Role:     STUDENT
```

> These credentials are intended for local testing/demo purposes only.

---

# ▶️ 7. Start the Backend

From:

```text
SchoolCommunicationSystem/backend
```

Run:

```bash
npm start
```

You should see:

```text
🚀 Server running on http://localhost:5000
```

The backend also provides a health-check endpoint:

```text
http://localhost:5000/api/health
```

A successful response confirms that the backend and PostgreSQL connection are working.

Example response:

```json
{
  "success": true,
  "message": "Backend is running",
  "database": "Connected"
}
```

---

# 💻 8. Start the Frontend

Open a **new terminal window**.

Navigate to the project:

```bash
cd SchoolCommunicationSystem/frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local URL in the terminal.

The default development URL is:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# 🔄 9. Frontend ↔ Backend Connection

The frontend communicates with the backend using Axios.

The API base URL is:

```text
http://localhost:5000/api
```

Therefore, both servers must be running:

```text
Frontend
http://localhost:5173
        │
        │ Axios / REST API
        ▼
Backend
http://localhost:5000
        │
        ▼
PostgreSQL
```

---

# 🧪 10. Quick Verification

After starting both servers, verify the following:

### Backend

Open:

```text
http://localhost:5000/api/health
```

Expected:

```text
Backend is running
Database: Connected
```

### Frontend

Open:

```text
http://localhost:5173
```

### Login

Use the test accounts:

**Admin**

```text
Email: admin@school.com
Password: admin123
```

**Student**

```text
Email: student@school.com
Password: Student@123
```

---

# 🔌 API Overview

The backend exposes REST API endpoints under:

```text
/api
```

### Authentication

```text
POST /api/auth/login
GET  /api/auth/me
```

### Communications

```text
/api/communications
```

Used for communication creation, retrieval, management, filtering, publishing, and deletion.

### Notifications

```text
/api/notifications
```

Used for retrieving and managing user notifications.

### Health Check

```text
GET /api/health
```

Used to verify that the backend and PostgreSQL database are available.

---

# 🔐 Authentication Flow

The application uses JWT-based authentication.

```text
User Login
    │
    ▼
POST /api/auth/login
    │
    ▼
Backend validates credentials
    │
    ▼
JWT token generated
    │
    ▼
Token stored in browser
    │
    ▼
Axios interceptor attaches token
    │
    ▼
Protected API request
    │
    ▼
JWT middleware validates token
    │
    ▼
Authorized response
```

---

# 🛡️ Security Features

* JWT-based authentication
* Protected API routes
* Password hashing with bcrypt
* Role-based authorization
* Environment-based database credentials
* CORS configuration
* Authentication token attached to protected requests

---

# 📊 Main Application Modules

| Module           | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| Authentication   | Login and user authorization                    |
| Dashboard        | Overview and statistics                         |
| Communications   | Create and manage school communications         |
| Search & Filters | Find communications efficiently                 |
| Notifications    | Manage user-specific notifications              |
| User Roles       | Differentiate administrative and student access |
| PostgreSQL       | Persistent application data                     |

---

# 🧩 Backend Architecture

The backend follows a modular structure:

```text
backend/
│
├── controllers/
│   └── Request/business logic
│
├── routes/
│   └── API endpoint definitions
│
├── middleware/
│   └── Authentication and authorization
│
├── db/
│   └── PostgreSQL connection
│
├── server.js
│   └── Express application entry point
│
├── seedAdmin.js
│   └── Creates admin test account
│
└── createTestStudent.js
    └── Creates student test account
```

---

# 🎨 Frontend Architecture

```text
frontend/
│
├── src/
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── pages/
│   │   └── Application pages
│   │
│   ├── services/
│   │   └── API communication
│   │
│   └── App.jsx
│       └── Main React application
│
└── package.json
```

---

# 📜 Available Scripts

## Backend

```bash
npm start
```

Starts the production-style Node/Express server.

```bash
npm run dev
```

Starts the backend using Nodemon for development.

## Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

---

# 🐛 Troubleshooting

## Backend cannot connect to PostgreSQL

Check:

* PostgreSQL is running
* Database name is correct
* Username is correct
* Password is correct
* Port is correct
* `.env` is inside the `backend` directory

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_communication
DB_USER=postgres
DB_PASSWORD=your_password
```

---

## Frontend shows API/network errors

Make sure the backend is running:

```text
http://localhost:5000
```

Then verify:

```text
http://localhost:5000/api/health
```

Also make sure the frontend is running on the expected Vite port.

---

## Login does not work

Make sure the test account has been created:

```bash
cd backend
node seedAdmin.js
```

or:

```bash
node createTestStudent.js
```

Then use the credentials listed above.

---

## Port 5000 is already in use

Change the backend port in `.env`:

```env
PORT=5001
```

If you change the backend port, also update the frontend API URL in:

```text
frontend/src/services/api.js
```

---

# 🚀 Future Improvements

Potential improvements include:

* Email notifications
* Push notifications
* File/document attachments
* Advanced user management
* Student/teacher profile management
* Communication acknowledgement reports
* Scheduled notification delivery
* Audit logs
* Pagination for large datasets
* Automated database migrations
* Automated testing
* Docker-based deployment
* Cloud deployment and CI/CD

---

# 📌 Important Notes for Evaluators

This project is configured as a **local full-stack application**.

To run it successfully:

1. Install Node.js and PostgreSQL.
2. Clone the repository.
3. Create the PostgreSQL database.
4. Configure `backend/.env`.
5. Ensure the required database schema/tables exist.
6. Run `npm install` inside `backend`.
7. Create the test admin/student if required.
8. Start the backend.
9. Open another terminal.
10. Run `npm install` inside `frontend`.
11. Start the frontend using `npm run dev`.
12. Open the Vite URL in a browser.

### Default Local URLs

| Service              | URL                                |
| -------------------- | ---------------------------------- |
| Frontend             | `http://localhost:5173`            |
| Backend              | `http://localhost:5000`            |
| Backend Health Check | `http://localhost:5000/api/health` |

---

# 👨‍💻 Author

**Faraz Tamboli**

Computer Engineering Student

GitHub: [FarazTamboli7](https://github.com/Faraztamboli7)

---

# 📄 License

This project was developed as an academic/task submission project.

---
