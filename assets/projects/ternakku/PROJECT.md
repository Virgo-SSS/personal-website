# Ternakku

**Modern Livestock Farm Management System for Indonesian Farmers**

## Description

Ternakku is a full-stack web application that helps Indonesian farmers manage their cattle farm operations in one unified platform. It provides an interactive dashboard with charts, cattle and worker tracking, task scheduling with priorities, financial record keeping, and an activity calendar. Built with a React SPA frontend and an Express.js REST API backend backed by MySQL, the system features JWT-based authentication, input validation, and centralized logging. The UI is fully in Bahasa Indonesia.

## Key Features

- **Dashboard** - Farm data overview with interactive charts
- **Cattle Management** - Record cattle data (name, breed, weight, health status, gender, birth date)
- **Worker Management** - Manage farm staff information
- **Task Management** - Schedule and track tasks with priority levels and statuses
- **Financial Management** - Record income and expenses with categories
- **Activity Calendar** - Schedule farm events and activities
- **Authentication** - JWT access token + refresh token with httpOnly cookie
- **Input Validation** - Request body validation using Joi
- **Logging** - Daily log rotation with Winston
- **Security** - Parameterized SQL queries, CORS, password hashing (13 rounds)

## Tech Stack

### Frontend

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2 |
| Build Tool | Vite | 7.3 |
| Routing | React Router DOM | 6.28 |
| HTTP Client | Axios | 1.7 |
| Animation | Motion (Framer Motion) | 12.35 |
| Charts | ApexCharts + React ApexCharts | 3.54 / 1.5 |
| Calendar | FullCalendar (Core, DayGrid, Interaction) | 6.1 |
| Notifications | SweetAlert2 | 11.14 |
| Date Picker | React Flatpickr | 4.0 |
| Select | React Select | 5.10 |
| File Upload | React Dropzone | 14.3 |
| Number Format | React Number Format | 5.4 |
| Scrollbar | Perfect Scrollbar | 1.5 |
| Styling | Bootstrap | - |
| Linter | ESLint | 9.39 |
| Formatter | Prettier | 3.8 |
| Compiler | SWC (via @vitejs/plugin-react-swc) | - |

### Backend

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js (ES Modules) | - |
| Framework | Express.js | 4.21 |
| Database | MySQL 8.0 (mysql2) | 3.11 |
| Authentication | Passport.js (JWT + Local) | 0.7 |
| Token | JSON Web Token (jsonwebtoken) | 9.0 |
| Validation | Joi | 17.13 |
| Encryption | Bcrypt | 5.1 |
| Logging | Winston + Daily Rotate File | 3.17 / 5.0 |
| Session | Express Session | 1.18 |
| Cookie | Cookie Parser | 1.4 |
| CORS | cors | 2.8 |
| Environment | dotenv | 16.4 |
| Dev Server | Nodemon | 3.1 |
| Seeder | Faker.js | 9.3 |
