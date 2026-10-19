const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Your name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
      maxlength: [15, 'Phone number cannot exceed 15 digits']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    mandal: {
      type: String,
      default: 'Bhupalpalle',
      trim: true
    },
    village: {
      type: String,
      default: '',
      trim: true
    },
    representationType: {
      type: String,
      enum: ['grievance', 'development_proposal', 'appointment_request', 'general_inquiry'],
      default: 'grievance'
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [150, 'Subject cannot exceed 150 characters']
    },
    message: {
      type: String,
      required: [true, 'Representation details are required'],
      trim: true,
      maxlength: [3000, 'Message cannot exceed 3000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'under_review', 'action_taken', 'resolved', 'archived'],
      default: 'new'
    },
    adminNotes: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    },
    userAgent: {
      type: String,
      default: ''
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

contactSubmissionSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);
