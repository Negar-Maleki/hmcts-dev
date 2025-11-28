# HMCTS Task Frontend

A Vite + React app for viewing and managing tasks. It renders a GOV.UK‑style header, a task table, and includes a create/update form. Styling uses `styled-components` and notifications use `react-hot-toast`.

## Features

- View tasks in a responsive table with a running count
- Create/update task form.
- Simple, fast dev workflow with Vite
- Linting with ESLint

## Tech Stack

- React 19 + JSX
- Vite 7 (dev/build/preview)
- styled-components 6
- react-hot-toast 2
- ESLint 9

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (comes with Node)

## Quick Start

```bash
npm install
npm run dev
```

The app will start on `http://localhost:3100` (configured in `vite.config.js`).

> Note: The app fetches tasks from a backend at `http://localhost:4000`. Make sure your API is running (and CORS-enabled) or update the API base URL as described below.

## Configuration

The backend API URL is configured in `src/config.js`:

```javascript
export const API_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
```

To change the backend URL:

1. **Option 1**: Set the `VITE_BACKEND_URL` environment variable in `.env`:

   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```

2. **Option 2**: Edit the fallback URL directly in `src/config.js`

All components (`TasksTable.jsx`, `TaskForm.jsx`) import `API_URL` from this config.

## Available Scripts

- `npm run dev` — Start the dev server (Vite)
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

## Project Structure

```
hmcts-task-frontend/
├── public/                      # Static assets
│   ├── favicon.ico
│   └── govuk-logotype-crown.png # GOV.UK logo
├── src/
│   ├── components/
│   │   ├── Modal.jsx            # Modal wrapper for forms
│   │   ├── Table.jsx            # Reusable compound table component
│   │   ├── TaskForm.jsx         # Create/Update form (uses react-hot-toast)
│   │   ├── TaskRow.jsx          # Individual task row with actions
│   │   └── TasksTable.jsx       # Main table component (fetches and displays tasks)
│   ├── helper/
│   │   └── toDateTimeLocal.js   # Date formatting utility
│   ├── test/                    # Unit tests
│   │   ├── setup.js             # Test configuration
│   │   └── Table.test.jsx       # Table component tests
│   ├── config.js                # API configuration (API_URL)
│   ├── App.jsx                  # App shell (GOV.UK style header)
│   └── main.jsx                 # React entry point
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Scripts and dependencies
├── README.md                    # Project documentation
├── TESTING.md                   # Testing guide
├── vite.config.js               # Vite configuration (port 3100)
└── vitest.config.js             # Vitest test configuration
```

## API Expectations

Components expect a Task object with fields similar to:

```json
{
  "id": 1,
  "caseNumber": "ABC12345",
  "title": "Case Title",
  "description": "Case Description",
  "status": "PENDING",
  "createdAt": "2025-11-27T10:13:14.110Z"
}
```

- `TasksTable.jsx` fetches from `GET http://localhost:4000/tasks` and renders the list.
- `TaskForm.jsx` (when enabled) posts to `POST /tasks` , puts to `PUT /tasks/:id` and delete to `DELETE /tasks/:id`.

## Changing the Dev Server Port

Run Vite on a specific port (e.g., 3100):

```bash
npm run dev -- --port 3100
```

Then open `http://localhost:3100/`.

## Troubleshooting

- Blank table: Verify the backend is running and reachable at `http://localhost:4000/tasks`.
- CORS errors: Enable CORS on the backend for the dev origin.
- Port already in use: Start on a different port (see above).
- Lint issues: Run `npm run lint` to see actionable messages.

## Notes

- The app uses ES modules (`"type": "module"`).
- `styled-components` is used for component-scoped styling.
- `react-hot-toast` is installed and used by `TaskForm.jsx` for feedback toasts.
