# HMCTS Task Backend API

A RESTful API for managing HMCTS (His Majesty's Courts & Tribunals Service) case tasks, built with **Node.js**, **Express**, **Prisma**, and **SQLite**.

---

## 🚀 Features

- **CRUD Operations** for case tasks
- **UUID-based case numbers** with automatic generation
- **SQLite database** with Prisma ORM
- **Database seeding** with sample HMCTS case data
- **Input validation** and error handling
- **CORS-enabled** for frontend integration

---

## 📋 Prerequisites

- **Node.js** v16+
- **npm** or **yarn**

---

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone HMCTS-task
   cd hmcts-task-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database** (optional)

   ```bash
   npm run seed
   ```

---

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will start on **http://localhost:4000**

---

## 📊 Database Schema

### Tasks Model

| Field       | Type       | Description                         |
| ----------- | ---------- | ----------------------------------- |
| id          | Int        | Auto-incrementing primary key       |
| caseNumber  | String     | Unique UUID (auto-generated)        |
| title       | String     | Task title                          |
| description | String     | Task description                    |
| status      | CaseStatus | Task status (enum)                  |
| createdDate | DateTime   | Creation timestamp (auto-generated) |

### CaseStatus Enum

- `PENDING` - Task awaiting action
- `INPROGRESS` - Task currently being worked on
- `COMPLETED` - Task finished
- `CANCELLED` - Task cancelled

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:4000
```

### Root Endpoint

```http
GET /
```

Returns server status and available endpoints.

**Response:**

```json
{
  "message": "HMCTS server is running",
  "endpoints": ["/tasks"]
}
```

- `200 OK` - Returns task object
- `500 Internal Server Error` - Failed to fetch

---

### Tasks Endpoints

#### Get All Tasks

```http
GET /tasks
```

Returns all tasks ordered by creation date (newest first).

**Response:**

```json
[
  {
    "id": 1,
    "caseNumber": "a10657db-8325-449c-8a3a-bb89447244da",
    "title": "Review Employment Tribunal Case",
    "description": "Review case documents for upcoming employment tribunal hearing",
    "status": "PENDING",
    "createdDate": "2025-11-20T09:00:00.000Z"
  }
]
```

#### Get Task by ID

```http
GET /tasks/:id
```

**Response:**

- `200 OK` - Returns task object
- `400 Invalid` - Invalid task ID
- `404 Not Found` - Task doesn't exist
- `500 Internal Server Error` - Update failed

#### Create Task

```http
POST /tasks
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Case Review",
  "description": "Review documents for case XYZ",
  "status": "PENDING",
  "createdDate": "2025-11-27T10:00:00Z"
}
```

**Validation:**

- `title` - Required
- `status` - Required (must be valid CaseStatus enum value)
- `createdDate` - Required (must be valid ISO date string)
- `description` - Optional (defaults to empty string)
- `caseNumber` - Auto-generated UUID (do not include)

**Response:**

- `201 Created` - Returns created task
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Update failed

#### Update Task

```http
PUT /tasks/:id
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Update Description",
  "createdDate": "new Date(Update Date)",
  "status": "INPROGRESS"
}
```

**Response:**

- `200 OK` - Returns updated task
- `404 Not Found` - Task doesn't exist
- `500 Internal Server Error` - Update failed

#### Delete Task

```http
DELETE /tasks/:id
```

**Response:**

- `204 No Content` - Task deleted successfully
- `404 Not Found` - Task doesn't exist
- `500 Internal Server Error` - Update failed

---

## 🗄️ Database Management

### Reset Database

Drop all data, reapply migrations, and reseed:

```bash
npx prisma migrate reset --force
```

### Reseed Data Only

Clear and repopulate with sample data:

```bash
npm run seed
```

### View Database

Open Prisma Studio to browse data:

```bash
npx prisma studio
```

### Create New Migration

After schema changes:

```bash
npx prisma migrate dev --name <migration-name>
```

---

## 📁 Project Structure

```
hmcts-task-backend/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── seed.js                # Seed data script
│   ├── tasks.db               # SQLite database file
│   └── migrations/            # Migration history
├── routes/
│   └── taskRoutes.js          # Task API route handlers
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── app.js                     # Express app configuration
├── server.js                  # Server entry point
├── db.js                      # Prisma client singleton
├── package.json               # Dependencies & scripts
├── package-lock.json          # Locked dependency versions
└── README.md                  # This file
```

---

## 🧪 Testing

### Manual Testing with curl

**Get all tasks:**

```bash
curl http://localhost:4000/tasks
```

**Create a task:**

```bash
curl -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Testing the API",
    "status": "PENDING",
    "createdDate": "2025-11-27T10:00:00Z"
  }'
```

**Update a task:**

```bash
curl -X PUT http://localhost:4000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

**Delete a task:**

```bash
curl -X DELETE http://localhost:4000/tasks/1
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file (optional) for custom configuration:

```env
PORT=4000
DATABASE_URL="file:./tasks.db"
```

### CORS Settings

CORS is enabled for all origins. To restrict, edit `app.js`:

```javascript
app.use(
  cors({
    origin: "http://your-frontend-url.com",
  })
);
```

---

## 📝 License

This project is for educational purposes as part of the HMCTS Junior Developer Challenge.

---

## 👥 Author

Built for HMCTS Technical Assessment
