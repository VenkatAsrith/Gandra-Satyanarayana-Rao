const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', requireAuth, requireAdmin, getDashboardStats);

module.exports = router;
