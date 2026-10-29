const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const siteSettingsRoutes = require('./routes/siteSettingsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const publicWorkRoutes = require('./routes/publicWorkRoutes');
const publicActivityRoutes = require('./routes/publicActivityRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const constituencyRoutes = require('./routes/constituencyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const adminRoutes = require('./routes/adminRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// CORS setup
const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      const isAllowed =
        configuredOrigins.includes(origin) ||
        defaultOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.netlify.app') ||
        origin.endsWith('.onrender.com') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1');

      if (isAllowed) {
        callback(null, true);
      } else {
        // Fallback to allow communication for newly deployed client domains
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'sathenna_dev_cookie_secret_84729482934'));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Serve public uploads and media
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/media', express.static(path.join(__dirname, '../../client/public/media')));

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Gandra Satyanarayana Rao Public Profile API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/site-settings', siteSettingsRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/projects', publicWorkRoutes);
app.use('/api/v1/activities', publicActivityRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/constituency', constituencyRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/sections', sectionRoutes);
app.use('/api/v1/admin', adminRoutes);

// Catch 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Centralized error handling
app.use(errorHandler);

module.exports = app;
