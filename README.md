# 🚀 Team Task Manager

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Deployed-success)
![Platform](https://img.shields.io/badge/Platform-Railway-purple?logo=railway)

A full-stack web application to manage projects, tasks, and team collaboration with role-based access.

---

## 📌 Features

* 🔐 User Authentication (Signup / Login with JWT)
* 👥 Role-based Access (Admin / Member)
* 📁 Create and Manage Projects
* ✅ Assign and Track Tasks
* 📊 Dashboard Overview
* 🌐 Deployed on Railway



## 🛠️ Tech Stack

**Frontend**

* HTML, CSS, JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MySQL (Railway)

**Other**

* JWT Authentication




## 📂 Project Structure

```id="5qzxyk"
team-task-manager/
│
├── server/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   └── client/
│       ├── index.html
│       ├── signup.html
│       ├── dashboard.html
│       ├── script.js
│       └── styles.css
│
├── package.json
└── README.md
```



## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash id="w5s2x4"
git clone https://github.com/gayathri-2206/Team_Task_Manager1.git
cd team-task-manager
```



### 2️⃣ Install dependencies

```bash id="p0s8kd"
cd server
npm install
```



### 3️⃣ Environment Variables

Create a `.env` file inside `server/` and add:

```id="m9h3wx"
DB_HOST=your_host
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=3306

JWT_SECRET=secret
PORT=5000
```



### 4️⃣ Run the server

```bash id="7l3vpe"
npm start
```



## 🌐 Deployment

This project is deployed using **Railway**.

### Steps:

* Connect GitHub repo to Railway
* Set **Root Directory** = `server`
* Add environment variables in Railway dashboard
* Deploy



## 🔗 Live Demo

👉 https://teamtaskmanager1-production.up.railway.app/




## 🔒 Authentication Flow

* JWT tokens are generated on login
* Protected routes require valid token



## 📌 API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`
* `GET /api/auth/users`

### Projects

* `GET /api/projects`
* `POST /api/projects`

### Tasks

* `GET /api/tasks`
* `POST /api/tasks`



## 🚀 Future Improvements

* 🔄 Task status updates
* 📅 Deadlines & reminders
* 📈 Analytics dashboard
* 🔔 Notifications


## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.



## 📄 License

This project is licensed under the MIT License.



## 👩‍💻 Author

**Gayathri**
GitHub: https://github.com/gayathri-2206

---

⭐ If you like this project, give it a star!