# HMCTS Task Management System

A full-stack task management application with a React frontend and Node.js/Express backend.

## Project Structure
- [Backend Starter Repo](https://github.com/Negar-Maleki/hmcts-dev/tree/main/hmcts-task-backend) - Express API with Prisma ORM 
- [Frontend Starter Repo](https://github.com/Negar-Maleki/hmcts-dev/tree/main/hmcts-task-frontend) - React application (Vite + Vitest)

## Quick Start

### Backend

```bash
cd hmcts-task-backend
npm install

npx prisma migrate dev
npm start
```

### Frontend

```bash
cd hmcts-task-frontend
npm install
npm run dev
```

## Testing

```bash
# Backend tests
cd hmcts-task-backend && npm test

# Frontend tests
cd hmcts-task-frontend && npm test
```

## Tech Stack

**Frontend**: React, Vite, Vitest
**Backend**: Node.js, Express, Prisma, Jest

## API Endpoints

- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
