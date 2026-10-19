const GalleryMedia = require('../models/GalleryMedia');
const { uploadMedia, deleteMedia } = require('../services/cloudinaryService');

// GET /api/v1/gallery (Public)
const getGalleryMedia = async (req, res, next) => {
  try {
    const { category, limit = 100, page = 1 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await GalleryMedia.countDocuments(query);
    const items = await GalleryMedia.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      data: items,
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

// GET /api/v1/admin/gallery (Admin)
const adminGetGallery = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 100 } = req.query;
    const query = {};

    if (category && category !== 'all') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { caption: { $regex: search, $options: 'i' } },
        { altText: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await GalleryMedia.countDocuments(query);
    const items = await GalleryMedia.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      data: items,
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

// POST /api/v1/admin/gallery/upload (Admin)
const adminUploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded. Please select an image.'
      });
    }

    const {
      title,
      caption = '',
      altText,
      category = 'general',
      categoryLabel = 'Media',
      credit = 'Official Public Record',
      isPublished = true,
      displayOrder = 0
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Media title is required.'
      });
    }

    // Upload to Cloudinary / storage
    const uploadResult = await uploadMedia(req.file.buffer, req.file.originalname, 'sathenna_gallery');

    const media = await GalleryMedia.create({
      publicId: uploadResult.publicId,
      secureUrl: uploadResult.secureUrl,
      title,
      caption,
      altText: altText || title,
      category,
      categoryLabel,
      credit,
      width: uploadResult.width || 0,
      height: uploadResult.height || 0,
      format: uploadResult.format || 'jpg',
      sizeBytes: uploadResult.bytes || req.file.size,
      isPublished: String(isPublished) === 'true' || isPublished === true,
      displayOrder: parseInt(displayOrder) || 0
    });

    return res.status(201).json({
      success: true,
      message: 'Media uploaded and saved to gallery successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/admin/gallery/:id (Admin)
const adminUpdateMedia = async (req, res, next) => {
  try {
    const media = await GalleryMedia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Media record updated successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/admin/gallery/:id (Admin)
const adminDeleteMedia = async (req, res, next) => {
  try {
    const media = await GalleryMedia.findById(req.params.id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media record not found'
      });
    }

    // Delete from Cloudinary / storage
    if (media.publicId) {
      await deleteMedia(media.publicId);
    }

    await GalleryMedia.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Media asset deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGalleryMedia,
  adminGetGallery,
  adminUploadMedia,
  adminUpdateMedia,
  adminDeleteMedia
};
