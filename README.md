# Task Manager Full-Stack App

This is a beginner-friendly full-stack Task Manager project built with:

- Node.js
- Express
- MongoDB with Mongoose
- React with hooks
- Axios

## Project Structure

```text
task-manager-fullstack/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.js
    │   │   └── TaskList.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── .env
    ├── .gitignore
    └── package.json
```

## Install Packages

Install backend packages:

```bash
cd backend
npm install
```

Install frontend packages:

```bash
cd frontend
npm install
```

## Run the Backend

Make sure MongoDB is running first.

Then start the backend:

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

## Run the Frontend

Start the frontend in another terminal:

```bash
cd frontend
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

## Manual API Testing with curl

Test the root route:

```bash
curl http://localhost:5000/
```

Get all tasks:

```bash
curl http://localhost:5000/api/tasks
```

Create a task:

```bash
curl -X POST http://localhost:5000/api/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Learn Express\",\"description\":\"Build CRUD API\",\"completed\":false}"
```

Update a task:

Replace `TASK_ID_HERE` with a real task ID.

```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID_HERE \
-H "Content-Type: application/json" \
-d "{\"title\":\"Updated Task\",\"description\":\"Edited task\",\"completed\":true}"
```

Delete a task:

Replace `TASK_ID_HERE` with a real task ID.

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID_HERE
```

## Environment Variables

Backend `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-manager-db
```

Frontend `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## What the App Can Do

- Add a task
- View all tasks
- Edit a task
- Delete a task
- Mark a task as completed or pending

## Docker Preparation

This project is set up to be Docker-friendly later because:

- backend and frontend are in separate folders
- environment variables are used for configuration
- the backend does not hardcode database settings in code
- the frontend API URL can be changed through `.env`
