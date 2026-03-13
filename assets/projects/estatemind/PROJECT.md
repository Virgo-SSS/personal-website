# EstateMind

**AI-Powered Real Estate Sales Management & Forecasting Platform**

## Description

EstateMind is a full-stack real estate platform built for **PT Adi Bintan Permata** that combines sales management with AI-driven forecasting. The platform enables administrators to track sales records across multiple housing projects, manage users with role-based access, and generate time-series predictions to forecast future sales performance.

On the web side, administrators manage projects, record sales data, and visualize trends through interactive dashboards. Behind the scenes, a dedicated prediction microservice powered by the ETS (Error-Trend-Seasonal) statistical model automatically evaluates multiple forecasting configurations and selects the most accurate one based on MAPE — delivering optimized predictions without manual model tuning.

Key capabilities include:

- **Sales Forecasting** — Time-series predictions using exponential smoothing with automated model selection across 6 ETS configurations, validated against held-out test data.
- **Sales Management** — Full CRUD operations for sales records with date and quantity tracking, including bulk import via Excel files.
- **Project Management** — Define and organize multiple real estate development projects.
- **User Administration** — Role-based access control with Super Admin and Admin roles.
- **Dashboard & Visualization** — Interactive charts and analytics for visualizing sales trends and prediction results.

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Chart.js / react-chartjs-2** | Data visualization & charting |
| **Lucide React** | Icon library |
| **Inertia.js** | Server-side rendering bridge |

### Backend

| Technology | Purpose |
|---|---|
| **Laravel 12** | PHP web framework |
| **PHP 8.2+** | Server-side language |
| **Eloquent ORM** | Database abstraction & relationships |
| **SQLite** | Database |

### Prediction Service

| Technology | Purpose |
|---|---|
| **FastAPI** | Python async web framework for the prediction API |
| **Python 3.13** | Runtime language |
| **Statsmodels** | ETS model fitting & time-series forecasting |
| **Pandas** | Data manipulation & time-series handling |
| **NumPy** | Numerical computing |
| **Scikit-learn** | ML metrics (MAPE evaluation) |
