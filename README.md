# Gandra Satyanarayana Rao (Sathenna) — MERN Public Profile & Admin CMS

A production-grade, editorial public-profile website and secure content management system for **Gandra Satyanarayana Rao (Sathenna)**, Member of the Legislative Assembly (MLA) for Bhupalpalle constituency (No. 108), Jayashankar Bhupalpally district, Telangana, representing the Indian National Congress.

---

## 1. Architecture & Tech Stack

```text
/
├── client/                     # React 18 + Vite SPA with bespoke editorial styling
│   ├── src/
│   │   ├── components/         # Layout (Header, Footer, AdminLayout), Public, Common
│   │   ├── pages/              # Public (Home, About, Work, Gallery, Contact) & Admin CMS
│   │   ├── context/            # Authentication & session state
│   │   ├── services/           # Versioned API client (/api/v1)
│   │   └── styles/             # Pure CSS design system (main.css, admin.css)
│   └── package.json
├── server/                     # Node.js + Express REST API
│   ├── src/
│   │   ├── config/             # MongoDB connection (Mongoose)
│   │   ├── controllers/        # Business logic for all 8 content & administrative domains
│   │   ├── middleware/         # JWT Auth, Multer, Rate Limiting, Centralized Error Handling
│   │   ├── models/             # Mongoose schemas: Settings, Profile, Projects, Activities, Media, Constituency, Submissions, AdminUser
│   │   ├── routes/             # Versioned Express routes (/api/v1/*)
│   │   ├── services/           # Cloudinary integration with safe local dev fallback
│   │   └── utils/              # Database seed script and Admin provisioning CLI
│   ├── tests/                  # Automated API test suite (Jest + Supertest)
│   └── package.json
├── docs/                       # Architecture, Admin Guide, and Deployment Guides
├── .env.example                # Canonical environment template
└── package.json                # Root monorepo orchestration
```

---

## 2. Quick Start & Local Execution

### Prerequisites
- **Node.js**: v18+ (verified on v22.16.0)
- **MongoDB**: Local `mongod` service listening on `27017` or a MongoDB Atlas URI

### Installation & Database Seeding

```bash
# 1. Install all dependencies across root, server, and client
npm run install:all

# 2. Seed verified database content from official dossier
npm run seed

# 3. (Optional) Provision or reset administrator credentials
npm run admin:setup -- "Constituency Administrator" "admin@sathenna.in" "Sathenna@Admin2026!"
```

### Starting the Applications

```bash
# Run both Backend API (port 5000) and Frontend Client (port 5173) concurrently:
npm run dev
```

- **Public Website**: [http://localhost:5173/](http://localhost:5173/)
- **Admin CMS Dashboard**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
  - Default Email: `admin@sathenna.in`
  - Default Password: `Sathenna@Admin2026!`
- **Backend API Health Check**: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

---

## 3. Automated Test Verification

Run all test suites across the monorepo:

```bash
# Run server API tests (Jest + Supertest) and client build check:
npm test

# Run server API tests only:
npm run test:server

# Run client production build:
npm run build:client
```

---

## 4. Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `development` / `production` |
| `PORT` | API server port | `5000` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/sathenna_profile` |
| `JWT_SECRET` | Secret key for JWT signing | `sathenna_dev_jwt_secret_key_...` |
| `JWT_EXPIRES_IN` | Token duration | `7d` |
| `COOKIE_SECRET` | Cookie signing secret | `sathenna_dev_cookie_secret_...` |
| `ADMIN_SETUP_SECRET`| One-time setup secret | `bootstrap_admin_secret_...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name | *(Optional in dev: fallback active)* |
| `CLOUDINARY_API_KEY` | Cloudinary API key | *(Optional in dev: fallback active)* |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | *(Optional in dev: fallback active)* |

---

## 5. Security & Factual Attribution Discipline

- **ECI Electoral Integrity**: 123,116 votes (54.55% vote share) and 52,699 vote victory margin strictly mapped from Election Commission records.
- **Academic Qualifications**: BA (Kakatiya University, Warangal, 1983) and ITI Civil Diploma verified.
- **Representative Actions**: All development claims strictly preserve verified press citations (The Hans India, Sakshi, V6 Velugu, Andhra Prabha) and state actions (*announced sanction, laid foundation stone, convened review, intervened in assembly*).
- **Public Directory Contact**: Telephone `9849051228` from Telangana State Legislative Assembly Directory.
- **Internal Verification Notes**: Flagged fields and confidential notes are strictly excluded from public API responses.
- **Spam Mitigation**: Contact and login endpoints protected by IP rate limiters.
