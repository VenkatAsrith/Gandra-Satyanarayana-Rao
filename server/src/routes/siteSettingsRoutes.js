const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/siteSettingsController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public
router.get('/', getSettings);

// Admin
router.put('/', requireAuth, requireAdmin, updateSettings);

module.exports = router;
