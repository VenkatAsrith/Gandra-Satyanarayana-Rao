# Website Architecture, Device Responsiveness & Functional Specification
**Project:** Official Public Profile & Administrative Content Management System (CMS)  
**Dignitary:** Gandra Satyanarayana Rao (Sathenna) — MLA, Bhupalpalle Assembly Constituency (No. 108), Telangana  
**Technology Stack:** MERN Monorepo (React 18 + Vite, Node.js + Express.js, MongoDB, Pure Editorial CSS3, Cloudinary)

---

## 1. Executive Summary & Purpose

This web application serves as the verified, high-performance public digital portal and administrative communication backbone for **Gandra Satyanarayana Rao (Sathenna)**, Member of the Legislative Assembly (MLA) for Bhupalpalle, Telangana. 

### Core Objectives:
1. **Public Transparency & Governance:** Delivers a single source of truth for constituency development projects, fund allocations (in ₹ Crores), Assembly questions, and public interventions.
2. **Citizen Redressal & Access:** Offers direct grievance intake allowing residents from all mandals to submit petitions, track complaints, and reach constituency camp offices.
3. **Bilingual Democratic Access:** Real-time dual-language architecture (English and Telugu) ensuring accessible communication for rural citizens, state officials, and press correspondents.
4. **Autonomous Content Administration:** A secured Admin CMS enabling constituency staff to manage media, announce works, publish video reels, update demographic data, and process citizen grievances without developer dependency.

---

## 2. Technical Architecture & Monorepo Structure

```
/
├── client/                     # Frontend Single Page Application (SPA)
│   ├── src/
│   │   ├── components/         # Modular layout, public sections & common controls
│   │   │   ├── common/         # ErrorBoundary, ProtectedRoute, SmoothScrollProvider
│   │   │   ├── layout/         # Header, Footer, AdminLayout
│   │   │   └── public/         # HeroSection, JourneyTimeline, VideoReelShowcase,
│   │   │                       # StoryGrid, WorkSpreads, ConstituencyOverview,
│   │   │                       # ContactChannels, DynamicSectionRenderer, AnimatedList
│   │   ├── pages/              # Public Pages (Home, About, Work, Gallery, Constituency, Contact)
│   │   │                       # & Admin CMS Pages (Dashboard, Settings, Projects, etc.)
│   │   ├── context/            # Global AuthContext & ToastContext
│   │   ├── i18n/               # LanguageContext & English/Telugu translation dictionaries
│   │   ├── services/           # Axios API client (/api/v1) with media resolution
│   │   ├── data/               # Local media catalogs & video metadata
│   │   └── styles/             # Pure CSS design system (main.css, admin.css)
│   └── vite.config.js
├── server/                     # Backend REST API Server
│   ├── src/
│   │   ├── config/             # MongoDB connection (Mongoose)
│   │   ├── controllers/        # Business logic for 8 domain modules
│   │   ├── middleware/         # JWT Auth, Multer upload, Rate limiting, Error handler
│   │   ├── models/             # Mongoose schemas (SiteSettings, Profile, PublicWork, etc.)
│   │   ├── routes/             # Versioned REST endpoints (/api/v1/*)
│   │   └── services/           # Cloudinary SDK with local disk fallback
│   └── tests/                  # Automated API integration test suite
├── docs/                       # Architecture, deployment, and operational guides
└── package.json                # Root monorepo orchestration
```

---

## 3. Nature to the Device (Responsive Design & Device Behavior)

The website is engineered with a **Device-First, Mobile-Adaptive Editorial Design Philosophy**. Rather than relying on heavy third-party UI libraries (such as Bootstrap or Tailwind runtime bundles), it utilizes pure CSS3 custom properties, fluid typography `clamp()`, and tailored media queries to deliver an optimal experience across all hardware types.

### 3.1 Device Breakpoint Grid
* **Ultra-wide & 4K Displays (`> 1440px`)**: Constrained reading containers (`max-width: 1280px` / `1440px`) preventing visual distortion and excessive line lengths.
* **Standard Desktop & Laptops (`1024px – 1440px`)**: Multi-column editorial magazine spreads, side-by-side video theater, horizontal timeline navigation.
* **Tablets & Small Laptops (`769px – 1023px`)**: Collapses multi-column sections into balanced 2-column grids; adapts navigation header height to 70px.
* **Standard Mobile Devices (`481px – 768px`)**: Single-column vertical stacks; sticky interactive controls; touch-optimized button hit zones (`min-height: 48px`).
* **Compact Smartphones (`320px – 480px`)**: Micro-navigation collapses to conserve vertical viewport height; padding scales to `1rem`; fluid fonts scale down without line breaking.

---

### 3.2 Specific Device Adaptations by Component

| Component | Desktop Behavior (> 1024px) | Mobile & Touch Device Behavior (< 768px) | Device Optimization Technique |
| :--- | :--- | :--- | :--- |
| **Site Navigation (`Header`)** | Full horizontal bar with high-contrast links, language toggle, and action button. | Collapses into an accessible mobile hamburger drawer with slide-out overlay; backdrop blur. | `aria-expanded` touch toggling; zero horizontal overflow. |
| **Hero Section (`HeroSection`)** | Split-screen layout: high-resolution leader portrait alongside editorial typography and live credential tags. | Stacks vertically with the portrait framing the top, text below; micro-nav buttons hidden on <480px to save critical viewport. | Fluid font sizing: `clamp(2rem, 5vw, 4.5rem)`. |
| **Journey Timeline (`JourneyTimeline`)** | Interactive `ScrollStack` with sticky overlapping cards that cascade smoothly as the user scrolls. | Flattens into a continuous vertical milestone timeline (`position: relative !important`) for seamless swipe scrolling. | Prevents scroll-trapping on mobile touchscreens. |
| **Video Reel Showcase (`VideoReelShowcase`)** | 2-column video theatre: 16:9 / 9:16 primary media player on the left, synchronized interactive playlist on the right. | Full-width vertical single-column video deck; playlist shifts beneath video player with finger-scrollable cards. | Native HTML5 video controls, touch scrubbing, autoplay fallback with error handling. |
| **Work Spreads (`WorkSpreads`)** | Multi-column grid displaying development project cards, budget chips (₹ Cr), and progress badges. | Single-column swipeable cards with full-width action links and simplified budget summaries. | CSS Grid `grid-template-columns: 1fr` at `< 900px`. |
| **Media Gallery (`GalleryGrid`)** | 3 to 4 column masonry grid with category filter tabs and hover zoom effects. | 1 to 2 column touch cards; filter tabs enable horizontal finger swipe with hidden scrollbars. | Modal lightbox supports touch gestures and keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`). |
| **Citizen Grievance Form (`ContactPage`)** | 2-column aligned input grid (Name, Phone, Mandal, Subject, Grievance Details). | Single-column vertical thumb-friendly inputs with large tap targets (`min-height: 48px`) and native virtual keyboard types (`tel`, `email`). | Auto-focus handling and native input validation. |

---

### 3.3 Touch, Performance & Accessibility on Mobile Devices
1. **Zero-Lag Fluid Scaling:** Utilizes CSS `clamp()` equations so font sizes, card margins, and paddings smoothly adjust to any viewport width without abrupt jumping.
2. **Motion Sensitivity (`prefers-reduced-motion`):** Honors user device settings:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
3. **Data & Battery Efficiency:** Local media fallback, image WebP compression, lazy loading (`loading="lazy"`), and deferment of off-screen videos ensure rapid loading even on low-speed 3G/4G networks in rural mandals.

---

## 4. Comprehensive Work & System Functionality

The platform is divided into two distinct operational ecosystems: **Public-Facing Portal** and **Administrative CMS**.

### 4.1 Public-Facing Capabilities

#### 1. Home Page (`/`)
* **Leader Presentation:** High-impact hero section highlighting Sathenna’s role as MLA for Bhupalpalle (Constituency No. 108), Congress party affiliation, and core vision.
* **Story Grid:** Key pillars of governance: farmer welfare, Singareni coal worker rights, educational infrastructure, and temple tourism revival.
* **Journey Milestones:** Chronicle of Sathenna's political service from Buddharam Village Sarpanch, Ghanapur ZPTC member (1996), assembly candidate (2014, 2018), joining INC (2021), to his 2023 victory with a **52,699 vote majority**.
* **Constituency Demographic Card:** Quick statistics displaying geographic coverage (2,293 sq km), 11 administrative mandals, and major industrial/ecological landmarks.
* **Video Reel Showcase:** High-definition video player streaming actual developmental activities: agriculture drone launches, mega job fairs, medical vehicle distributions, and student interactions.
* **Featured Advocacy & Speeches:** Highlights key Assembly interventions concerning Singareni Collieries Company Limited (SCCL) workers, open-cast mine issues, and irrigation canal repairs.
* **Dynamic Sections:** Real-time CMS-injected announcements or priority government notices displayed at custom positions.

#### 2. About & Biography Page (`/about`)
* **Academic Credentials:** Verified records (Kakatiya University Bachelor of Arts 1983, Civil ITI 1978).
* **Electoral Performance:** Official Election Commission of India (ECI) certified data (1,23,116 votes, 54.55% vote share in December 2023).
* **Grassroots Evolution:** Chronicle of 40+ years in public life, demonstrating long-standing community rapport in Jayashankar Bhupalpally.

#### 3. Development Works Tracker (`/work`)
* **Project Portfolio:** Catalog of infrastructure achievements categorized by sector (Irrigation, Roads, Healthcare, Heritage/Tourism, Mining Welfare).
* **Financial Transparency:** Itemized project expenditures (e.g., ₹31.00 Cr Ghanapur canal restoration, ₹12.15 Cr Kotanchu temple tourism package).
* **Lifecycle Status Badges:** Visual status indicators (`Completed`, `In Progress`, `Sanctioned`, `Proposed`).
* **Legislative Record:** Assembly questions tabled, petitions addressed to ministerial departments, and gazetted milestones.

#### 4. Constituency Deep-Dive (`/constituency`)
* **Geographic & Demographic Breakdown:** Detailed roster of all 11 mandals (Bhupalpalle, Ghanapur, Regonda, Mogullapalle, Chityal, Tekumatla, Malhar Rao, Kataram, Mahadevpur, Palimela, Mutharam).
* **Regional Pillars:** Focus on the Singareni coal belt, Godavari river basin, agricultural lifelines, and tribal welfare hamlets.

#### 5. Photo Archive & Media Gallery (`/gallery`)
* **Multi-Category Filter:** Browse images by `All`, `Portraits`, `Development Works`, `Assembly & Events`, and `Constituency Tours`.
* **Accessible Lightbox Modal:** Full-screen viewing with keyboard shortcuts (`Escape` to close, `Arrow Left` / `Arrow Right` to navigate), image captions, and publication dates.

#### 6. Citizen Grievance Portal & Directory (`/contact`)
* **Official Directory:** Verified phone (`+91 9849051228`), email, and physical camp office addresses in Buddharam village and Bhupalpalle headquarters.
* **Citizen Grievance Submission:** Digital intake form capturing citizen name, mobile number, mandal, village, category, and issue description.
* **Spam Mitigation:** Protected by backend rate limiters (maximum 5 submissions per 10 minutes per IP).

#### 7. Bilingual Internationalization Engine (English & Telugu)
* **Real-Time Language Switcher:** Single-click toggle in the header switching the entire interface between English and native Telugu (`తెలుగు`).
* **Cultural Authenticity:** Official Telugu translations covering administrative terminology, political designations, and localized constituency nomenclature.

---

### 4.2 Administrative Content Management System (CMS) (`/admin`)

The protected Admin Suite provides authenticated constituency operators complete oversight through eight specialized management consoles:

```
Admin CMS Portal (/admin)
├── 1. Overview Dashboard       # Key metrics: Projects count, Active grievances, Media total
├── 2. Sections Manager         # Dynamic homepage section ordering, enable/disable toggle
├── 3. Site Settings            # Official phone numbers, emails, addresses, social links
├── 4. Profile & Journey        # Biographical data, election metrics, milestone timeline
├── 5. Public Works             # Add/Edit development projects, budget (₹ Cr), statuses
├── 6. Public Activities        # Assembly interventions, inspections, press statements
├── 7. Media Gallery            # Image uploader (Cloudinary/Local), alt text, category tagging
├── 8. Constituency Manager     # Mandal names, population counts, regional highlights
└── 9. Grievance Management     # Citizen petition tracker: Pending → Reviewing → Resolved
```

#### Detailed Admin Modules:
1. **Authentication & Session Security:**
   - Protected by JSON Web Tokens (JWT) stored in secure `HttpOnly` cookies.
   - Passwords secured with Bcrypt salting (`12 rounds`).
   - Rate-limiting prevents automated brute-force attacks (10 attempts / 15 minutes).
2. **Dashboard Overview (`/admin`):**
   - Live dashboard cards displaying total projects, completed projects, open grievances, uploaded photos, and active dynamic sections.
3. **Dynamic Sections Manager (`/admin/sections`):**
   - Create, order, and toggle custom visual sections on the public homepage without code redeployments.
4. **Site & Brand Settings (`/admin/settings`):**
   - Control public telephone numbers, official email addresses, social profile links, and legal disclaimers.
5. **Biographical Journey Manager (`/admin/profile`):**
   - Update official bio statements, ECI voting statistics, and append new milestones to the life timeline.
6. **Projects & Works CMS (`/admin/projects`):**
   - Add new works, update progress percentages, track funding agencies, and maintain private `internalNotes` (automatically sanitized and stripped from public API responses).
7. **Activities & Speeches CMS (`/admin/activities`):**
   - Publish press notes, record assembly speeches, and flag key accomplishments with the `isHighlighted` banner.
8. **Media Gallery CMS (`/admin/gallery`):**
   - Upload photographic assets with automatic Cloudinary remote processing, generate responsive formats, assign categories, and securely delete obsolete files using remote public IDs.
9. **Constituency Information CMS (`/admin/constituency`):**
   - Update mandal rosters, demographic census figures, and key geographical landmarks.
10. **Citizen Grievance Redressal CMS (`/admin/submissions`):**
    - Monitor incoming citizen petitions in real time.
    - Update workflow statuses (`Pending`, `Under Review`, `Resolved`, `Closed`).
    - Add private administrative notes regarding government department referrals and officer assignments.

---

## 5. Security, Reliability & Data Integrity

1. **Information Isolation:** Sensitive fields such as `internalNotes` and administrative user hashes use Mongoose `{ select: false }` to prevent accidental data leaks to public API consumers.
2. **Input Sanitization & Validation:** Express-validator and Mongoose schema constraints ensure strict payload conformity.
3. **Rate Limiting:**
   - Login endpoint: 10 requests per 15 minutes.
   - Contact/Grievance intake: 5 requests per 10 minutes.
4. **Media Resilience:** The dual-engine media service uploads to Cloudinary in production, but seamlessly falls back to local disk storage (`server/public/uploads/`) during offline or staging development.
5. **Crash Isolation:** React `ErrorBoundary` wrappers encircle all major public sections, ensuring an isolated component fault never takes down the entire application.

---

## 6. Summary Reference Table

| Aspect | Public Portal | Admin CMS |
| :--- | :--- | :--- |
| **Primary Route** | `/` (Home, About, Work, Gallery, Contact, Constituency) | `/admin` (Protected sub-routes) |
| **Audience** | Citizens, Constituents, Press, Government Officials | MLA Staff, Communications Team, Constituency Administrators |
| **Language Support** | Full English & Telugu (`తెలుగు`) toggle | English administrative interface |
| **Device Optimization** | Mobile-first, fluid typography, touch-friendly, reduced motion | Responsive desktop & tablet dashboard layout |
| **Data Flow** | Read-only public cache + Grievance submission | Full CRUD (Create, Read, Update, Delete) with JWT Auth |
| **Media Handling** | Optimized WebP/AVIF streaming + HTML5 responsive video | Multer file intake with Cloudinary CDN integration |

