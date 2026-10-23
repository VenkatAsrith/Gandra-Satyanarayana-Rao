# GitHub Actions CI/CD Architecture & Pipeline Guide

This repository utilizes a production-grade **Continuous Integration & Continuous Deployment (CI/CD)** pipeline powered by **GitHub Actions**.

---

## 1. Pipelines Overview

| Workflow | File Path | Triggers | Responsibilities |
|---|---|---|---|
| **CI Pipeline** | `.github/workflows/ci.yml` | `push` & `pull_request` to `master`/`main`, `workflow_dispatch` | • Node.js 20 & 22 matrix build for Vite frontend<br>• Dockerized MongoDB 6.0 service container<br>• Database seeding & Jest integration tests (20/20 tests)<br>• Monorepo integrity validation & artifact archiving |
| **CD Pipeline** | `.github/workflows/deploy.yml` | `release` published, manual `workflow_dispatch` (target env selection) | • Packages production `dist/` bundle<br>• Triggers Render/Railway backend deploy webhooks<br>• Triggers Vercel/Cloudflare frontend deploy webhooks<br>• Pings production `/api/v1/health` endpoint for validation |

---

## 2. Continuous Integration (CI) Workflow

The CI workflow executes automatically on every push or PR:

### A. Client Build (`client-build`)
- **Matrix**: Node.js `20.x` and `22.x` on `ubuntu-latest`.
- **Steps**:
  1. Checks out repository with `actions/checkout@v4`.
  2. Sets up Node.js with automated npm caching.
  3. Installs client dependencies: `npm --prefix client ci || npm --prefix client install`.
  4. Builds production bundle: `npm --prefix client run build` with Vite.
  5. Verifies `client/dist/index.html` presence and integrity.
  6. Uploads the distribution artifact (`client-production-dist`) with 7-day retention.

### B. Server API & Integration Tests (`server-test`)
- **Service Container**: Spawns an official `mongo:6.0` container on port `27017` with built-in healthchecks.
- **Steps**:
  1. Installs server dependencies with lockfile caching.
  2. Seeds test data: `npm --prefix server run seed` into `mongodb://127.0.0.1:27017/sathenna_profile_test`.
  3. Executes the full Jest test suite with Supertest:
     - 7 public endpoint tests (health, site settings, profile, projects, activities, gallery, constituency).
     - Grievance form validation & rate limiting tests.
     - Admin authentication, JWT cookies, and protected authorization tests.
     - Dynamic Section Builder CRUD & multilingual toggle tests.
  4. Guarantees 100% test passing before permitting merges.

### C. Monorepo Integrity Check (`monorepo-check`)
- Ensures root package scripts (`npm run build`, `npm run test`) operate consistently.

---

## 3. Continuous Deployment (CD) Workflow

The CD workflow automates production delivery when a new release is drafted or manually triggered:

1. **Build Step**: Generates optimized production assets with `VITE_API_URL`.
2. **Backend Deployment**: If `RENDER_DEPLOY_HOOK_URL` is set in repository secrets, dispatches an automated build webhook to Render/Railway.
3. **Frontend Deployment**: If `FRONTEND_DEPLOY_HOOK_URL` is configured, triggers a zero-downtime static rebuild on Vercel or Cloudflare Pages.
4. **Health Verification**: Pings `PRODUCTION_HEALTH_URL` and validates HTTP 200 OK status.

---

## 4. GitHub Secrets Reference

To enable automated continuous deployment to your production hosts, configure these in **GitHub Repository Settings → Secrets and variables → Actions**:

| Secret Key | Description | Optional / Required |
|---|---|---|
| `RENDER_DEPLOY_HOOK_URL` | Webhook URL from Render Web Service settings to trigger automated backend re-deploy | Optional (Enables automated API deploy) |
| `FRONTEND_DEPLOY_HOOK_URL` | Deploy hook from Vercel / Cloudflare Pages / Netlify to trigger frontend re-deploy | Optional (Enables automated frontend deploy) |
| `PRODUCTION_API_URL` | Production API domain (e.g. `https://api.sathenna.in/api/v1`) | Optional (Defaults to relative `/api/v1`) |
| `PRODUCTION_HEALTH_URL` | Full URL to production healthcheck (e.g. `https://api.sathenna.in/api/v1/health`) | Optional (Enables post-deploy validation) |

---

## 5. Local Pre-Commit Verification

Before pushing changes to GitHub, you can execute the exact same checks locally:

```bash
# 1. Run root build check
npm run build

# 2. Run full test suite (server + client)
npm test

# 3. Verify server seeding
npm run seed
```
