const express = require('express');
const router = express.Router();
const {
  getPublicWorks,
  getPublicWorkBySlug,
  adminGetWorks,
  adminCreateWork,
  adminUpdateWork,
  adminDeleteWork
} = require('../controllers/publicWorkController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/', getPublicWorks);
router.get('/:slug', getPublicWorkBySlug);

// Admin endpoints
router.get('/admin/all', requireAuth, requireAdmin, adminGetWorks);
router.post('/admin', requireAuth, requireAdmin, adminCreateWork);
router.put('/admin/:id', requireAuth, requireAdmin, adminUpdateWork);
router.delete('/admin/:id', requireAuth, requireAdmin, adminDeleteWork);

module.exports = router;
