const mongoose = require('mongoose');

const publicActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Activity title is required'],
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
    activityDate: {
      type: Date,
      required: [true, 'Activity date is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['legislative', 'agriculture', 'welfare', 'infrastructure', 'civic', 'general'],
      default: 'civic'
    },
    categoryLabel: {
      type: String,
      default: 'Civic Engagement'
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true
    },
    detailedContent: {
      type: String,
      default: ''
    },
    mediaUrl: {
      type: String,
      default: ''
    },
    sourceUrl: {
      type: String,
      default: ''
    },
    sourceLabel: {
      type: String,
      default: 'Official Assembly Record'
    },
    isHighlighted: {
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
    },
    translations: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    internalNotes: {
      type: String,
      default: '',
      select: false // Admin only
    }
  },
  {
    timestamps: true
  }
);

publicActivitySchema.index({ isPublished: 1, activityDate: -1 });

module.exports = mongoose.model('PublicActivity', publicActivitySchema);
