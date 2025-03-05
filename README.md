# Serenity Mental Health Portal

[![Live Demo](https://img.shields.io/badge/Live-Demo-41B883?style=for-the-badge&logo=render)](https://serenity-notes.onrender.com)\
(⚠️ This demo may be run slowly as it’s hosted on a free tier on Render)

A MERN stack mental health practice management system designed to streamline client documentation, staff management, and progress tracking.\
\
It also provides an intuitive interface for managing client notes, tracking progress, and collaborating with team members.

## 💡 Project Inspiration
- This project was inspired by by the real-world challenges faced at the mental health clinic where my aunt works.
- The clinic relied on scattered Excel files for tracking sessions across different therapists, requiring manual daily reports: an inefficient and error-prone process.
- After rounds of discussions with the owner and staff (including restructuring the processes), I developd it to centralize session documentation and streamline reporting, which allows staff to spend less time on documentation and more time focusing on what truly matters: patient care.

## 🔑 Test Credentials:
To login, click Employee Portal on the homepage.
#### ROLE: Admin & Manager
- Username: Hope
- Password: test

#### ROLE: Employee
- Username: Roan
- Password: test

## 🍃 Features

### - Authentication & Security
- **Secure Login System**: JWT-based authentication with refresh tokens
- **Role-Based Access Control**: Different permission levels (Admin, Manager, Employee)
- **Password Security**: Bcrypt hashing and validation
- **Session Management**: Option to maintain login state with secure device trust

### - Staff Management
- **User Directory**: Staff listing with role indicators
- **Role Assignment**: Assign specific roles to control access and permissions
- **Staff Status Tracking**: Toggle active/inactive status for staff

### - Client Documentation
- **Progress Notes**: Create, update, and track client session notes
- **Assignment System**: Assign notes to specific practitioners and they will see only the notes assigned to them
- **Status Tracking**: Mark sessions as complete or in progress, with in-progress notes shown first for easy access
- **Audit Timeline**: Automatic tracking of creation and update timestamps

### - User Experience
- **Responsive Design**: Fully responsive interface that works on all device sizes
- **Therapeutic Interface**: Calming color scheme with intuitive navigation
- **Real-Time Updates**: Automatic data refreshing to ensure current information

## 🔧 Technology Stack

### Frontend
- React, React Router
- Redux Toolkit
- Tailwind CSS, Lucide Icons

### Backend
- Node.js
- Express
- MongoDB, Mongoose

### Authentication & Security
- JWT, Bcrypt, Express-rate-limit
- Cookie-parser(Secure HTTP-only cookie management)

### Deployment
- Frontend: Render
- Backend: Render
- Database: MongoDB Atlas

## 📬 Contact
Currently, this is a personal project, but I welcome feedback and suggestions for improvements.\
Please feel free to reach out me through GitHub 😊