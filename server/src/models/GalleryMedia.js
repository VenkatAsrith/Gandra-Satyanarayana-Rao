const mongoose = require('mongoose');

const galleryMediaSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: true,
      trim: true
    },
    secureUrl: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    caption: {
      type: String,
      default: '',
      trim: true
    },
    altText: {
      type: String,
      required: [true, 'Alt text is required for accessibility'],
      trim: true
    },
    category: {
      type: String,
      enum: ['portraits', 'events', 'constituency', 'work', 'general'],
      default: 'general'
    },
    categoryLabel: {
      type: String,
      default: 'Media'
    },
    eventDate: {
      type: Date,
      default: null
    },
    credit: {
      type: String,
      default: 'Official Public Record'
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: 'jpg'
    },
    sizeBytes: {
      type: Number,
      default: 0
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
    },
    translations: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

galleryMediaSchema.index({ isPublished: 1, category: 1, displayOrder: 1 });

module.exports = mongoose.model('GalleryMedia', galleryMediaSchema);
