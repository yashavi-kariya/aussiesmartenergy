# ☀️ Aussie Smart Energy

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Storage-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![ANZ Worldline](https://img.shields.io/badge/Payment-ANZ_Worldline-004B87?style=flat)](https://www.worldline.com/)

**Aussie Smart Energy** is a full-stack, enterprise-grade web platform and management system designed for an Australian clean energy and solar provider. The platform delivers a modern, high-performance customer experience for exploring residential and commercial solar installations, home battery storage ecosystems, financial rebate calculators, and online invoice payments—backed by a comprehensive administrative portal for managing leads, portfolios, reviews, payments, hero banners, and announcement tickers.

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
- [Cloudinary Cloud Media Storage](#-cloudinary-cloud-media-storage)
  - [How It Works & Local Fallback](#how-it-works--local-fallback)
  - [Migrating Existing Uploads to Cloudinary](#migrating-existing-uploads-to-cloudinary)
- [Database Backup & Seeding Tools](#-database-backup--seeding-tools)
  - [Exporting Entire Database to JSON](#exporting-entire-database-to-json)
  - [Seeding into a Target Database](#seeding-into-a-target-database)
- [Battery Storage Ecosystem](#-battery-storage-ecosystem)
- [ANZ Worldline Payment Integration](#-anz-worldline-payment-integration)
  - [Architecture & Payment Flow](#architecture--payment-flow)
  - [Local Testing Simulator](#local-testing-simulator)
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
  - [Payments & Hosted Checkout](#payments--hosted-checkout)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## 🚀 Features

### Customer-Facing Experience
- **Residential Solar Packages**: In-depth breakdowns, system specifications, and pricing for **6.6 kW**, **10.5 kW**, **13.2 kW**, and **15 kW** residential setups with interactive 3D visualizations.
- **Commercial Solar Systems**: High-yield commercial installations for **20 kW**, **30 kW**, **50 kW**, **100 kW**, and custom enterprise setups with ROI breakdowns.
- **Tier-1 Battery Storage Ecosystem**: Dedicated product pages, technical specs, and instant quote capture for leading battery manufacturers:
  - **AlphaESS** (Smile series: 6.6 kWh, 10.45 kWh, 13.3 kWh modular capacity, VPP ready, IP65 outdoor rated)
  - **Pylontech** (Pelio-L, Force L1/L2 series)
  - **ESY Sunhome** (HM6 modular 5.12 kWh – 30.72 kWh residential storage)
  - **Fox ESS** (EP5 & Mira series high-voltage systems)
  - **GoodWe** (Lynx Home U & F series lithium battery solutions)
  - **Sigenergy** (SigenStor 5-in-1 energy storage system)
  - **Sofar Solar** (AMASS Store series)
- **About Aussie Smart Energy**: Detailed company story, NETCC Approved Seller consumer code commitment, SAA & CEC accreditations, core focus pillars, and interactive 3D tilt showcase.
- **NSW Solar & Battery Savings Calculator**: Interactive estimation tool calculating estimated yearly savings, battery ROI, and available state government rebates.
- **Online Invoice & Quote Payments (`Pay Online`)**: Seamless customer portal to pay invoices and deposits online securely via ANZ Worldline Solutions Hosted Checkout, with instant transaction receipts.
- **Local Payment Simulator**: Built-in offline testing sandbox (`/hostedcheckout/simulate`) allowing developers to test approved, cancelled, and declined transaction journeys without hitting live payment rails.
- **Verified Google Reviews & Testimonials**: 10 real, verified written reviews sourced directly from the Aussie Smart Energy Google Business Profile, stored in MongoDB with high-contrast WCAG-compliant dark typography. Optional live widget powered by Jotform for real-time display.
- **Mobile-Optimized Dynamic Footer**: Brand-first mobile hierarchy with prominent centered branding, compact 2-column directory navigation, side-by-side accreditation trust strip, tap-to-call/email actions, and Australian First Nations Acknowledgement of Country.
- **Interactive Quote & Contact Modals**: Instant lead capture forms across all product pages with front-to-back input validation.
- **Projects & Case Studies Gallery**: Visual showcase of completed solar installations across Australia with high-resolution image galleries and project specifications.
- **Dynamic Hero Slider & Marquee Ticker**: Real-time admin-managed hero banner sliders and top announcement tickers.
- **Responsive & Motion-Driven UI**: Built with Tailwind CSS, Framer Motion, and GSAP for micro-animations and smooth layout transitions.

### Admin Management Portal
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing, input sanitization, and protected route guards.
- **Lead & Customer Enquiry Management**: View, filter, track status, and manage incoming customer quotation requests.
- **Payment Transactions Audit & Gateway Sync**: Track customer payments, view revenue statistics, inspect transaction IDs, and trigger real-time status reconciliations with ANZ Worldline.
- **Project Case Studies Manager**: Create, edit, soft-delete, and restore portfolio case studies with multi-image gallery uploads.
- **Cloudinary Cloud Media Storage**: Automatic cloud image uploading with local disk fallback when API keys are not present.
- **Review Moderation & Google Reviews Sync**: Manage verified testimonials, set featured reviews, order display priority, and trigger manual sync with Google Places API.
- **Hero Banner Manager**: Upload hero slider images, adjust display order, and toggle active banners.
- **Announcement Headlines Manager**: Add and manage promotional headline tickers with custom URLs and active status toggles.
- **Health & Readiness Monitoring**: Multi-tier health endpoints (`/health`, `/health/live`, `/health/ready`) reporting Mongoose connection state, memory metrics, and uptime.
- **Database Backup & Cloudinary Migration Tooling**: Built-in CLI scripts to export entire databases to portable JSON and migrate disk uploads directly to Cloudinary.

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
- **Media Storage**: Cloudinary (v2 SDK with buffer streaming) + Multer fallback
- **Payments**: ANZ Worldline Solutions (`onlinepayments-sdk-nodejs`)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js
- **Security & Headers**: Helmet, CORS, Express Validator
- **Logging & Diagnostics**: Morgan, custom health check monitors

---

## 📂 Project Architecture

```plaintext
aussiesmartenergy/
├── public/                         # Public static assets, favicon, brand assets
├── src/                            # Frontend React source code
│   ├── assets/                     # Brand images, illustrations, and logos
│   │   ├── Alphaess/               # AlphaESS product imagery & battery renders
│   │   ├── pylontech/              # Pylontech product graphics
│   │   └── ...                     # Solar panels, inverters & brand badges
│   ├── components/                 # Reusable UI components
│   │   ├── AnnouncementBar.jsx     # Top marquee ticker banner
│   │   ├── ApprovedSellerBanner.jsx# NETCC Approved Seller trust strip
│   │   ├── BrandsSection.jsx       # Solar & battery partner logos
│   │   ├── CheckoutModal.jsx       # Payment modal wrapper
│   │   ├── EnquiryModal.jsx        # Instant quote enquiry modal
│   │   ├── Footer.jsx              # Mobile-optimized footer with First Nations tribute
│   │   ├── GoogleReviews.jsx       # Verified Google reviews carousel with dark styling
│   │   ├── GoogleReviewsWidget.jsx # Jotform live Google Reviews embed widget
│   │   ├── HeroSlider.jsx          # Dynamic hero image carousel
│   │   ├── Navbar.jsx              # Responsive navigation header with mega menus
│   │   ├── ProjectsSection.jsx     # Portfolio showcase carousel
│   │   └── ...                     # Cards, accordions, and utilities
│   ├── data/                       # Static product data, pricing, specs, FAQs
│   ├── pages/                      # Application views & routes
│   │   ├── batteries/              # Dedicated battery manufacturer pages
│   │   │   ├── AlphaEss.jsx        # AlphaESS (6.6 kWh, 10.45 kWh, 13.3 kWh)
│   │   │   ├── Esy.jsx             # ESY Sunhome
│   │   │   ├── FoxEss.jsx          # Fox ESS
│   │   │   ├── GoodWe.jsx          # GoodWe
│   │   │   ├── Pylontech.jsx       # Pylontech
│   │   │   ├── Sigenergy.jsx       # Sigenergy
│   │   │   └── Sofar.jsx           # Sofar Solar
│   │   ├── AboutUs.jsx             # Company story, NETCC accreditation & 3D showcase
│   │   ├── AdminBanners.jsx        # Admin hero banner manager
│   │   ├── AdminDashboard.jsx      # Admin enquiries dashboard
│   │   ├── AdminHeadlines.jsx      # Admin ticker announcement manager
│   │   ├── AdminLogin.jsx          # Admin authentication login
│   │   ├── AdminPayments.jsx       # Admin payment audit & reconciliation
│   │   ├── AdminProjects.jsx       # Admin case studies CRUD & gallery manager
│   │   ├── AdminReviews.jsx        # Admin Google reviews management & sync
│   │   ├── ANZWorldlineHostedCheckoutSimulator.jsx # Local payment checkout testing sandbox
│   │   ├── ContactUs.jsx           # Enquiry form and office locations
│   │   ├── Home.jsx                # Landing page
│   │   ├── NSWCalculator.jsx       # Solar savings & government rebate calculator
│   │   ├── PayOnline.jsx           # Customer online invoice payment view
│   │   ├── PaymentResult.jsx       # Payment success/confirmation receipt view
│   │   ├── ProjectDetails.jsx      # Individual case study view
│   │   ├── SolarCommercial.jsx     # Commercial solar packages
│   │   ├── Solar6kw.jsx            # 6.6 kW residential package
│   │   ├── Solar10kw.jsx           # 10.5 kW residential package
│   │   ├── Solar13kw.jsx           # 13.2 kW residential package
│   │   └── ...                     # Other product & info pages
│   ├── utils/                      # Axios client, formatters, and helpers
│   ├── App.jsx                     # Route definitions and layout wrapper
│   ├── index.css                   # Global Tailwind directives & design system
│   └── main.jsx                    # React root entry point
├── server/                         # Backend Express server source code
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js       # Cloudinary streaming upload & local fallback
│   │   │   └── db.js               # MongoDB connection handler
│   │   ├── controllers/            # Controllers (Admin, Banners, Enquiries, GoogleReviews, Headlines, Payments, Projects, Reviews)
│   │   ├── middleware/             # JWT Auth, Error Handler, Multer buffer upload
│   │   ├── models/                 # Mongoose schemas (Admin, Banner, Enquiry, Headline, Payment, Project, Review, GoogleReview)
│   │   ├── routes/                 # Express API route handlers
│   │   ├── scripts/                # Database and migration scripts
│   │   │   ├── exportDatabase.js   # Exports all MongoDB collections to JSON
│   │   │   ├── migrateUploadsToCloudinary.js # Migrates disk uploads to Cloudinary
│   │   │   ├── seedReviews.js      # Seeds 10 verified Google reviews
│   │   │   ├── reseedRealReviews.js# Purges & re-seeds reviews
│   │   │   └── seedTargetDatabase.js # Seeds data into any target database
│   │   ├── services/
│   │   │   └── googleReviewSyncService.js # Periodic Google Places sync job
│   │   ├── utils/                  # Admin seeders & API response formatters
│   │   ├── validation/             # Express-validator schemas
│   │   └── server.js               # Express application bootstrap
│   ├── uploads/                    # Local image storage fallback
│   └── package.json                # Backend dependencies and scripts
├── database_export.json            # Database snapshot export
├── seed_data.json                  # Clean portable seed data
├── package.json                    # Frontend package configuration & scripts
├── tailwind.config.js              # Tailwind custom theme & plugins
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
   Create a `.env` file in the `server` directory (or edit the root `.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/aussiesmartenergy
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Default Admin Credentials for seeder
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@aussiesmartenergy.com.au
   ADMIN_PASSWORD=AdminPassword123!

   # Cloudinary Media Storage (Optional, falls back to disk if omitted)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # ANZ Worldline Payment Gateway (Sandbox / Preprod)
   ANZ_MERCHANT_ID=your_anz_merchant_id
   ANZ_API_KEY=your_anz_api_key
   ANZ_API_SECRET=your_anz_api_secret
   ANZ_API_ENDPOINT=payment.preprod.anzworldline-solutions.com.au
   ANZ_ENVIRONMENT=sandbox
   ANZ_WEBHOOK_SECRET=your_anz_webhook_secret

   # Google Places API (Optional for background reviews sync)
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
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |
| `ANZ_MERCHANT_ID` | ANZ Worldline Merchant Account ID | `your_anz_merchant_id` |
| `ANZ_API_KEY` | ANZ Worldline Hosted Checkout API Key ID | `your_anz_api_key` |
| `ANZ_API_SECRET` | ANZ Worldline Secret API Key | `your_anz_api_secret` |
| `ANZ_API_ENDPOINT` | Gateway hostname (`payment.preprod...` / `payment...`) | `payment.preprod.anzworldline-solutions.com.au` |
| `ANZ_ENVIRONMENT` | Gateway mode (`sandbox` or `production`) | `sandbox` |
| `ANZ_WEBHOOK_SECRET` | Secret key for verifying ANZ webhook signature *(optional)* | `your_anz_webhook_secret` |
| `GOOGLE_PLACES_API_KEY` | Google Places API key for reviews sync *(optional)* | `AIzaSy...` |
| `GOOGLE_PLACE_ID` | Google Place ID for Aussie Smart Energy *(optional)* | `ChIJ_QaRUQCP1moRz4Bz7m8a86c` |
| `GOOGLE_BUSINESS_URL` | Direct Google Maps / Business URL *(optional)* | `https://www.google.com/maps/...` |

---

## ☁️ Cloudinary Cloud Media Storage

### How It Works & Local Fallback
All image uploads (project galleries, hero banners, and customer review avatars) are processed through `server/src/config/cloudinary.js`.

- **Cloud Upload**: When `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are defined in `server/.env`, images stream directly from memory to Cloudinary with CDN URLs saved in MongoDB.
- **Local Fallback**: If Cloudinary credentials are not present, images are stored locally under `server/uploads/` and served via Express static middleware.
- **Automated Cleanup**: Deleting a project, banner, or review automatically deletes the corresponding asset from Cloudinary (or local disk).

### Migrating Existing Uploads to Cloudinary
If you have existing images stored on your local disk and wish to transfer them to your Cloudinary cloud bucket:

```bash
cd server
npm run migrate:cloudinary
```

The script will:
1. Scan all MongoDB documents (`projects`, `banners`).
2. Identify images pointing to `/uploads/`.
3. Upload each file to Cloudinary under the `aussiesmartenergy` namespace.
4. Update the MongoDB records with secure Cloudinary CDN URLs.

---

## 🗄️ Database Backup & Seeding Tools

### Exporting Entire Database to JSON
Export all active MongoDB collections (Enquiries, Projects, Reviews, GoogleReviews, Banners, Headlines, Payments, Admins) into clean JSON files:

```bash
cd server
npm run export:db
```

This generates:
- `database_export.json`: Full database dump with timestamps and object IDs.
- `seed_data.json`: Standardized seed dataset.
- `seed_data_no_ids.json`: Dataset stripped of Mongo `_id` fields for importing into fresh databases.

### Seeding into a Target Database
To populate a remote MongoDB cluster (e.g. MongoDB Atlas or staging environment):

```bash
cd server
node src/scripts/seedTargetDatabase.js "<TARGET_MONGODB_URI>" --drop
```

Options:
- `--drop`: Drops existing target collections prior to inserting data.
- `--no-ids`: Generates fresh ObjectIDs in the target database.

---

## 🔋 Battery Storage Ecosystem

Aussie Smart Energy provides complete, manufacturer-backed home battery storage solutions. Each system has a dedicated page with interactive calculators, specification tables, and instant quote forms:

| Brand | Model / Series | Capacity Range | Features | Page Route |
| :--- | :--- | :--- | :--- | :--- |
| **AlphaESS** | Smile Series (Smile-G3 / B3) | 6.6 kWh, 10.45 kWh, 13.3 kWh | Modular, VPP ready, IP65 outdoor, 10-year warranty | `/batteries/alphaess` |
| **Pylontech** | Pelio-L & Force Series | 5.12 kWh – 20.48 kWh | High cycle life, slimline wall mount, LFP safety | `/batteries/pylontech` |
| **ESY Sunhome** | HM6 Modular | 5.12 kWh – 30.72 kWh | All-in-one storage, stackable modules, emergency backup | `/batteries/esy` |
| **Fox ESS** | EP5 & Mira Series | 5.18 kWh – 20.7 kWh | High-voltage efficiency, fast charging, sleek aesthetics | `/batteries/fox-ess` |
| **GoodWe** | Lynx Home U & F Series | 5.4 kWh – 16.4 kWh | Seamless inverter pairing, remote diagnostic control | `/batteries/goodwe` |
| **Sigenergy** | SigenStor | 5.0 kWh – 48.0 kWh | 5-in-1 AI-assisted solar + battery + EV charging | `/batteries/sigenergy` |
| **Sofar Solar**| AMASS Store Series | 5.12 kWh – 20.48 kWh | Robust Australian condition resilience, grid assist | `/batteries/sofar` |

---

## 💳 ANZ Worldline Payment Integration

### Architecture & Payment Flow
Aussie Smart Energy integrates **ANZ Worldline Solutions Hosted Checkout** via the official `@onlinepayments/sdk-nodejs` library.

```
[React Customer Portal] 
       │ 1. User enters invoice/reference details at /pay-online
       ▼
[POST /api/payments/create] 
       │ 2. Backend validates payload and creates PENDING Payment document in MongoDB
       │ 3. Backend calls ANZ Worldline Hosted Checkout API
       │ 4. Receives hostedCheckoutRedirectUrl & hostedCheckoutId
       ▼
[ANZ Worldline Secure Gateway] 
       │ 5. Customer enters card details securely (never touches Aussie Smart Energy servers)
       │ 6. ANZ redirects customer back to /payment/result?paymentId=...
       ▼
[GET /api/payments/:paymentId/status] 
       │ 7. Backend queries ANZ API directly to verify payment completion
       │ 8. Payment status updated to SUCCESS / FAILED
       ▼
[Customer Receipt / Admin Dashboard]
```

### Local Testing Simulator
To facilitate local development without requiring live card test transactions, an offline simulator is included:

- **Simulator URL**: `http://localhost:5173/hostedcheckout/simulate`
- **Features**: Test **APPROVED**, **CANCELLED**, and **DECLINED** outcomes. The simulator mimics the exact parameters returned by the ANZ Worldline Hosted Checkout gateway and redirects directly back to `PaymentResult.jsx`.

---

## ⭐ Google Reviews Integration

### Data Source & Architecture

The Google Reviews system uses a **two-layer approach**:

| Layer | Source | Purpose |
| :--- | :--- | :--- |
| **Primary** | MongoDB (seeded) | 10 real, verified written reviews scraped from the Aussie Smart Energy Google Business Profile |
| **Sync** | Google Places API (New) | Background sync via `googleReviewSyncService.js` to keep ratings and metadata fresh |
| **Live Widget** | Jotform embed *(optional)* | `GoogleReviewsWidget.jsx` — a zero-backend, real-time embed requiring no API key |

> **Why 10 reviews?**  
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
| `GET` | `/api/headlines` | Public | Fetch active promotional announcement headlines |
| `GET` | `/api/headlines/admin/all` | Protected (Admin) | Fetch all headlines with admin metadata |
| `POST` | `/api/headlines` | Protected (Admin) | Create a new announcement headline |
| `PUT` | `/api/headlines/:id` | Protected (Admin) | Update an existing headline |
| `PATCH` | `/api/headlines/:id/toggle` | Protected (Admin) | Toggle headline active/inactive status |
| `DELETE` | `/api/headlines/:id` | Protected (Admin) | Remove an announcement headline |

### Payments & Hosted Checkout
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/create` | Public | Create payment order & ANZ Hosted Checkout session |
| `GET` | `/api/payments/:paymentId/status` | Public | Verify payment status via ANZ API & update database |
| `POST` | `/api/payments/webhook` | Public | ANZ Worldline transaction feedback webhook |
| `GET` | `/api/payments/admin/all` | Protected (Admin) | Fetch payment transactions list and revenue stats |
| `POST` | `/api/payments/:paymentId/sync` | Protected (Admin) | Manually re-sync payment status against ANZ Worldline gateway |

---

## 📜 Available Scripts

### Root Directory (Frontend)
- `npm run dev` — Starts the Vite development server with hot module replacement (HMR).
- `npm run build` — Compiles and bundles production-ready frontend assets into `dist/`.
- `npm run preview` — Locally previews the built production bundle.
- `npm run lint` — Runs Oxlint for static code analysis.

### Server Directory (Backend)
- `npm run dev` — Starts Express backend with `nodemon` auto-reloading.
- `npm start` — Runs the backend server in production mode using `node src/server.js`.
- `npm run seed:admin` — Seeds the database with default administrator credentials from `.env`.
- `npm run export:db` — Exports all database collections into portable JSON files (`database_export.json`, `seed_data.json`).
- `npm run migrate:cloudinary` — Migrates local `/uploads/` images to Cloudinary CDN storage.
- `node src/scripts/seedReviews.js` — Seeds the 10 verified real Google reviews into MongoDB.
- `node src/scripts/reseedRealReviews.js` — Purges all Google reviews and re-seeds from source data.
- `node src/scripts/seedTargetDatabase.js "<URI>" [--drop]` — Seeds data into a target MongoDB cluster.

---

## 📄 License

This project is proprietary and developed for **Aussie Smart Energy**. All rights reserved.
