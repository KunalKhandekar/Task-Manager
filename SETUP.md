# Task Manager — Setup Guide

A full-stack task management app built with **Express + MongoDB** (backend) and **React + Vite + Tailwind CSS** (frontend).

---

## Prerequisites

| Requirement | Version |
|---|---|
| [Node.js](https://nodejs.org/) | v18+ |
| [MongoDB](https://www.mongodb.com/) | Local on port `27017`, or an [Atlas](https://www.mongodb.com/atlas) connection string |

---

## 1. Clone the Repository

```bash
git clone https://github.com/KunalKhandekar/Task-Manager.git
cd Task-Manager
```

---

## 2. Backend Setup

### Install dependencies

```bash
cd Backend
npm install
```

### Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

> **Security note:** `JWT_SECRET` should be a long, random string. Never commit your `.env` file to version control.

### Start the server

```bash
# Development — auto-reloads on file changes via nodemon
npm run dev

# Production
npm start
```

When the server starts successfully, you should see:

```
MongoDB connected: localhost
Server running on port 3000
```

---

## 3. Frontend Setup

### Install dependencies

```bash
cd Frontend
npm install
```

### Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and set the backend URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Start the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Available Scripts

### Backend (`/Backend`)

| Script | Description |
|---|---|
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start in production mode |

### Frontend (`/Frontend`)

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

