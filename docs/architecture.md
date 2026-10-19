# System Architecture — Sathenna Public Profile & Admin CMS

## 1. Executive Overview

This application is a full-stack, production-grade MERN architecture built for **Gandra Satyanarayana Rao (Sathenna)**, Member of the Legislative Assembly for Bhupalpalle (108), Jayashankar Bhupalpally district, Telangana.

```
                         ┌──────────────────────────────────────────────┐
                         │              Client (React + Vite)           │
                         │   - Public Monograph (SSR/SPA Fluid CSS)     │
                         │   - Admin CMS Dashboard (Protected Routes)   │
                         └──────────────────────┬───────────────────────┘
                                                │ REST API / JSON (/api/v1)
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │           Server (Node.js + Express)         │
                         │   - Auth: JWT + HttpOnly Cookies + Bcrypt    │
                         │   - Rate Limiters (Login & Contact Spam)     │
                         │   - Security: Helmet, CORS, Error Handler    │
                         └──────────────┬────────────────┬──────────────┘
                                        │                │
                                        ▼                ▼
                         ┌──────────────────────┐ ┌─────────────────────┐
                         │  MongoDB Persistence │ │  Cloudinary Service │
                         │  - SiteSettings      │ │  - Signed Uploads   │
                         │  - ProfileContent    │ │  - Asset Deletion   │
                         │  - PublicWork        │ │  - Format & Quality │
                         │  - PublicActivity    │ │  - Local Fallback   │
                         │  - GalleryMedia      │ └─────────────────────┘
                         │  - ConstituencyInfo  │
                         │  - ContactSubmission │
                         │  - AdminUser         │
                         └──────────────────────┘
```

---

## 2. Component Layers

### 2.1 Frontend Client (`client/`)
- **Technology**: React 18, React Router v6, Vite 6, Pure Vanilla CSS3 design system (Fluid typography `clamp()`, 8px layout grid, custom design tokens).
- **Public Routes**:
  - `/`: Editorial Homepage (Hero, Story Grid, Dark Journey Monograph `#111111`, Constituency Overview, Work Spreads, Featured Advocacy, Chronology, Media Mosaic, Contact Channels).
  - `/about`: Documented Biography, Kakatiya University BA 1983, Civil ITI credentials, and ECI electoral dossier.
  - `/work`: Public works status tracker, funding amounts (₹31 Cr Ghanapur canal, ₹12.15 Cr Kotanchu temple), and Assembly floor questions.
  - `/gallery`: Photographic archive with category filtering (`all`, `portraits`, `events`, `constituency`, `work`) and accessible modal lightbox with keyboard controls (`Esc`, `ArrowLeft`, `ArrowRight`).
  - `/contact`: Verified directory phone (`9849051228`), Buddharam camp office address, and live citizen grievance intake form.
- **Admin CMS Routes (`/admin`)**:
  - Protected by `ProtectedRoute` and server-side JWT verification.
  - Modules: Overview Dashboard, Site & Brand Settings, Biography & Journey, Public Works, Public Activities, Media Gallery, Constituency Data, and Citizen Grievances.

### 2.2 Backend API (`server/`)
- **Technology**: Node.js v22, Express.js 4, Mongoose 8, JWT, BcryptJS, Multer, Helmet, Express-Rate-Limit.
- **API Versioning**: Standardized under `/api/v1`.
- **Security & Boundaries**:
  - `internalNotes` on public works and activities are hidden from public queries by default via Mongoose `{ select: false }`.
  - Rate limiting mitigates credential brute-forcing (10 requests / 15 mins) and contact form spam (5 submissions / 10 mins).
  - Generic authentication messages prevent user enumeration attacks.

### 2.3 Media Strategy (Cloudinary + Local Fallback)
- **Production**: Uses Cloudinary v2 SDK for signed uploads, WebP/AVIF auto-format negotiation, and remote asset deletion using canonical `public_id`.
- **Development/Offline**: Automatically activates local disk storage when Cloudinary credentials are not present, ensuring zero-configuration local development.

---

## 3. Database Schema Entities

| Collection | Model File | Purpose |
| :--- | :--- | :--- |
| `adminusers` | `AdminUser.js` | Admin accounts with bcrypt password hashes and roles |
| `sitesettings` | `SiteSettings.js` | Site titles, phone (`9849051228`), email, address, disclaimers |
| `profilecontents` | `ProfileContent.js` | Biography, ECI electoral metrics (52,699 margin), journey timeline |
| `publicworks` | `PublicWork.js` | Projects, amounts (Crores), status, press citations, internal notes |
| `publicactivities` | `PublicActivity.js`| Assembly speeches (Singareni miners), inspections, civic events |
| `gallerymedias` | `GalleryMedia.js` | Photo archive with Cloudinary `publicId`, alt text, categories |
| `constituencyinfos`| `ConstituencyInfo.js` | 2011 Census metrics, 2,293 sq km area, mandal roster |
| `contactsubmissions`| `ContactSubmission.js`| Citizen grievances with status tracking and admin notes |
