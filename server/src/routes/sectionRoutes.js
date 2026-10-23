const express = require('express');
const router = express.Router();
const {
  getPublishedSections,
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  reorderSections,
  toggleSection,
  deleteSection
} = require('../controllers/sectionController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/', getPublishedSections);

// Admin endpoints
router.get('/admin', requireAuth, requireAdmin, getAllSections);
router.get('/admin/:id', requireAuth, requireAdmin, getSectionById);
router.post('/admin', requireAuth, requireAdmin, createSection);
router.put('/admin/:id', requireAuth, requireAdmin, updateSection);
router.patch('/admin/reorder', requireAuth, requireAdmin, reorderSections);
router.patch('/admin/:id/toggle', requireAuth, requireAdmin, toggleSection);
router.delete('/admin/:id', requireAuth, requireAdmin, deleteSection);

module.exports = router;
