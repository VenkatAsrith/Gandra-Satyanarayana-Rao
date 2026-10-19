const express = require('express');
const router = express.Router();
const { login, logout, getMe, setupAdmin } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', requireAuth, getMe);
router.post('/setup-admin', setupAdmin);

module.exports = router;
