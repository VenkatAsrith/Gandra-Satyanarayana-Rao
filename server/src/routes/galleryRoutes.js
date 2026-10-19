const express = require('express');
const router = express.Router();
const {
  getGalleryMedia,
  adminGetGallery,
  adminUploadMedia,
  adminUpdateMedia,
  adminDeleteMedia
} = require('../controllers/galleryController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public
router.get('/', getGalleryMedia);

// Admin
router.get('/admin/all', requireAuth, requireAdmin, adminGetGallery);
router.post('/admin/upload', requireAuth, requireAdmin, upload.single('media'), adminUploadMedia);
router.put('/admin/:id', requireAuth, requireAdmin, adminUpdateMedia);
router.delete('/admin/:id', requireAuth, requireAdmin, adminDeleteMedia);

module.exports = router;
