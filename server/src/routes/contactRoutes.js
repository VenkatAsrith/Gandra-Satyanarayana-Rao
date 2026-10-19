const express = require('express');
const router = express.Router();
const {
  submitRepresentation,
  adminGetSubmissions,
  adminUpdateSubmission,
  adminDeleteSubmission
} = require('../controllers/contactController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const { contactLimiter } = require('../middleware/rateLimiter');

// Public representation intake with spam limiter
router.post('/', contactLimiter, submitRepresentation);

// Admin endpoints
router.get('/admin/all', requireAuth, requireAdmin, adminGetSubmissions);
router.put('/admin/:id', requireAuth, requireAdmin, adminUpdateSubmission);
router.delete('/admin/:id', requireAuth, requireAdmin, adminDeleteSubmission);

module.exports = router;
