# ☀️ Aussie Smart Energy

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**Aussie Smart Energy** is a full-stack web application designed for an Australian renewable energy provider. The platform delivers an engaging user experience for exploring residential and commercial solar installations, battery storage systems, and personalized quote enquiries, accompanied by an administrative portal for managing customer leads, project portfolios, and reviews.


## 📑 Table of Contents

- [Features](#-features)
  - [Customer-Facing Portal](#customer-facing-portal)
  - [Admin Management Portal](#admin-management-portal)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints Overview](#-api-endpoints-overview)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## 🚀 Features

### Customer-Facing Portal
- **Residential Solar Systems**: Detailed system breakdowns and cost estimates for 6.6 kW, 10.5 kW, 13.2 kW, and 15 kW systems.
- **Commercial Solar Systems**: Scalable business solutions for 20 kW, 30 kW, 50 kW, 100 kW, and custom commercial configurations.
- **Battery Storage Solutions**: Dedicated showcases for solar battery solutions including **Pylontech** and **ESY Sunhome** battery storage.
- **Interactive Enquiry & Quote System**: Real-time enquiry submission modals across product pages for quick customer quotation.
- **Project Case Studies**: Showcase of completed residential and commercial solar installations.
- **Interactive UI & Animations**: Built using Tailwind CSS, Framer Motion, and GSAP for responsive interactions.

### Admin Management Portal
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing and route guards.
- **Enquiry Management**: Track, view, and manage inbound customer quotation and contact requests.
- **Projects Portfolio Manager**: Create, edit, upload images (`Multer`), and delete past installation case studies.
- **Reviews & Testimonials Management**: Moderate and manage customer ratings and reviews.
- **Health Monitoring**: Built-in `/health` readiness and liveness checks for deployment uptime tracking.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React, React Icons
- **HTTP Client**: Axios
- **Linter**: Oxlint

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security & Headers**: Helmet, CORS, Bcrypt.js, Express Validator
- **File Uploads**: Multer
- **Authentication**: JSON Web Tokens (JWT)
- **Logging**: Morgan

---

## 📂 Project Architecture

```plaintext
aussiesmartenergy/
├── public/                 # Static public assets & logos
├── src/                    # Frontend React source code
│   ├── assets/             # Images, icons, and media files
│   ├── components/         # Reusable UI components (Navbar, Footer, Modals, Sections)
│   ├── data/               # Static system data, specifications & FAQs
│   ├── pages/              # Page views (Home, Solar packages, Batteries, Admin, Projects)
│   ├── utils/              # Frontend utilities and API handlers
│   ├── App.jsx             # Root routing and application layout
│   ├── index.css           # Tailwind CSS directives and custom classes
│   └── main.jsx            # React DOM entry point
├── server/                 # Backend Node/Express source code
│   ├── src/
│   │   ├── config/         # Database connection setup
│   │   ├── controllers/    # Request handlers (Admin, Enquiry, Project, Review)
│   │   ├── middleware/     # Auth, error handling, file upload middleware
│   │   ├── models/         # Mongoose schemas (Admin, Enquiry, Project, Review)
│   │   ├── routes/         # Express API route declarations
│   │   ├── utils/          # Admin seeder & helper utilities
│   │   ├── validation/     # Express validation schemas
│   │   └── server.js       # Express server initialization
│   ├── uploads/            # Uploaded media storage
│   └── package.json        # Backend dependencies & scripts
├── package.json            # Frontend dependencies & scripts
├── tailwind.config.js      # Tailwind configuration & custom theme
└── vite.config.js          # Vite bundler configuration
```

---

## 🏁 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### 1. Clone Repository

```bash
git clone https://github.com/your-username/aussiesmartenergy.git
cd aussiesmartenergy
```


### 2. Backend Setup

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/aussiesmartenergy
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=http://localhost:5173
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@aussiesmartenergy.com.au
   ADMIN_PASSWORD=AdminPassword123!
   ```

4. *(Optional)* Seed the default admin user:
   ```bash
   npm run seed:admin
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

---

### 3. Frontend Setup

1. Open a new terminal in the project root directory (`aussiesmartenergy`):
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The React application will be available at `http://localhost:5173`.


## ⚙️ Environment Variables

### Frontend (`.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for backend API requests | `http://localhost:5000/api` |

### Backend (`server/.env`)
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port number for Express server | `5000` |
| `MONGO_URI` | MongoDB connection connection string | `mongodb://localhost:27017/aussiesmartenergy` |
| `JWT_SECRET` | Secret key for signing auth tokens | `your_secret_key` |
| `FRONTEND_URL` | Allowed CORS origin in production | `http://localhost:5173` |
| `ADMIN_USERNAME`| Default username for seeder | `admin` |
| `ADMIN_EMAIL` | Default email for seeder | `admin@aussiesmartenergy.com.au` |
| `ADMIN_PASSWORD`| Default password for seeder | `Admin123!` |


## 🔌 API Endpoints Overview

### Health
- `GET /health` - Liveness & readiness health checks

### Admin & Auth
- `POST /api/admin/login` - Admin login with email/username & password
- `GET /api/admin/me` - Authenticated admin profile *(Protected)*

### Enquiries
- `POST /api/enquiries` - Submit customer quote/contact enquiry
- `GET /api/enquiries` - Retrieve enquiries *(Protected)*
- `PATCH /api/enquiries/:id/status` - Update status (New, Contacted, Completed) *(Protected)*
- `DELETE /api/enquiries/:id` - Delete enquiry *(Protected)*

### Projects (Case Studies)
- `GET /api/projects` - Get all published projects
- `GET /api/projects/:slug` - Get single project details by slug
- `POST /api/projects` - Create new project with image upload *(Protected)*
- `PUT /api/projects/:id` - Update existing project *(Protected)*
- `DELETE /api/projects/:id` - Remove project *(Protected)*

### Reviews
- `GET /api/reviews` - Fetch customer reviews
- `POST /api/reviews` - Submit review
- `PATCH /api/reviews/:id/approve` - Moderate/approve review *(Protected)*
- `DELETE /api/reviews/:id` - Remove review *(Protected)*

---

## 📜 Available Scripts

### Root Directory (Frontend)
- `npm run dev` — Starts the Vite development server.
- `npm run build` — Builds the application for production to `dist/`.
- `npm run preview` — Locally preview the production build.
- `npm run lint` — Runs Oxlint to check code quality.

### Server Directory (Backend)
- `npm run dev` — Starts Express server with `nodemon` auto-reloading.
- `npm start` — Runs the production Node.js server.
- `npm run seed:admin` — Seeds the database with an initial administrator account.

---

## 📄 License

This project is proprietary and developed for Aussie Smart Energy. All rights reserved.
