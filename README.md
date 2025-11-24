# PrimeTrade Backend API

## Overview
This is the backend service for the PrimeTrade assignment.  
It provides a clean, scalable Node.js + Express API with JWT authentication and MySQL database integration.

The backend supports:
- User Registration (with bcrypt hashing)
- User Login (JWT-based)
- Profile Fetch & Update (Protected)
- Task CRUD (Protected)
- Token-based authentication using Bearer scheme

---

## 🚀 Tech Stack
- **Node.js**
- **Express.js**
- **MySQL (mysql2/promise)**
- **JWT Authentication**
- **bcryptjs**
- **dotenv**
- **CORS**
- **cookie-parser** (optional but included)

---

## 📁 Project Structure
```
backend/
  server.js
  config/
    db.js
  controllers/
    authController.js
    userController.js
    taskController.js
  routes/
    authRoutes.js
    userRoutes.js
    taskRoutes.js
  middleware/
    auth.js
  .env
  .gitignore
  package.json
```

---

## 🛠 Environment Variables (.env)
Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=primetrade_app
JWT_SECRET=supersecret123
```

---

## 🗄 MySQL Database Setup
Before running the server, create the required database and tables.

### Create Database
```sql
CREATE DATABASE primetrade_app;
USE primetrade_app;
```

### Create `users` Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Create `tasks` Table
```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## ▶️ Running the Backend

### Install dependencies
```
npm install
```

### Start development server
```
npm run dev
```

Server should show:
```
MySQL connected successfully!
Server running on port 3000
```

---

## 🔐 Authentication

This project uses **Bearer Token Authentication**.

After login, include the token in request headers:

```
Authorization: Bearer <your_token>
```

---

## 📌 API Endpoints

### 🔹 Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user & receive JWT |

---

### 🔹 User Routes (`/api/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get logged-in user's profile |
| PUT | `/api/user/profile` | Update profile |

---

### 🔹 Task Routes (`/api/tasks`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks for user |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 📘 API Documentation (Detailed)

## 🔹 Auth Routes

### **POST `/api/auth/register`**
Create a new user.

**Request Body**
```json
{
    "name": "Manan",
    "email": "manan@example.com",
    "password": "yourpassword"
}
```

**Success Response**
```json
{
    "message": "User registered successfully"
}
```

---

### **POST `/api/auth/login`**
Authenticate user & return JWT token.

**Request Body**
```json
{
    "email": "manan@example.com",
    "password": "yourpassword"
}
```

**Success Response**
```json
{
    "token": "JWT_TOKEN_HERE",
    "user": {
        "id": 1,
        "name": "Manan",
        "email": "manan@example.com"
    }
}
```

---

## 🔹 User Routes

### **GET `/api/user/profile`**
Fetch the authenticated user.

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
```json
{
    "id": 1,
    "name": "Manan",
    "email": "manan@example.com"
}
```

---

### **PUT `/api/user/profile`**
Update user profile.

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
    "name": "New Name"
}
```

**Success Response**
```json
{
    "message": "Profile updated successfully"
}
```

---

## 🔹 Task Routes (Detailed)

### **GET `/api/tasks`**
Fetch all tasks for the logged-in user.

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
```json
[
    {
        "id": 1,
        "title": "First Task",
        "description": "Optional description",
        "created_at": "2025-02-10T12:00:00.000Z"
    }
]
```

---

### **POST `/api/tasks`**
Create a new task.

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
    "title": "My Task",
    "description": "Details here"
}
```

**Success Response**
```json
{
    "message": "Task created successfully"
}
```

---

### **PUT `/api/tasks/:id`**
Update a task.

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
    "title": "Updated title",
    "description": "Updated description"
}
```

---

### **DELETE `/api/tasks/:id`**
Delete a task.

**Headers**
```
Authorization: Bearer <token>
```

**Success Response**
```json
{
    "message": "Task deleted successfully"
}
```
---

## 🧪 Postman Testing Guide

1. **Register User**  
   POST → `/api/auth/register`

2. **Login User**  
   POST → `/api/auth/login`  
   → Copy token from response

3. **Get Profile**  
   GET → `/api/user/profile`  
   Header: `Authorization: Bearer <token>`

4. **Task CRUD**  
   All routes require the same Authorization header.

---

## 🏗 Scaling Notes

If deployed to production, recommended improvements:

- Move DB to managed MySQL (AWS RDS / Railway / PlanetScale)
- Add input sanitization & rate limiting
- Serve behind Nginx reverse proxy
- Use pm2 for node process management
- Enable HTTPS & secure cookie options
- Add validation library (Joi / Zod)

---

## ✔ Status
Backend fully functional and tested.  
All 8 major test cases passed successfully.

---

## 📩 Author
Manan Bagadi  
Assignment for **PrimeTrade.ai**
