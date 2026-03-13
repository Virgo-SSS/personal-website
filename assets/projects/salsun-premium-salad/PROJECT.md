# Salsun Premium Salad

**Your Fresh, Premium Salad — Delivered Right to Your Doorstep.**

---

## About

Salsun Premium Salad is a full-featured e-commerce web application designed for selling premium salad products online. The platform provides a seamless shopping experience for customers — from browsing the product catalog, adding items to a shopping cart, to placing orders with multiple payment options. It also includes a dedicated admin panel for managing products, orders, invoices, and account settings.

The application supports two user roles:

- **Customer** — Browse products, search by name, manage a shopping cart, checkout with COD or bank transfer (with payment proof upload), and view order summaries.
- **Admin** — Access a dashboard, perform full CRUD operations on products (including image uploads), manage incoming orders, generate and download PDF invoices, and configure account/payment settings.

---

## Key Features

- User registration, login, and password reset
- Role-based access control (Admin & Customer)
- Product catalog with search and pagination
- Shopping cart with quantity control and item notes
- Checkout with multiple payment methods (COD & Transfer)
- Payment proof image upload
- Automatic stock decrement on order placement
- Admin dashboard with order and product management
- PDF invoice generation and download
- Responsive design with Bootstrap 4

---

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| **Backend**      | Laravel 9, PHP 8.0+                             |
| **Frontend**     | Blade Templates, Bootstrap 4.6, jQuery 3.6      |
| **Database**     | MySQL (Eloquent ORM)                             |
| **Build Tool**   | Vite 3                                           |
| **Icons**        | Font Awesome 6.2, Boxicons 2.1                  |
| **HTTP Client**  | Axios, Guzzle HTTP 7                             |
| **PDF**          | wkhtmltopdf (via laravel-snappy)                 |
| **Auth**         | Laravel Sanctum, session-based authentication    |
| **Testing**      | PHPUnit 9.5                                      |
