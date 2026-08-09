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

