# Collab: Student-Faculty Communication Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack web application designed to facilitate seamless communication between students and faculty members. Includes JWT authentication, role-based access control, assignment management, and resource sharing.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Role-Based Access Control**: Separate dashboards for students and faculty.
- **Assignment Management**: Upload assignments and track deadlines.
- **Resource Sharing**: Share study materials and resources.
- **Submission Tracking**: Students submit assignments, faculty review them.
- **Scalable Architecture**: Built to handle large user bases efficiently.

## Tech Stack

- **Frontend**: React.js (with React Router for navigation and Context API for state management)
- **Backend**: Express.js (Node.js framework for handling API requests)
- **Database**: MongoDB (NoSQL database for storing user and assignment data)
- **Authentication**: JWT (JSON Web Token for secure authentication)

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/duavarakeshss/collab
   cd collab
   ```
2. **Backend Setup**
    ```bash
    cd backend
    npm install
    nodemon run server
    ```
3. **Frontend Setup**
   ```bash
    cd ../frontend
    npm install
    npm run dev
   ```
## API Endpoints

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/api/auth/register`      | User registration                    |
| POST   | `/api/auth/login`         | User login                           |
| GET    | `/api/assignments`        | Fetch all assignments                |
| POST   | `/api/assignments`        | Upload a new assignment              |
| GET    | `/api/resources`          | Fetch shared resources               |
| POST   | `/api/resources`          | Upload a new resource                |
    
