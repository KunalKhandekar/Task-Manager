# Task Manager

A full-stack task management application built as part of a Full Stack Developer Assessment. Users can sign up, log in, and manage their personal tasks — all in a clean, responsive interface.

**Live Demo:** [task.sahilkhandekar.dev](https://task.sahilkhandekar.dev)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth | JWT via HTTP-only cookies |
| Deployment | Vercel (Frontend) · AWS (Backend) |

## Features

- **Authentication** — Signup, login, and logout with JWT stored in HTTP-only cookies
- **Task CRUD** — Create, view, toggle completion, and delete tasks
- **Per-user isolation** — Each user only sees their own tasks
- **Pagination & filtering** — Query tasks by status (`pending` / `completed`) with page/limit support
- **Validation** — Input validated on both client and server
- **Protected routes** — Frontend routes and all task APIs require authentication

## Project Structure

```
task-manager/
├── Backend/
│   ├── server.js
│   └── src/
│       ├── config/         # DB connection
│       ├── controllers/    # Route handlers
│       ├── middleware/     # Auth middleware
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routers
│       └── services/       # Business logic
└── Frontend/
    └── src/
        ├── api/            # Axios API calls
        ├── components/     # Reusable UI components
        ├── context/        # Auth & Task context providers
        └── pages/          # Route-level page components
```

## Running Locally

See [SETUP.md](./SETUP.md) for full instructions on running the project locally.

## Documentation

| Document | Description |
|---|---|
| [SETUP.md](./SETUP.md) | Local development setup guide |
| [Backend/Readme.md](./Backend/Readme.md) | Backend-specific details and API notes |
| [Task-Description.md](./Task-Description.md) | Original assessment requirements |