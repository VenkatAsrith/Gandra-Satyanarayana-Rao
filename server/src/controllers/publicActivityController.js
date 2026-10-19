const PublicActivity = require('../models/PublicActivity');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// GET /api/v1/activities (Public)
const getPublicActivities = async (req, res, next) => {
  try {
    const { category, search, limit = 50, page = 1 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await PublicActivity.countDocuments(query);
    const activities = await PublicActivity.find(query)
      .sort({ activityDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      data: activities,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/activities (Admin)
const adminGetActivities = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (category && category !== 'all') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await PublicActivity.countDocuments(query);
    const activities = await PublicActivity.find(query)
      .select('+internalNotes')
      .sort({ activityDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      data: activities,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/admin/activities (Admin)
const adminCreateActivity = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.slug && payload.title) {
      payload.slug = `${slugify(payload.title)}-${Date.now().toString().slice(-4)}`;
    }

    const activity = await PublicActivity.create(payload);
    return res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/admin/activities/:id (Admin)
const adminUpdateActivity = async (req, res, next) => {
  try {
    const activity = await PublicActivity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('+internalNotes');

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/admin/activities/:id (Admin)
const adminDeleteActivity = async (req, res, next) => {
  try {
    const activity = await PublicActivity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicActivities,
  adminGetActivities,
  adminCreateActivity,
  adminUpdateActivity,
  adminDeleteActivity
};
