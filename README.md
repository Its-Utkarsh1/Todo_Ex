# PrimeTrade Backend — REST API with Authentication & Tasks CRUD

## 🚀 Project Overview
PrimeTrade is a scalable REST API built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**, with a minimal EJS-based frontend for testing.

This project includes:
- User Registration & Login (JWT + Hashed Passwords)
- Role-Based Access (Admin & User)
- CRUD APIs for Tasks
- API Versioning (`/api/v1`)
- Protected Dashboard
- API Documentation via Postman Collection
- Default Admin Auto-Creation
- Cookie-based JWT Authentication

---

## 📌 Tech Stack
### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Crypto (Password Hashing)
- Cookie Parser
- CORS

### **Frontend**
- EJS templates
- Vanilla JavaScript
- Simple UI for testing API

---

## 📁 Project Structure
```
/controller
    user.js
    task.js

/models
    user.js
    task.js

/middlewares
    auth.js

/router
    user.js
    task.js

/views
    index.ejs
    login.ejs
    register.ejs
    dashboard.ejs
    task.ejs

/docs
    Primetrade_API.postman_collection.json

index.js
connect.js
README.md
.env
```

---

## 🔑 Authentication Flow

| Step | Action |
|------|--------|
| 1 | User logs in via `/api/v1/user/login` |
| 2 | Password hashed + verified |
| 3 | JWT generated & stored in cookie `token` |
| 4 | Protected routes check `req.cookies.token` |
| 5 | Decoded token fetches the logged-in user |

---

## 👤 Default Admin
`.env`:
```
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin12345
ADMIN_NAME=Admin
```

---

## 🧪 API Endpoints (v1)

### **User APIs**
```
POST /api/v1/user/register
POST /api/v1/user/login
POST /api/v1/user/logout
```

### **Task APIs**
```
POST   /api/v1/tasks        → Create Task
GET    /api/v1/tasks        → Get All Tasks
PUT    /api/v1/tasks/:id    → Update Task (Admin only)
DELETE /api/v1/tasks/:id    → Delete Task (Admin only)
```

---

## 📝 Postman API Collection
Located at:
```
/docs/Primetrade_API.postman_collection.json
```

---

## ▶ Running the Project
```
npm install
```

Create `.env`:
```
PORT=4567
JWT_SECRET=yoursecret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin12345
ADMIN_NAME=Admin
```

Start server:
```
npm start
```

---

## 👨‍💻 Author
Utkarsh  
