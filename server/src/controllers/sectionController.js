const PageSection = require('../models/PageSection');

/**
 * Public: Get published and enabled sections for a page (default: home)
 * GET /api/v1/sections?page=home
 */
exports.getPublishedSections = async (req, res, next) => {
  try {
    const page = req.query.page || 'home';
    const sections = await PageSection.find({
      page,
      isEnabled: true,
      status: 'published'
    }).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all sections (including drafts and disabled)
 * GET /api/v1/sections/admin?page=home
 */
exports.getAllSections = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.page) {
      filter.page = req.query.page;
    }
    const sections = await PageSection.find(filter).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get section by ID
 * GET /api/v1/sections/admin/:id
 */
exports.getSectionById = async (req, res, next) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    res.status(200).json({
      success: true,
      data: section
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Create a new section
 * POST /api/v1/sections
 */
exports.createSection = async (req, res, next) => {
  try {
    const { key, title, type, layout, subtitle, badge, content, mediaUrl, mediaAlt, ctaText, ctaLink, order, isEnabled, status, page, translations } = req.body;

    if (!key || !title || !type) {
      return res.status(400).json({
        success: false,
        message: 'Key, Title, and Section Type are required'
      });
    }

    // Check key uniqueness
    const existing = await PageSection.findOne({ key: key.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A section with key '${key}' already exists. Please choose a unique key.`
      });
    }

    // Calculate order if not provided
    let sectionOrder = order;
    if (sectionOrder === undefined || sectionOrder === null) {
      const highest = await PageSection.findOne({ page: page || 'home' }).sort({ order: -1 });
      sectionOrder = highest ? (highest.order || 0) + 1 : 1;
    }

    const section = await PageSection.create({
      key: key.toLowerCase().trim(),
      page: page || 'home',
      type,
      layout: layout || 'split_media',
      title: title.trim(),
      subtitle: subtitle || '',
      badge: badge || '',
      content: content || '',
      mediaUrl: mediaUrl || '',
      mediaAlt: mediaAlt || '',
      ctaText: ctaText || '',
      ctaLink: ctaLink || '',
      order: sectionOrder,
      isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
      status: status || 'published',
      translations: translations || { te: {} },
      createdBy: req.user ? req.user.id : undefined,
      updatedBy: req.user ? req.user.id : undefined
    });

    res.status(201).json({
      success: true,
      message: 'Dynamic section created successfully',
      data: section
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update an existing section
 * PUT /api/v1/sections/:id
 */
exports.updateSection = async (req, res, next) => {
  try {
    let section = await PageSection.findById(req.params.id);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    // Check if key is being changed and is taken
    if (req.body.key && req.body.key.toLowerCase().trim() !== section.key) {
      const keyExists = await PageSection.findOne({
        key: req.body.key.toLowerCase().trim(),
        _id: { $ne: section._id }
      });
      if (keyExists) {
        return res.status(409).json({
          success: false,
          message: `Section key '${req.body.key}' is already in use.`
        });
      }
      section.key = req.body.key.toLowerCase().trim();
    }

    const updateFields = [
      'page',
      'type',
      'title',
      'subtitle',
      'badge',
      'layout',
      'content',
      'mediaUrl',
      'mediaAlt',
      'ctaText',
      'ctaLink',
      'order',
      'isEnabled',
      'status',
      'translations'
    ];

    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        section[field] = req.body[field];
      }
    });

    if (req.user) {
      section.updatedBy = req.user.id;
    }

    await section.save();

    res.status(200).json({
      success: true,
      message: 'Section updated successfully',
      data: section
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Reorder sections
 * PATCH /api/v1/sections/reorder
 * Body: { items: [ { id: '...', order: 1 }, { id: '...', order: 2 } ] }
 */
exports.reorderSections = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required for reordering'
      });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } }
      }
    }));

    if (bulkOps.length > 0) {
      await PageSection.bulkWrite(bulkOps);
    }

    res.status(200).json({
      success: true,
      message: 'Sections reordered successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Toggle enable/disable
 * PATCH /api/v1/sections/:id/toggle
 */
exports.toggleSection = async (req, res, next) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    section.isEnabled = !section.isEnabled;
    if (req.user) {
      section.updatedBy = req.user.id;
    }
    await section.save();

    res.status(200).json({
      success: true,
      message: `Section ${section.isEnabled ? 'enabled' : 'disabled'} successfully`,
      data: section
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete section
 * DELETE /api/v1/sections/:id
 */
exports.deleteSection = async (req, res, next) => {
  try {
    const section = await PageSection.findById(req.params.id);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    await PageSection.deleteOne({ _id: section._id });

    res.status(200).json({
      success: true,
      message: 'Section deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
