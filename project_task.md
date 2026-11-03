# 📋 Task/To-Do Manager — IT Project Plan

**Stack:** HTML · CSS · JavaScript · MongoDB (via Node.js + Express)  
**Total Screens:** 5  
**Theme:** Simple personal task manager — create, track, and complete daily tasks.

---

## 🖥️ Screens Overview

### Screen 1 — Dashboard (Home)
**Purpose:** Quick overview of all tasks at a glance.  
**What's on it:**
- App title / header with nav links
- Summary cards: Total Tasks, Completed, Pending
- Recent tasks list (last 5 added)
- Button → "Add New Task"

---

### Screen 2 — Add Task
**Purpose:** Form to create a new task.  
**What's on it:**
- Input: Task Title (required)
- Textarea: Task Description
- Input: Due Date (date picker)
- Dropdown: Priority (Low / Medium / High)
- Submit button → saves to MongoDB
- Cancel / Back button → returns to Dashboard

---

### Screen 3 — Task List (All Tasks)
**Purpose:** Show all tasks with filter/sort options.  
**What's on it:**
- Search bar (filter by title)
- Filter buttons: All / Pending / Completed
- Sort by: Date / Priority
- Task cards showing: Title, Due Date, Priority badge, Status
- Each card has: View Detail button + Mark Complete button + Delete button

---

### Screen 4 — Task Detail
**Purpose:** View and edit a single task's full info.  
**What's on it:**
- Full task info: Title, Description, Due Date, Priority, Status, Created At
- Edit button → makes fields editable inline
- Save changes button → updates MongoDB record
- Mark as Complete / Reopen button
- Delete button + Back button

---

### Screen 5 — Completed Tasks
**Purpose:** Archive of all finished tasks.  
**What's on it:**
- List of all tasks with status = "completed"
- Shows: Title, Completion Date, Priority
- Button: Reopen Task (moves back to pending)
- Button: Delete Task (permanent remove)
- Empty state message if no completed tasks yet

---

## 🗂️ Project File Structure

```
it_defense_project/
│
├── frontend/
│   ├── index.html          ← Screen 1: Dashboard
│   ├── add-task.html       ← Screen 2: Add Task
│   ├── task-list.html      ← Screen 3: Task List
│   ├── task-detail.html    ← Screen 4: Task Detail
│   ├── completed.html      ← Screen 5: Completed Tasks
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── backend/
│   ├── server.js           ← Express server entry point
│   ├── routes/
│   │   └── tasks.js        ← API routes (GET, POST, PUT, DELETE)
│   └── models/
│       └── Task.js         ← MongoDB schema (Mongoose)
│
├── package.json
└── project_task.md
```

---

## 🗃️ MongoDB Task Schema

```js
{
  title:       String,   // required
  description: String,
  dueDate:     Date,
  priority:    String,   // "Low" | "Medium" | "High"
  status:      String,   // "pending" | "completed"
  createdAt:   Date      // auto
}
```

---

## 🔌 API Endpoints (Backend)

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/api/tasks`      | Get all tasks            |
| GET    | `/api/tasks/:id`  | Get single task by ID    |
| POST   | `/api/tasks`      | Create new task          |
| PUT    | `/api/tasks/:id`  | Update task (edit/complete) |
| DELETE | `/api/tasks/:id`  | Delete a task            |

---

## ✅ Implementation Checklist

### Setup
- [ ] Initialize Node.js project (`npm init`)
- [ ] Install dependencies: `express`, `mongoose`, `cors`, `dotenv`
- [ ] Connect to MongoDB (local or Atlas)

### Backend
- [ ] Create `Task.js` model with Mongoose schema
- [ ] Create `tasks.js` route file with all 5 API endpoints
- [ ] Setup `server.js` with Express + CORS + JSON middleware
- [ ] Test API with Postman or Thunder Client

### Frontend — Screen 1: Dashboard
- [ ] Build header/navbar (shared across all pages)
- [ ] Fetch and display summary counts from API
- [ ] Display recent 5 tasks list
- [ ] "Add New Task" button links to add-task.html

### Frontend — Screen 2: Add Task
- [ ] Build form with all fields
- [ ] Validate required fields (title)
- [ ] POST to `/api/tasks` on submit
- [ ] Redirect to task-list.html on success

### Frontend — Screen 3: Task List
- [ ] Fetch all tasks from API on page load
- [ ] Render task cards dynamically
- [ ] Implement search filter (client-side)
- [ ] Implement All / Pending / Completed filter buttons
- [ ] "View Detail" → links to task-detail.html?id=...
- [ ] "Mark Complete" → PUT request to update status
- [ ] "Delete" → DELETE request + remove card from DOM

### Frontend — Screen 4: Task Detail
- [ ] Read task ID from URL query param
- [ ] Fetch task by ID from API
- [ ] Display all task fields
- [ ] Inline edit mode on "Edit" button click
- [ ] Save changes → PUT request
- [ ] Mark Complete / Reopen → PUT request

### Frontend — Screen 5: Completed Tasks
- [ ] Fetch tasks with `status=completed`
- [ ] Render completed tasks list
- [ ] "Reopen" button → PUT to set status back to pending
- [ ] "Delete" button → DELETE request
- [ ] Show empty state message if list is empty

### Styling
- [ ] Responsive layout (mobile + desktop)
- [ ] Color-coded priority badges (Green/Yellow/Red)
- [ ] Consistent navbar and footer on all pages
- [ ] Clean card design for task items

---

## 📅 Suggested Build Order

1. Setup Node.js + MongoDB + Express server
2. Build and test all API endpoints
3. Build Screen 2 (Add Task) — simplest form
4. Build Screen 3 (Task List) — core listing logic
5. Build Screen 4 (Task Detail) — edit/complete logic
6. Build Screen 5 (Completed Tasks) — filtered view
7. Build Screen 1 (Dashboard) — summary counts + recent tasks
8. Apply CSS styling across all screens
