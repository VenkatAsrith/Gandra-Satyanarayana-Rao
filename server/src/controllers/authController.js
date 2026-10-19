const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'sathenna_dev_jwt_secret_key_928374928374928374',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const setTokenCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('sathenna_token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

// POST /api/v1/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    // Find user and explicitly select passwordHash
    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');

    // Generic response to avoid enumeration
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email credentials or account inactive.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email credentials or account inactive.'
      });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user);
    setTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLoginAt: user.lastLoginAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/logout
const logout = async (req, res) => {
  res.clearCookie('sathenna_token');
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// GET /api/v1/auth/me
const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

// POST /api/v1/auth/setup-admin
const setupAdmin = async (req, res, next) => {
  try {
    const { name, email, password, setupSecret } = req.body;

    const expectedSecret = process.env.ADMIN_SETUP_SECRET || 'bootstrap_admin_secret_key_change_in_production';

    // Verify secret or allow only if 0 admins exist in database
    const adminCount = await AdminUser.countDocuments();
    if (adminCount > 0 && setupSecret !== expectedSecret) {
      return res.status(403).json({
        success: false,
        message: 'Admin setup forbidden. Initial administrator already exists or setup secret is invalid.'
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required to create an administrator.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    const passwordHash = await AdminUser.hashPassword(password);

    const newAdmin = await AdminUser.create({
      name,
      email: email.toLowerCase().trim(),
      passwordHash,
      role: 'admin',
      isActive: true
    });

    const token = generateToken(newAdmin);
    setTokenCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'Administrator successfully initialized',
      user: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  getMe,
  setupAdmin
};
