# 🎓 EduBridge -- Tutor Finding & Management System

EduBridge is a comprehensive full-stack web application built with the
MERN (MongoDB, Express, React, Node.js) stack.\
It bridges the gap between guardians seeking quality education for their
children and skilled tutors looking for teaching opportunities in
Bangladesh.

The platform features secure authentication, role-based dashboards,
tuition (ad) management, notifications, and a fully responsive modern
UI.

![EduBridge Preview](https://tutor-management-dj33.onrender.com/)

------------------------------------------------------------------------

## 🌐 Overview

EduBridge supports three user roles:

-   👨‍🏫 Tutors\
-   👨‍👩‍👧‍👦 Guardians\
-   👑 Admins

Each role has a dedicated dashboard with specific permissions powered by
Role-Based Access Control (RBAC).

------------------------------------------------------------------------

## ✨ Features

### 🛡️ Authentication & Security

-   JWT + HTTP-Only Cookies (No localStorage token storage)
-   Role-Based Access Control (RBAC)
-   Encrypted Passwords using Bcrypt.js
-   Protected API & Frontend Routes

------------------------------------------------------------------------

### 👨‍🏫 Tutor Features

-   Profile Management (City, Institution, Department, Contact Info)
-   Select up to 5 Teaching Topics
-   Browse Tuition Feed
-   Express Interest in Guardian Ads
-   Upload Profile Avatar (Supabase Storage)
-   Real-Time Notifications

------------------------------------------------------------------------

### 👨‍👩‍👧‍👦 Guardian Features

-   Post Tuition Requirements (Ads)
-   Tag Ads with Subjects
-   View Interested Tutors
-   Select / Book a Tutor
-   Search & Filter Tutors by Name, Institution, or Topic

------------------------------------------------------------------------

### 👑 Admin Features

-   Admin Dashboard
-   Approve / Reject Tuition Ads
-   Delete Inappropriate Posts
-   View All Registered Users
-   Promote Users to Admin

------------------------------------------------------------------------

### 🔔 General Features

-   Notification System
-   Dark / Light Mode (Tailwind CSS)
-   Fully Responsive Design
-   Global State Management (Redux Toolkit + Persist)
-   Fast Development Setup using Vite

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React (Vite)
-   Redux Toolkit & Redux Persist
-   Tailwind CSS
-   React Router v7
-   Supabase (Image Storage)
-   Axios

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   Bcrypt.js

------------------------------------------------------------------------

## 🚀 Getting Started

### 📌 Prerequisites

-   Node.js (v18+ recommended)
-   MongoDB (Local instance or MongoDB Atlas)
-   Supabase Account

------------------------------------------------------------------------

### 1️⃣ Clone the Repository

``` bash
git clone https://github.com/Nur-Chowdhury/Tutor-Management.git
cd Tutor-Management
```

------------------------------------------------------------------------

### 2️⃣ Install Dependencies

``` bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix client
```

------------------------------------------------------------------------

### 3️⃣ Environment Variables

Create a single `.env` file in the root directory.

``` env
# Backend
PORT=5174
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# Frontend (Supabase)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

------------------------------------------------------------------------

### 4️⃣ Run the Application

Open two terminal windows.

Backend:

``` bash
npm run dev
```

Frontend:

``` bash
npm run client
```

Backend runs at: http://localhost:5174
Frontend runs at: http://localhost:5173

------------------------------------------------------------------------

## 📂 Folder Structure

    tutor_management/
    ├── client/
    │   ├── public/
    │   ├── src/
    │   │   ├── assets/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── redux/
    │   │   ├── utils/
    │   │   ├── App.jsx
    │   │   ├── main.jsx
    │   │   └── supabase.js
    │   ├── tailwind.config.js
    │   └── vite.config.js
    ├── server/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── utils/
    │   ├── db.js
    │   └── index.js
    ├── .env
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## 🧠 Future Improvements

-   Real-time chat between Tutor and Guardian
-   Online payment integration
-   Tutor rating & review system
-   Email notifications
-   Analytics dashboard

------------------------------------------------------------------------

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1.  Fork the repository\
2.  Create a feature branch\
3.  Commit your changes\
4.  Open a Pull Request

------------------------------------------------------------------------

## 👨‍💻 Author

**Nayamat Ullah Chowdhury (Nur)**\

Full-Stack Developer (MERN & Next.js)\
Strong in Backend Architecture, Authentication & RBAC\
Passionate about clean UI, scalable systems, and problem solving

Email: nurchowdhury56@gmail.com
GitHub: https://github.com/Nur-Chowdhury

------------------------------------------------------------------------

## 📜 License

This project is open-source.

------------------------------------------------------------------------

Built with ❤️ by Nur in Bangladesh.
