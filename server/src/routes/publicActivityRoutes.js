const express = require('express');
const router = express.Router();
const {
  getPublicActivities,
  adminGetActivities,
  adminCreateActivity,
  adminUpdateActivity,
  adminDeleteActivity
} = require('../controllers/publicActivityController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public
router.get('/', getPublicActivities);

// Admin
router.get('/admin/all', requireAuth, requireAdmin, adminGetActivities);
router.post('/admin', requireAuth, requireAdmin, adminCreateActivity);
router.put('/admin/:id', requireAuth, requireAdmin, adminUpdateActivity);
router.delete('/admin/:id', requireAuth, requireAdmin, adminDeleteActivity);

module.exports = router;
