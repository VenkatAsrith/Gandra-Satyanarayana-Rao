const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      default: 'Gandra Satyanarayana Rao | Member of Legislative Assembly, Bhupalpalle',
      trim: true
    },
    teluguTitle: {
      type: String,
      default: 'గండ్ర సత్యనారాయణ రావు (సత్తెన్న)',
      trim: true
    },
    tagline: {
      type: String,
      default: 'Official Public Profile & Legislative Dossier',
      trim: true
    },
    emblemUrl: {
      type: String,
      default: '/images/party-symbol.png'
    },
    partyAffiliation: {
      type: String,
      default: 'Indian National Congress',
      trim: true
    },
    constituencyName: {
      type: String,
      default: 'Bhupalpalle',
      trim: true
    },
    constituencyNo: {
      type: Number,
      default: 108
    },
    district: {
      type: String,
      default: 'Jayashankar Bhupalpally',
      trim: true
    },
    state: {
      type: String,
      default: 'Telangana',
      trim: true
    },
    legislativeTerm: {
      type: String,
      default: '3rd Telangana Legislative Assembly (2023–2028)',
      trim: true
    },
    officialPhone: {
      type: String,
      default: '9849051228',
      trim: true
    },
    officialEmail: {
      type: String,
      default: 'gandra.satyanarayanarao@gmail.com',
      trim: true
    },
    officeAddress: {
      line1: { type: String, default: 'H.No: 3-12' },
      village: { type: String, default: 'Buddharam Village' },
      mandal: { type: String, default: 'Ghanapuram Mandal' },
      district: { type: String, default: 'Jayashankar Bhupalpally' },
      state: { type: String, default: 'Telangana' },
      notes: { type: String, default: 'Weekly Praja Darbar open public court for representations' }
    },
    metaDescription: {
      type: String,
      default: 'Official public profile documenting the public service, legislative work, and constituency engagement of Gandra Satyanarayana Rao (Sathenna), MLA for Bhupalpalle, Telangana.'
    },
    verificationNotice: {
      type: String,
      default: 'Documented strictly from verifiable public records, legislative filings, and regional press reporting.'
    },
    socialLinks: {
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
