const mongoose = require('mongoose');

const publicWorkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true
    },
    detailedDescription: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      enum: ['irrigation', 'heritage', 'housing', 'transit', 'energy', 'welfare', 'general'],
      default: 'general'
    },
    categoryLabel: {
      type: String,
      default: 'Development'
    },
    mandal: {
      type: String,
      default: 'Bhupalpalle',
      trim: true
    },
    amountValueCrores: {
      type: Number,
      default: null
    },
    amountFormatted: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      enum: ['sanctioned', 'tenders_initiated', 'work_in_progress', 'completed', 'status_not_confirmed'],
      default: 'status_not_confirmed'
    },
    statusNote: {
      type: String,
      default: ''
    },
    representativeAction: {
      type: String,
      default: 'Documented Initiative'
    },
    mediaUrl: {
      type: String,
      default: '/images/work/irrigation.jpg'
    },
    sourceUrl: {
      type: String,
      default: ''
    },
    sourceLabel: {
      type: String,
      default: 'Verified Regional Press'
    },
    lastVerifiedDate: {
      type: Date,
      default: Date.now
    },
    internalNotes: {
      type: String,
      default: '',
      select: false // Admin only, never exposed to public API
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Indexes
publicWorkSchema.index({ isPublished: 1, displayOrder: 1 });

module.exports = mongoose.model('PublicWork', publicWorkSchema);
