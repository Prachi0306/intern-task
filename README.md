# 🚀 TaskFlow — Premium Task Tracker

A production-grade, SaaS-quality task management application built with the MERN stack. Designed to look and feel like a premium commercial dashboard — inspired by Linear, Notion, and Todoist.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### Core Functionality
- ✅ **Full CRUD** — Create, Read, Update, Delete tasks
- ✅ **Smart Search** — Real-time search across titles and descriptions
- ✅ **Advanced Filtering** — Filter by status, priority, category
- ✅ **Multi-Sort** — Sort by date, priority, title, due date
- ✅ **Pagination** — Server-side pagination with smart page numbers

### Dashboard & Analytics
- 📊 **Stats Cards** — Total, completed, in progress, pending, overdue, completion rate
- 📈 **Priority Chart** — Bar chart showing task distribution by priority
- 🍩 **Category Donut** — Pie chart breaking down tasks by category
- 📋 **Recent Tasks** — Latest tasks with status and priority badges
- ⏰ **Upcoming Deadlines** — Color-coded urgency indicators
- ⚡ **Quick Add** — Inline task creation from the dashboard

### Design & UX
- 🎨 **Glassmorphism UI** — Frosted glass cards with backdrop blur
- 🌗 **Dark & Light Mode** — System-aware with smooth transitions
- ✨ **Micro-Animations** — Framer Motion page transitions, hover effects, stagger animations
- 📱 **Fully Responsive** — Mobile-first with collapsible sidebar drawer
- 🎯 **Form Validation** — Client + server-side with React Hook Form
- 🔔 **Toast Notifications** — Success/error feedback with custom styling

### Technical Highlights
- 🏗️ **Clean MVC Architecture** — Separated models, controllers, services, validators
- 🛡️ **Security** — Helmet headers, CORS, input sanitization
- ⚡ **Optimistic Updates** — Instant UI feedback before server confirmation
- 📦 **Code Splitting** — 5 optimized chunks (vendor, ui, charts, forms, app)
- 🔄 **Error Boundary** — Graceful error recovery with retry
- 📝 **Custom Hooks** — `useTasks`, `useDebounce` for clean logic separation

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 (Vite) | UI framework |
| Tailwind CSS 3 | Utility-first styling |
| React Router 6 | Client-side routing |
| Framer Motion | Animations & transitions |
| Recharts | Dashboard charts |
| React Hook Form | Form validation |
| React Hot Toast | Notifications |
| Axios | HTTP client |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database & ODM |
| express-validator | Input validation |
| Helmet | Security headers |
| Morgan | HTTP logging |
| CORS | Cross-origin control |
| dotenv | Environment config |

---

## 📁 Project Structure

```
Intern task/
├── backend/
│   ├── config/          # Centralized configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/       # Error handling, validation
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic layer
│   ├── utils/           # Custom error classes
│   ├── validators/      # Express-validator rules
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry + graceful shutdown
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/   # StatsGrid, TaskChart, RecentTasks, etc.
│   │   │   ├── landing/     # Hero, Features, Preview, Stats, FAQ, etc.
│   │   │   ├── tasks/       # TaskCard, TaskForm, TaskList, DueDateBadge
│   │   │   └── ui/          # Button, Input, Modal, Badge, Loader, etc.
│   │   ├── context/         # ThemeContext
│   │   ├── hooks/           # useTasks, useDebounce
│   │   ├── layouts/         # DashboardLayout
│   │   ├── pages/           # Landing, Dashboard, Tasks, TaskDetail, NotFound
│   │   ├── services/        # API client + task service
│   │   └── utils/           # constants, helpers, animations
│   ├── tailwind.config.js   # Premium design tokens
│   └── vite.config.js       # Build config + code splitting
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Prachi0306/intern-task.git
cd intern-task
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskflow?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:5173
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:
```bash
npm run dev
```

### 4. Open in browser
Navigate to `http://localhost:5173`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks (with filters, search, sort, pagination) |
| `GET` | `/api/tasks/stats` | Get dashboard statistics |
| `GET` | `/api/tasks/:id` | Get single task |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

### Query Parameters (GET /api/tasks)
| Param | Example | Description |
|-------|---------|-------------|
| `status` | `Pending` | Filter by status |
| `priority` | `High` | Filter by priority |
| `category` | `Work` | Filter by category |
| `search` | `design` | Search title/description |
| `sort` | `-createdAt` | Sort field (prefix `-` for descending) |
| `page` | `1` | Page number |
| `limit` | `10` | Items per page |

---

## 🚢 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Backend → Render
1. Create new Web Service on [Render](https://render.com)
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGODB_URI`, `CORS_ORIGIN`, `PORT`

---

## 📸 Screenshots

### Landing Page
Premium dark landing page with animated hero, features grid, and dashboard preview.

### Dashboard
Analytics dashboard with stats cards, priority/category charts, recent tasks, and upcoming deadlines.

### Task Management
Task cards with status/priority badges, search & filter panel, create/edit modals.

---

## 👩‍💻 Author

**Prachi** — Full Stack Developer

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
