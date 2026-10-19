const ContactSubmission = require('../models/ContactSubmission');

// POST /api/v1/contact (Public with rate limiter)
const submitRepresentation = async (req, res, next) => {
  try {
    const { name, phone, email, mandal, village, representationType, subject, message } = req.body;

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, contact phone number, subject, and representation details are required.'
      });
    }

    // Basic phone format validation
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit telephone number.'
      });
    }

    const submission = await ContactSubmission.create({
      name: name.trim(),
      phone: cleanPhone,
      email: (email || '').toLowerCase().trim(),
      mandal: mandal || 'Bhupalpalle',
      village: (village || '').trim(),
      representationType: representationType || 'grievance',
      subject: subject.trim(),
      message: message.trim(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Your representation has been received and logged at the MLA Camp Office. It will be reviewed by the constituent services desk.',
      data: {
        id: submission._id,
        createdAt: submission.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/contact-submissions (Admin)
const adminGetSubmissions = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { mandal: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ContactSubmission.countDocuments(query);
    const submissions = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const unreadCount = await ContactSubmission.countDocuments({ isRead: false });

    return res.status(200).json({
      success: true,
      data: submissions,
      unreadCount,
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

// PUT /api/v1/admin/contact-submissions/:id (Admin)
const adminUpdateSubmission = async (req, res, next) => {
  try {
    const { status, adminNotes, isRead } = req.body;
    const updateData = {};

    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (isRead !== undefined) updateData.isRead = isRead;

    const submission = await ContactSubmission.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Submission status updated',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/admin/contact-submissions/:id (Admin)
const adminDeleteSubmission = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitRepresentation,
  adminGetSubmissions,
  adminUpdateSubmission,
  adminDeleteSubmission
};
