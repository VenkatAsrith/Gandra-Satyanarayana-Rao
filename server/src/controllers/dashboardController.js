const PublicWork = require('../models/PublicWork');
const PublicActivity = require('../models/PublicActivity');
const GalleryMedia = require('../models/GalleryMedia');
const ContactSubmission = require('../models/ContactSubmission');
const { isCloudinaryConfigured } = require('../services/cloudinaryService');

// GET /api/v1/admin/dashboard (Admin)
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      publishedProjectsCount,
      draftProjectsCount,
      publishedActivitiesCount,
      totalGalleryMediaCount,
      newSubmissionsCount,
      totalSubmissionsCount,
      recentSubmissions,
      recentProjects
    ] = await Promise.all([
      PublicWork.countDocuments({ isPublished: true }),
      PublicWork.countDocuments({ isPublished: false }),
      PublicActivity.countDocuments({ isPublished: true }),
      GalleryMedia.countDocuments(),
      ContactSubmission.countDocuments({ status: 'new' }),
      ContactSubmission.countDocuments(),
      ContactSubmission.find().sort({ createdAt: -1 }).limit(5),
      PublicWork.find().sort({ updatedAt: -1 }).limit(5)
    ]);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          publishedProjectsCount,
          draftProjectsCount,
          publishedActivitiesCount,
          totalGalleryMediaCount,
          newSubmissionsCount,
          totalSubmissionsCount,
          isCloudinaryConnected: isCloudinaryConfigured()
        },
        recentSubmissions,
        recentProjects
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
