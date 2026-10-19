# Production Deployment Guide — Sathenna MERN Application

## 1. Environment Configuration

Copy `.env.example` to `server/.env` and configure:

```ini
NODE_ENV=production
PORT=5000
CLIENT_URL=https://sathenna.in
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/sathenna_profile?retryWrites=true&w=majority
JWT_SECRET=generate_a_random_64_character_hex_secret_here
JWT_EXPIRES_IN=7d
COOKIE_SECRET=generate_a_random_64_character_cookie_secret_here
ADMIN_SETUP_SECRET=generate_a_strong_bootstrap_secret_here

# Cloudinary Integration (Required for production media CDN)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 2. Production Build Commands

```bash
# 1. Install all dependencies
npm run install:all

# 2. Seed verified database records (if initial deployment)
npm run seed

# 3. Create administrator credentials
npm run admin:setup -- "Constituency Administrator" "admin@sathenna.in" "SecureProductionPassword2026!"

# 4. Build frontend client for production
npm run build:client
```

---

## 3. Deployment Topologies

### Option A: Unified Container / VPS (Ubuntu / Debian / Docker)
- **Node.js Process**: Managed with PM2:
  ```bash
  pm2 start server/src/server.js --name "sathenna-api" -i max
  ```
- **Nginx Reverse Proxy**:
  - Serves static assets from `client/dist/`
  - Proxies `/api/` to `http://127.0.0.1:5000`
  - Enforces HTTPS and HTTP/2 with Let's Encrypt SSL certificates.

### Option B: Cloud Decoupled (Vercel / Render / MongoDB Atlas)
- **Frontend**: Deploy `client/` to Vercel or Cloudflare Pages with SPA redirect rule:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **Backend**: Deploy `server/` as a Web Service on Render, Railway, or AWS Elastic Beanstalk.
- **Database**: MongoDB Atlas M0/M10 cluster with IP access lists.
- **Media**: Cloudinary CDN media delivery with automated WebP/AVIF transformation.

---

## 4. Health & Verification Check

Once deployed, verify the health check endpoint:
```bash
curl -I https://your-domain.com/api/v1/health
```
Expected response:
```json
{
  "status": "ok",
  "service": "Gandra Satyanarayana Rao Public Profile API",
  "version": "1.0.0"
}
```
