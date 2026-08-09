# 🏫 School Communication Management System

A full-stack web application designed to help educational institutions manage and distribute school communications efficiently.

The system provides administrators with a centralized platform to create, manage, monitor, and distribute important school communications and notifications.

---

## ✨ Features

### 🔐 Authentication
- Secure user authentication
- Protected API routes
- JWT-based authorization

### 📢 Communication Management
- Create school communications
- View communications
- Delete communications
- Communication status management
- Priority management
- Academic year association
- Publish and expiry dates
- Acknowledgement requirement

### 🔎 Search & Filtering
- Search by title
- Search by content
- Search by communication type
- Search by creator
- Filter by status
- Filter by priority

### 🔔 Notifications
- Automatic notification creation
- Notifications linked with communications
- User-specific notification records

### 📊 Dashboard
- Communication statistics
- Published communications
- Scheduled communications
- Draft communications

---

## 🛠️ Technology Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database

- PostgreSQL

---

## 🏗️ Project Architecture

```text
SchoolCommunicationSystem
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── db
│   ├── server.js
│   └── package.json
│
└── README.md

## 🚀 How to Run the Project

### Prerequisites
- Node.js
- npm
- PostgreSQL
- Git

### 1. Clone the Repository
git clone https://github.com/Faraztamboli7/SchoolCommunicationSystem.git
cd SchoolCommunicationSystem

### 2. Backend Setup
cd backend
npm install

# Configure PostgreSQL database
# Update database credentials in the backend configuration

npm start

Backend will run on:
http://localhost:5000

### 3. Frontend Setup
Open a new terminal:

cd frontend
npm install
npm run dev

Frontend will run on:
http://localhost:5173

### 4. Database
Make sure PostgreSQL is running before starting the backend.

### 5. Application
Open the frontend URL in your browser:
http://localhost:5173
