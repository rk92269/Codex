Summary

We will build a beginner-friendly Task Manager using:

Backend: Node.js + Express
Database: MongoDB with Mongoose
Frontend: React with functional components and hooks
HTTP client: Axios on the frontend
Deployment direction: Docker-friendly from the start so phase 2 can containerize the app without reworking the structure
Teaching style:

Show the full folder structure first
Generate one file at a time
After each file, stop and wait for you to say next
For every file, clearly state:
file name
exact folder path
where to place it
After every backend/API step that adds usable behavior, include a manual test command using curl
Implementation Changes
Build a single CRUD resource: tasks
Task model fields:
title: required string
description: optional string
completed: boolean, default false
Keep the project Docker-ready by default:
separate backend/ and frontend/ apps
use environment variables for API port, MongoDB URI, and frontend API base URL
avoid hardcoding localhost values inside application logic where env config is better
keep backend stateless so it works cleanly in containers
keep MongoDB as an external service target so phase 2 can use Docker Compose easily
Backend teaching sequence:
Show full project structure
Create backend package.json
Create Express server entry file
Add environment configuration pattern
Add MongoDB connection helper
Add Mongoose task model
Add CRUD API routes
Wire routes into server
Frontend teaching sequence:
Create frontend structure
Add frontend package.json
Add React entry files
Add main App component
Add task form component
Add task list/item UI
Add Axios API helper
Connect CRUD flows with useState and useEffect
Manual API Testing Plan
After each backend milestone that exposes a runnable API, provide the exact curl commands to test it manually
Testing progression:
After server setup: test the base route or health response with curl
After database connection is added: test server still responds and note DB prerequisites
After POST /api/tasks: provide curl to create a task
After GET /api/tasks: provide curl to fetch tasks
After PUT /api/tasks/:id: provide curl to update a task
After DELETE /api/tasks/:id: provide curl to delete a task
Use beginner-friendly commands with JSON bodies and explain where to replace task IDs
Keep commands compatible with local development first, while remaining valid for future Docker port mappings
Test Plan
Backend checks:
server starts successfully
environment variables load correctly
MongoDB connects successfully
all CRUD routes respond with expected JSON
every new route is manually verified with curl
Frontend checks:
task list loads from backend
task creation works
task editing works
task deletion works
completion toggle reflects backend state
Docker-readiness checks for phase 2:
app uses env-driven configuration
frontend API URL can be changed without code rewrites
backend MongoDB URI can be swapped for containerized MongoDB later
Assumptions
App type remains Task Manager
We will use Axios for frontend API calls
We will use Create React App or Vite only if chosen later during frontend setup; default recommendation should favor the simpler Docker-friendly option at that point and be explained before frontend files begin
We will include comments in each file, but keep them short and beginner-friendly
We will provide package installation and run instructions as we reach each part, instead of dumping everything at once



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

