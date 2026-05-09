# Task Manager API

A RESTful task manager backend built with **Node.js**, **Express**, and **MongoDB**. Features JWT authentication via HTTP-only cookies, per-user task management, pagination, and status filtering.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-manager/Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

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

> **Security note:** `JWT_SECRET` should be a long, random string. Never commit your `.env` file.

### 4. Start the server

```bash
# Development (with auto-reload via nodemon)
npm run dev

# Production
npm start
```

The server will print:
```
MongoDB connected: localhost
Server running on port 3000
```

---

## API Documentation

All responses follow a consistent envelope:

```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "Error description" }
```

Validation errors return `422` with an `errors` array:

```json
{
  "success": false,
  "errors": [{ "field": "title", "msg": "Title is required" }]
}
```

---

### Authentication

Authentication uses a single JWT stored in an **HTTP-only cookie** (`token`). The cookie is set automatically on successful signup/login and cleared on logout - no manual `Authorization` header needed.

---

#### `POST /auth/signup`

Register a new user.

**Request body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

| Field      | Type   | Required | Rules                  |
|------------|--------|----------|------------------------|
| `name`     | string | Yes      | Non-empty              |
| `email`    | string | Yes      | Valid email format     |
| `password` | string | Yes      | Minimum 6 characters   |

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "user": { "id": "664a...", "name": "Jane Doe", "email": "jane@example.com" }
  }
}
```

---

#### `POST /auth/login`

Authenticate an existing user.

**Request body:**

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "user": { "id": "664a...", "name": "Jane Doe", "email": "jane@example.com" }
  }
}
```

---

#### `POST /auth/logout`

Clear the authentication cookie.

**Response `200`:**

```json
{ "success": true, "message": "Logged out successfully" }
```

---

### Tasks

All task routes require an authenticated session (valid `token` cookie). Attempting to access them without a cookie returns `401`.

Tasks are **user-scoped** — each user can only see and manage their own tasks.

---

#### `POST /tasks`

Create a new task.

**Request body:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

| Field         | Type   | Required | Rules     |
|---------------|--------|----------|-----------|
| `title`       | string | Yes      | Non-empty |
| `description` | string | No       | -         |

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "665b...",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "userId": "664a...",
      "createdAt": "2026-05-08T10:00:00.000Z",
      "updatedAt": "2026-05-08T10:00:00.000Z"
    }
  }
}
```

---

#### `GET /tasks`

Retrieve all tasks for the authenticated user.

**Query parameters:**

| Parameter | Type   | Default | Description                              |
|-----------|--------|---------|------------------------------------------|
| `status`  | string | -       | Filter by `pending` or `completed`       |
| `page`    | number | `1`     | Page number                              |
| `limit`   | number | `10`    | Results per page (max `100`)             |

**Examples:**

```
GET /tasks
GET /tasks?status=pending
GET /tasks?status=completed&page=2&limit=5
```

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "tasks": [ { ... }, { ... } ],
    "pagination": {
      "total": 23,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  }
}
```

---

#### `PATCH /tasks/:id`

Mark a task as **completed**.

**URL parameter:** `:id` — MongoDB ObjectId of the task.

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "task": { "_id": "665b...", "status": "completed", ... }
  }
}
```

**Error cases:**
- `404` — Task not found or does not belong to the user
- `400` — Task is already completed

---

#### `DELETE /tasks/:id`

Delete a task permanently.

**URL parameter:** `:id` — MongoDB ObjectId of the task.

**Response `200`:**

```json
{ "success": true, "message": "Task deleted successfully" }
```

**Error cases:**
- `404` — Task not found or does not belong to the user

---

## Error Reference

| Status | Meaning                              |
|--------|--------------------------------------|
| `400`  | Bad request (e.g. task already done) |
| `401`  | Not authenticated / invalid token    |
| `404`  | Resource not found                   |
| `409`  | Conflict (e.g. email already in use) |
| `422`  | Validation error                     |
| `500`  | Internal server error                |