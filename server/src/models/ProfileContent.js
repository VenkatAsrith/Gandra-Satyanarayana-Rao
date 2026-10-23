const mongoose = require('mongoose');

const timelineItemSchema = new mongoose.Schema({
  yearOrPeriod: { type: String, required: true },
  role: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  citation: { type: String, default: '' },
  accentColor: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  translations: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

const profileContentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: 'Gandra Satyanarayana Rao',
      trim: true
    },
    commonName: {
      type: String,
      default: 'Sathenna',
      trim: true
    },
    teluguName: {
      type: String,
      default: 'గండ్ర సత్యనారాయణ రావు (సత్తెన్న)',
      trim: true
    },
    birthYear: {
      type: Number,
      default: 1965
    },
    parentName: {
      type: String,
      default: 'Late Sri Gandra Samma Rao',
      trim: true
    },
    spouseName: {
      type: String,
      default: 'Smt. Gandra Padma',
      trim: true
    },
    nativeVillage: {
      type: String,
      default: 'Buddharam Village, Ghanapuram Mandal',
      trim: true
    },
    education: {
      type: String,
      default: 'BA (Kakatiya University, Warangal, 1983) & ITI Civil Diploma'
    },
    leadTitle: {
      type: String,
      default: 'A lifetime dedicated to agriculture, grassroots democracy, and direct constituent representation.'
    },
    biographySummary: {
      type: String,
      default: 'Born in 1965 to agrarian elder Late Sri Gandra Samma Rao in Buddharam village, Ghanapuram mandal, Gandra Satyanarayana Rao (Sathenna) completed his Bachelor of Arts from Kakatiya University and an ITI Civil diploma. Over nearly four decades of dedicated public service—starting as Village Sarpanch in Buddharam, then ZPTC Member, and ultimately winning the Bhupalpalle Assembly seat in December 2023 with 123,116 votes and a historic 52,699-vote victory margin—he has stood as an unwavering champion for farmers\' canal waters, Singareni coal miners, and rural infrastructure.'
    },
    biographyExtended: {
      type: String,
      default: 'Sathenna\'s public life began at the fundamental unit of Indian democracy: the gram panchayat. Serving as Buddharam\'s Sarpanch, he oversaw tank maintenance, community roads, and agricultural credit accessibility. His technical qualification as a civil draughtsman equipped him with direct literacy in engineering blueprints, canal gradient flows, and irrigation bund stability. In 1996, he was elected as ZPTC member representing Ghanapuram mandal. In the 2023 Telangana Legislative Assembly elections, contesting as the Indian National Congress candidate, he secured a decisive mandate with 54.55% of all valid votes.'
    },
    heroPortraitUrl: {
      type: String,
      default: '/images/hero/hero-portrait.png'
    },
    electoralStats: {
      votesSecured: { type: Number, default: 123116 },
      voteMargin: { type: Number, default: 52699 },
      voteSharePercentage: { type: Number, default: 54.55 },
      assemblyNo: { type: Number, default: 108 },
      tenureYears: { type: String, default: '2023–2028' },
      verifiedSources: { type: String, default: 'Election Commission of India / PRS Legislative Research' }
    },
    timeline: [timelineItemSchema],
    translations: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ProfileContent', profileContentSchema);
