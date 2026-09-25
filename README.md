# ☀️ Aussie Smart Energy

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**Aussie Smart Energy** is a full-stack, enterprise-grade web platform and management system designed for an Australian clean energy and solar provider. The platform delivers a modern, high-performance customer experience for exploring residential and commercial solar installations, battery storage solutions, financial rebate calculators, and instant quote enquiries—backed by a comprehensive administrative portal for managing leads, portfolios, reviews, hero banners, and announcement tickers.

---

## 📑 Table of Contents

- [Features](#-features)
  - [Customer-Facing Experience](#customer-facing-experience)
  - [Admin Management Portal](#admin-management-portal)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Variables](#-environment-variables)
  - [Frontend (`.env`)](#frontend-env)
  - [Backend (`server/.env`)](#backend-serverenv)
- [Google Reviews Integration](#-google-reviews-integration)
  - [Data Source & Architecture](#data-source--architecture)
  - [Seeding Real Reviews](#seeding-real-reviews)
  - [Jotform Live Widget Setup](#jotform-live-widget-setup)
- [API Endpoints Reference](#-api-endpoints-reference)
  - [Health & Diagnostics](#health--diagnostics)
  - [Admin Authentication](#admin-authentication)
  - [Enquiries & Leads](#enquiries--leads)
  - [Projects & Case Studies](#projects--case-studies)
  - [Customer Reviews](#customer-reviews)
  - [Google Reviews](#google-reviews)
  - [Hero Banners](#hero-banners)
  - [Headlines & Announcements](#headlines--announcements)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## 🚀 Features

### Customer-Facing Experience
- **Residential Solar Packages**: In-depth breakdowns, system specifications, and pricing for **6.6 kW**, **10.5 kW**, **13.2 kW**, and **15 kW** residential setups.
- **Commercial Solar Systems**: High-yield commercial installations for **20 kW**, **30 kW**, **50 kW**, **100 kW**, and fully customized commercial solutions.
- **Battery Storage Ecosystem**: Dedicated product pages and technical specs for tier-1 storage manufacturers:
  - **Pylontech**
  - **ESY Sunhome**
  - **Fox ESS**
  - **GoodWe**
  - **Sigenergy**
  - **Sofar Solar**
- **NSW Solar & Battery Savings Calculator**: Interactive estimation tool calculating estimated yearly savings, battery ROI, and available government rebates.
- **Verified Google Reviews & Testimonials**: 10 real, verified written reviews sourced directly from the Aussie Smart Energy Google Business Profile, stored in MongoDB. Optional live widget powered by Jotform for real-time display.
- **Interactive Quote & Contact Modals**: Instant lead capture forms across all product pages with validation.
- **Projects & Case Studies Gallery**: Visual showcase of completed solar installations across Australia with high-resolution image galleries and project specifications.
- **Dynamic Hero Slider & Marquee Ticker**: Real-time admin-managed hero banner sliders and top announcement tickers.
- **Responsive & Motion-Driven UI**: Built with Tailwind CSS, Framer Motion, and GSAP for animations and micro-interactions.

### Admin Management Portal
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing, input sanitization, and protected route guards.
- **Lead & Enquiry Management**: View, filter, track status, and manage incoming customer quotation requests.
- **Project Case Studies Manager**: Create, edit, soft-delete, and restore portfolio case studies with multi-image gallery uploads (`Multer`).
- **Review Moderation & Google Reviews Sync**: Manage verified testimonials, set featured reviews, order display priority, and manually sync Google Business ratings via the admin panel.
- **Hero Banner Manager**: Upload hero slider images, adjust display order, and toggle active banners.
- **Announcement Headlines Manager**: Add and manage promotional headline tickers with custom URLs and active status toggles.
- **Health & Readiness Monitoring**: Multi-tier health endpoints (`/health`, `/health/live`, `/health/ready`) reporting Mongoose ready state, CPU/memory metrics, and system uptime.

---

## 🛠️ Tech Stack

### Frontend
- **Core**: React 19, Vite 8
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v3.4, PostCSS, Autoprefixer
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React, React Icons
- **HTTP Client**: Axios
- **Linting & Quality**: Oxlint

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js
- **Security & Headers**: Helmet, CORS, Express Validator
- **File Uploads**: Multer (Local disk storage with static serving)
- **Logging & Monitoring**: Morgan, custom health diagnostic utilities

---

## 📂 Project Architecture

```plaintext
aussiesmartenergy/
├── public/                         # Public static assets, favicon, brand assets
├── src/                            # Frontend React source code
│   ├── assets/                     # Brand images, illustrations, and logos
│   ├── components/                 # Reusable UI components
│   │   ├── BrandsSection.jsx       # Solar & battery partner logos
│   │   ├── GoogleReviews.jsx       # Verified Google reviews carousel (DB-backed)
│   │   ├── GoogleReviewsWidget.jsx # Jotform live Google Reviews embed widget
│   │   ├── HeroSlider.jsx          # Dynamic hero image carousel
│   │   ├── MarqueeHeadline.jsx     # Running announcement ticker
│   │   ├── Navbar.jsx              # Primary navigation header
│   │   ├── Footer.jsx              # Site footer with quick links
│   │   └── ...                     # Modals, forms, and cards
│   ├── data/                       # Static product data, pricing, specs, FAQs
│   ├── pages/                      # Application views & routes
│   │   ├── batteries/              # Dedicated battery manufacturer pages
│   │   │   ├── Esy.jsx             # ESY Sunhome
│   │   │   ├── FoxEss.jsx          # Fox ESS
│   │   │   ├── GoodWe.jsx          # GoodWe
│   │   │   ├── Pylontech.jsx       # Pylontech
│   │   │   ├── Sigenergy.jsx       # Sigenergy
│   │   │   └── Sofar.jsx           # Sofar Solar
│   │   ├── AdminBanners.jsx        # Admin hero banner manager
│   │   ├── AdminDashboard.jsx      # Admin enquiries dashboard
│   │   ├── AdminHeadlines.jsx      # Admin ticker announcement manager
│   │   ├── AdminLogin.jsx          # Admin login authentication view
│   │   ├── AdminProjects.jsx       # Admin case studies CRUD
│   │   ├── AdminReviews.jsx        # Admin Google reviews management & sync
│   │   ├── Home.jsx                # Landing page
│   │   ├── NSWCalculator.jsx       # Solar savings & rebate calculator
│   │   ├── ProjectDetails.jsx      # Individual case study view
│   │   ├── SolarCommercial.jsx     # Commercial solar packages
│   │   ├── Solar6kw.jsx            # 6.6 kW residential package
│   │   ├── Solar10kw.jsx           # 10.5 kW residential package
│   │   ├── Solar13kw.jsx           # 13.2 kW residential package
│   │   └── ...                     # Other product & info pages
│   ├── utils/                      # API client, helpers, and formatters
│   ├── App.jsx                     # Route definitions and layout wrapper
│   ├── index.css                   # Global Tailwind directives & design system
│   └── main.jsx                    # React root entry point
├── server/                         # Backend Express server source code
│   ├── src/
│   │   ├── config/                 # Database connection (MongoDB)
│   │   ├── controllers/            # Request controllers (Admin, Banners, Enquiries, GoogleReviews, Headlines, Projects, Reviews)
│   │   ├── middleware/             # JWT Auth, Error Handler, Multer file upload
│   │   ├── models/                 # Mongoose schemas (Admin, Banner, Enquiry, Headline, Project, Review)
│   │   ├── routes/                 # Express API route handlers
│   │   ├── scripts/                # One-off database scripts
│   │   │   ├── seedReviews.js      # Seeds 10 verified real Google reviews into MongoDB
│   │   │   └── reseedRealReviews.js# Utility: purge & re-seed Google reviews from source
│   │   ├── services/               # Background service workers
│   │   │   └── googleReviewSyncService.js # Periodic Google Places API sync job
│   │   ├── utils/                  # Admin seeders & helper functions
│   │   │   ├── cleanStaticReviews.js      # Removes stale/fake review records
│   │   │   └── seedAussieGoogleReviews.js # Source data for review seeding
│   │   ├── validation/             # Express-validator schemas
│   │   └── server.js               # Server bootstrap & middleware setup
│   ├── uploads/                    # Uploaded images (projects, banners, reviews)
│   ├── .env.example                # Backend environment variable template
│   └── package.json                # Backend package configuration & scripts
├── package.json                    # Frontend package configuration & scripts
├── tailwind.config.js              # Tailwind CSS custom theme & plugins
└── vite.config.js                  # Vite configuration & build plugins
```

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or MongoDB Atlas cluster)
- [npm](https://www.npmjs.com/) (v9.x or later)

---

### 1. Clone Repository

```bash
git clone https://github.com/your-username/aussiesmartenergy.git
cd aussiesmartenergy
```

---

### 2. Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to create your `.env` file:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URI, JWT secret, and optional Google Places API credentials:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/aussiesmartenergy
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Default Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@aussiesmartenergy.com.au
   ADMIN_PASSWORD=AdminPassword123!

   # Google Places API (Optional for live reviews sync)
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   GOOGLE_PLACE_ID=ChIJ_QaRUQCP1moRz4Bz7m8a86c
   GOOGLE_BUSINESS_URL=https://www.google.com/maps/place/Aussie+Smart+Energy/...
   ```

4. **Seed the initial admin user:**
   ```bash
   npm run seed:admin
   ```

5. **Seed the verified Google reviews:**
   ```bash
   node src/scripts/seedReviews.js
   ```

6. **Start the backend development server:**
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

---

### 3. Frontend Setup

1. **Navigate to the root directory:**
   ```bash
   cd ..
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Configure frontend environment variables:**
   Create a `.env` file in the root folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## ⚙️ Environment Variables

### Frontend (`.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for backend Express API | `http://localhost:5000/api` |

### Backend (`server/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port number for Express server | `5000` |
| `MONGODB_URI` | MongoDB connection URI string | `mongodb://127.0.0.1:27017/aussiesmartenergy` |
| `JWT_SECRET` | Secret key used for signing JWT tokens | `your_secret_key_here` |
| `NODE_ENV` | Application environment mode | `development` / `production` |
| `FRONTEND_URL` | Frontend URL allowed by CORS | `http://localhost:5173` |
| `ADMIN_USERNAME` | Default admin username for seeder | `admin` |
| `ADMIN_EMAIL` | Default admin email for seeder | `admin@aussiesmartenergy.com.au` |
| `ADMIN_PASSWORD` | Default admin password for seeder | `Admin123!` |
| `GOOGLE_PLACES_API_KEY` | Google Places API key for reviews sync *(optional)* | `AIzaSy...` |
| `GOOGLE_PLACE_ID` | Google Place ID for Aussie Smart Energy *(optional)* | `ChIJ_QaRUQCP1moRz4Bz7m8a86c` |
| `GOOGLE_BUSINESS_URL` | Direct Google Maps / Business URL *(optional)* | `https://www.google.com/maps/...` |

---

## ⭐ Google Reviews Integration

### Data Source & Architecture

The Google Reviews system uses a **two-layer approach**:

| Layer | Source | Purpose |
| :--- | :--- | :--- |
| **Primary** | MongoDB (seeded) | 10 real, verified written reviews scraped from the Aussie Smart Energy Google Business Profile |
| **Sync** | Google Places API (New) | Background sync via `googleReviewSyncService.js` to keep ratings and metadata fresh |
| **Live Widget** | Jotform embed *(optional)* | `GoogleReviewsWidget.jsx` — a zero-backend, real-time embed requiring no API key |

> **Why only 10 reviews?**  
> Google Maps publicly exposes only the top 10 written reviews for unauthenticated users. The remaining ratings (out of 79 total) are star-only and have no public names or review text. All 10 verified written reviews are stored verbatim as shown on the Google Maps listing.

### Seeding Real Reviews

To populate the database with the 10 verified real reviews:

```bash
cd server
node src/scripts/seedReviews.js
```

To purge all existing Google reviews and re-seed from scratch:

```bash
node src/scripts/reseedRealReviews.js
```

The verified reviewers are:

| # | Name | Rating | Posted |
| :--- | :--- | :--- | :--- |
| 1 | Akshay Jyani | ⭐⭐⭐⭐⭐ | 5 months ago |
| 2 | Krystian Reyes | ⭐⭐⭐⭐⭐ | 6 months ago |
| 3 | Rikin Ramani | ⭐⭐⭐⭐⭐ | 4 months ago |
| 4 | Ihab Ibrahim | ⭐⭐⭐⭐⭐ | 1 month ago |
| 5 | Steve King | ⭐⭐⭐⭐⭐ | 9 months ago |
| 6 | Bharat Bhalodi | ⭐⭐⭐⭐⭐ | 1 year ago |
| 7 | Mohit Patel | ⭐⭐⭐⭐⭐ | 3 months ago |
| 8 | Adelio Antonio | ⭐⭐⭐⭐⭐ | 5 months ago |
| 9 | Steffano Madafferi | ⭐⭐⭐⭐⭐ | 5 months ago |
| 10 | Sonali Bhoite | ⭐⭐⭐⭐⭐ | 2 months ago |

### Jotform Live Widget Setup

The `GoogleReviewsWidget.jsx` component provides a live Google Reviews embed powered by Jotform's widget CDN. It requires zero backend routes and zero API keys.

#### Key Features & Architecture
- **Dual Component Strategy**: The homepage renders both `<GoogleReviews />` (10 verified DB-seeded customer reviews in a carousel) and `<GoogleReviewsWidget />` (live Jotform embed) inside `TestimonialsFAQSection.jsx`.
- **Placeholder Detection**: When `JOTFORM_SCRIPT_SRC` is not yet configured, the component displays an interactive setup card with direct links to generate the embed.
- **Single-Injection Guard**: Uses a `data-widget="jotform-google-reviews"` attribute to prevent duplicate script tags during React re-renders or SPA route navigation.
- **Unmount Cleanup**: Removes dynamic script DOM nodes on unmount to prevent memory leaks and orphaned widget containers.
- **Loading Skeleton & Min-Height**: Prevents layout shifts or CSS height collapse (`min-h-[150px]`) during CDN script download.
- **Error Handling & Visible Fallback**: Catches script loading failures (404, CORS, network errors), logs to `console.error`, and displays a user-friendly retry banner.

#### Activation Steps:

1. Visit [jotform.com/widgets/google-reviews](https://www.jotform.com/widgets/google-reviews).
2. Connect your Google Business account for **Aussie Smart Energy**.
3. Customize the widget styling/layout and copy the `<script src="...">` URL from the embed code.
4. Open `src/components/GoogleReviewsWidget.jsx` and replace the placeholder:
   ```javascript
   // Before (Dev Setup Mode)
   const JOTFORM_SCRIPT_SRC = 'PASTE_YOUR_JOTFORM_SCRIPT_SRC_HERE';

   // After (Live Mode)
   const JOTFORM_SCRIPT_SRC = 'https://cdn.jotfor.ms/s/umd/latest/for-google-reviews.js?widgetId=YOUR_WIDGET_ID';
   ```

#### Troubleshooting Widget Visibility:
- **Amber Warning Card Visible**: `JOTFORM_SCRIPT_SRC` is still the placeholder. Replace it with your generated URL.
- **Red Error Banner Visible**: The script URL failed to load. Check the browser console (`[GoogleReviewsWidget Error]`) and ensure your widget URL is active.
- **Empty / 0px Container**: The container has a default `min-h-[150px]` class. Ensure parent containers do not have `overflow: hidden` with fixed zero heights.

---

## 🔌 API Endpoints Reference

### Health & Diagnostics
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Full health status, memory/CPU diagnostics, Mongoose status, uptime |
| `GET` | `/health/live` | Public | Lightweight liveness probe for load balancers and orchestrators |
| `GET` | `/health/ready` | Public | Readiness probe confirming database connectivity |

### Admin Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Public | Authenticate admin with username/email & password |
| `GET` | `/api/admin/profile` | Protected (Admin) | Retrieve authenticated admin profile details |

### Enquiries & Leads
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/enquiries` | Public | Submit a new quote or contact enquiry |
| `GET` | `/api/enquiries` | Protected (Admin) | Fetch all customer enquiries |
| `GET` | `/api/enquiries/:id` | Protected (Admin) | Fetch single enquiry details |
| `DELETE` | `/api/enquiries/:id` | Protected (Admin) | Remove customer enquiry record |

### Projects & Case Studies
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Public | Fetch all published projects |
| `GET` | `/api/projects/:slug` | Public | Fetch single project by unique URL slug |
| `POST` | `/api/projects` | Protected (Admin) | Create new project with main image & gallery upload |
| `PUT` | `/api/projects/:id` | Protected (Admin) | Update existing project details & images |
| `PATCH` | `/api/projects/:id/restore` | Protected (Admin) | Restore a soft-deleted project |
| `DELETE` | `/api/projects/:id` | Protected (Admin) | Soft-delete project |
| `DELETE` | `/api/projects/:id/gallery/:imageName` | Protected (Admin) | Delete specific gallery image |

### Customer Reviews
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews` | Public | Fetch approved customer reviews |
| `GET` | `/api/reviews/admin/all` | Protected (Admin) | Fetch all reviews including unapproved/draft |
| `POST` | `/api/reviews` | Protected (Admin) | Create review with optional avatar upload |
| `PUT` | `/api/reviews/:id` | Protected (Admin) | Update review details and featured status |
| `DELETE` | `/api/reviews/:id` | Protected (Admin) | Delete customer review |

### Google Reviews
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/google-reviews` | Public | Fetch Google Reviews summary with DB-seeded data and metadata |
| `GET` | `/api/google-reviews/admin/all` | Protected (Admin) | Fetch all stored Google reviews for admin management |
| `POST` | `/api/google-reviews/sync` | Protected (Admin) | Trigger manual sync with Google Places API |

### Hero Banners
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/banners` | Public | Fetch active hero slider banners |
| `GET` | `/api/banners/admin/all` | Protected (Admin) | Fetch all banners with administrative metadata |
| `POST` | `/api/banners` | Protected (Admin) | Upload new hero banner images |
| `PUT` | `/api/banners/order` | Protected (Admin) | Update banner display order |
| `DELETE` | `/api/banners/:id` | Protected (Admin) | Remove hero banner |

### Headlines & Announcements
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/headlines` | Public | Fetch active ticker headlines |
| `GET` | `/api/headlines/admin/all` | Protected (Admin) | Fetch all headlines for admin management |
| `POST` | `/api/headlines` | Protected (Admin) | Create new announcement headline |
| `PUT` | `/api/headlines/:id` | Protected (Admin) | Update announcement headline and link |
| `PATCH` | `/api/headlines/:id/toggle` | Protected (Admin) | Toggle active/inactive status |
| `DELETE` | `/api/headlines/:id` | Protected (Admin) | Delete announcement headline |

---

## 📜 Available Scripts

### Root Directory (Frontend)
- `npm run dev` — Starts the Vite development server with hot module replacement (HMR).
- `npm run build` — Compiles and bundles production-ready frontend assets into `dist/`.
- `npm run preview` — Locally previews the built production bundle.
- `npm run lint` — Runs Oxlint for fast static code analysis.

### Server Directory (Backend)
- `npm run dev` — Starts Express backend with `nodemon` auto-reloading on file change.
- `npm start` — Runs the backend server in production mode using `node src/server.js`.
- `npm run seed:admin` — Seeds the database with default administrator credentials from `.env`.
- `node src/scripts/seedReviews.js` — Seeds the 10 verified real Google reviews into MongoDB.
- `node src/scripts/reseedRealReviews.js` — Purges all Google reviews and re-seeds from source data.

---

## 📄 License

This project is proprietary and developed for **Aussie Smart Energy**. All rights reserved.
