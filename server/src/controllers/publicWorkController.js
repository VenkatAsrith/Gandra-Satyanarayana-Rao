const PublicWork = require('../models/PublicWork');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// GET /api/v1/projects (Public)
const getPublicWorks = async (req, res, next) => {
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
        { mandal: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await PublicWork.countDocuments(query);
    const works = await PublicWork.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      data: works,
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

// GET /api/v1/projects/:slug (Public)
const getPublicWorkBySlug = async (req, res, next) => {
  try {
    const work = await PublicWork.findOne({ slug: req.params.slug, isPublished: true });
    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Public work record not found'
      });
    }
    return res.status(200).json({
      success: true,
      data: work
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/projects (Admin)
const adminGetWorks = async (req, res, next) => {
  try {
    const { category, search, status, page = 1, limit = 50 } = req.query;
    const query = {};

    if (category && category !== 'all') query.category = category;
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await PublicWork.countDocuments(query);
    const works = await PublicWork.find(query)
      .select('+internalNotes')
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      data: works,
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

// POST /api/v1/admin/projects (Admin)
const adminCreateWork = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (!payload.slug && payload.title) {
      payload.slug = `${slugify(payload.title)}-${Date.now().toString().slice(-4)}`;
    }

    const work = await PublicWork.create(payload);
    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: work
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/admin/projects/:id (Admin)
const adminUpdateWork = async (req, res, next) => {
  try {
    const work = await PublicWork.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('+internalNotes');

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Project record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: work
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/admin/projects/:id (Admin)
const adminDeleteWork = async (req, res, next) => {
  try {
    const work = await PublicWork.findByIdAndDelete(req.params.id);
    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Project record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicWorks,
  getPublicWorkBySlug,
  adminGetWorks,
  adminCreateWork,
  adminUpdateWork,
  adminDeleteWork
};
