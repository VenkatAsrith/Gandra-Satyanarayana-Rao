const ProfileContent = require('../models/ProfileContent');

// GET /api/v1/profile (Public)
const getProfile = async (req, res, next) => {
  try {
    let profile = await ProfileContent.findOne();
    if (!profile) {
      profile = await ProfileContent.create({});
    }
    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/admin/profile (Admin Protected)
const updateProfile = async (req, res, next) => {
  try {
    let profile = await ProfileContent.findOne();
    if (!profile) {
      profile = new ProfileContent(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    return res.status(200).json({
      success: true,
      message: 'Profile content updated successfully',
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};
