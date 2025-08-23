# 📦 Machine Test - MERN Stack Application  

A full-stack application built using the **MERN stack** with authentication, agent management, and list distribution features.  
Styled with **TailwindCSS** + **DaisyUI**, and state management handled via **Zustand**.  

---
# Live link

https://machine-test-mern-dxbc.vercel.app

## 📂 Project Folder Structure  

```bash
Machine Test/
│
├── client/ # React (Frontend)
│ ├── public/ # Static files
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── lib/
│ ├── pages/
│ ├── store/
│ ├── App.jsx
│ ├── index.css
│ ├── main.jsx
│ └── vite.config.js
│
├── server/ # Node + Express (Backend)
│ └── src/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── index.js
│
├── uploads/ # File uploads (CSV/XLSX)
├── .env # Environment variables
├── package.json # Root config
└── README.md

```

## 🚀 Features  

### 🔐 Authentication
- Admin login using **JWT authentication**.
- Secure password storage with **bcrypt**.
- Session management using **cookies**.

### 👨‍💼 Agent Management
- Admin can create and manage agents.
- Each agent has:
  - Name  
  - Email  
  - Mobile Number (with country code, e.g., `+44-7400123456`)  
  - Password  

### 📑 CSV Upload & Distribution
- Upload CSV/XLSX files containing:
  - First Name  
  - Phone Number  
  - Notes  
- File validation (only `csv`, `xlsx`, `xls` allowed).
- Automatic **distribution of items among 5 agents**:
  - Items distributed equally.
  - Remainder items assigned sequentially.
- Distributed data stored in **MongoDB** and displayed in the UI.

---

## 🛠️ Tech Stack  

### **Frontend (client)**
- React.js / Vite  
- TailwindCSS + DaisyUI  
- Zustand (state management)  
- React Hot Toast (notifications)  

### **Backend (server)**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Bcrypt (password hashing)  
- Multer (file upload)  
- Cookies for session handling  

---

## ⚙️ Environment Setup  

Create a `.env` file in the **server** root:  

```bash
DATABASE='mongodb+srv://sanmithdevadiga91:Q2mhJn8asJmLtv3I@cluster0.6a1v1rp.mongodb.net/MachineTest'
JWT_SECRET="new-machine-test"
PORT=5050
```

## Setup Instructions

# Clone Repository

``` bash 
git clone https://github.com/SanmithD/Machine-Test---MERN.git
cd Machine-Test---MERN
```

# Install Dependencies

```bash 
# Install client dependencies
cd client
npm install

# Install server dependencies
cd server
npm install
``` 
# Start Application

```bash
# Start server (from /server folder)
npm run dev

# Start client (from /client folder)
npm run dev
``` 

## Admin Email and password
 Email - cstechadmin@gmail.com
 Password - cstech123

# Screenshots
Agent Management UI
<img width="1344" height="625" alt="Image" src="https://github.com/user-attachments/assets/29c94279-bf5d-4b84-bd17-f2580640ad06" />
Distribution Management
<img width="1343" height="627" alt="Image" src="https://github.com/user-attachments/assets/7738bd98-47d1-432f-939c-ccddd024d9d0" />
Dashboard
<img width="1346" height="631" alt="Image" src="https://github.com/user-attachments/assets/7b6a1a33-8212-406d-a68d-8342f7405e43" />

# Repository

https://github.com/SanmithD/Machine-Test---MERN.git

# Evaluation Criteria

Functionality – Meets all requirements.
Code Quality – Clean, modular, well-documented.
Validation & Error Handling – Proper checks for login, CSV upload, and distributions.
User Interface – Responsive with TailwindCSS + DaisyUI.
Execution – Easy setup and run instructions.

# Note

Thank you so much for giving me this opportunity. I’ve tried my best to build the project according to your requirements. Unfortunately, my laptop’s mic isn’t working well, so I couldn’t explain everything properly in the demo video. I’m really sorry about that. Thanks again!