const mongoose = require('mongoose');

const PageSectionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, 'Section key/slug identifier is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    page: {
      type: String,
      default: 'home',
      trim: true,
      index: true
    },
    type: {
      type: String,
      required: [true, 'Section type is required'],
      enum: [
        'hero',
        'feature',
        'statistics',
        'timeline',
        'projects_grid',
        'activities_list',
        'gallery_grid',
        'announcements',
        'faq',
        'custom_rich_text',
        'quote_callout'
      ],
      default: 'feature'
    },
    title: {
      type: String,
      required: [true, 'Section title is required'],
      trim: true
    },
    subtitle: {
      type: String,
      trim: true,
      default: ''
    },
    badge: {
      type: String,
      trim: true,
      default: ''
    },
    layout: {
      type: String,
      enum: [
        'full_width',
        'two_column',
        'three_card_grid',
        'four_compact',
        'split_media',
        'banner'
      ],
      default: 'split_media'
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: ''
    },
    mediaUrl: {
      type: String,
      trim: true,
      default: ''
    },
    mediaAlt: {
      type: String,
      trim: true,
      default: ''
    },
    ctaText: {
      type: String,
      trim: true,
      default: ''
    },
    ctaLink: {
      type: String,
      trim: true,
      default: ''
    },
    order: {
      type: Number,
      default: 0,
      index: true
    },
    isEnabled: {
      type: Boolean,
      default: true,
      index: true
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true
    },
    translations: {
      te: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        badge: { type: String, default: '' },
        content: { type: mongoose.Schema.Types.Mixed, default: '' },
        ctaText: { type: String, default: '' },
        mediaAlt: { type: String, default: '' }
      }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser'
    }
  },
  {
    timestamps: true
  }
);

// Compound index for querying published sections in order
PageSectionSchema.index({ page: 1, isEnabled: 1, status: 1, order: 1 });

module.exports = mongoose.model('PageSection', PageSectionSchema);
