const mongoose = require('mongoose');

const mandalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  isMajor: { type: Boolean, default: true }
});

const constituencyInfoSchema = new mongoose.Schema(
  {
    assemblyNo: {
      type: Number,
      default: 108
    },
    constituencyName: {
      type: String,
      default: 'Bhupalpalle',
      trim: true
    },
    districtName: {
      type: String,
      default: 'Jayashankar Bhupalpally',
      trim: true
    },
    totalAreaSqKm: {
      type: Number,
      default: 2293
    },
    ruralPercentage: {
      type: Number,
      default: 92.2
    },
    literacyRatePercentage: {
      type: Number,
      default: 60.32
    },
    totalPopulation2011: {
      type: Number,
      default: 416763
    },
    revenueVillagesText: {
      type: String,
      default: '200+'
    },
    mandals: [mandalSchema],
    overviewText: {
      type: String,
      default: 'Jayashankar Bhupalpally district is characterized by agricultural agrarian landscapes, Singareni Collieries coal deposits, and thermal power generation. Encompassing key mandals including Bhupalpalle, Ghanpur (Mulug), Regonda, Shayampet, Chityal, and Mogullapalle, the area demands sustained policy focus on canal water tail-end delivery, rural road connectivity, tribal hamlets welfare, and mining worker safety.'
    },
    landscapeImageUrl: {
      type: String,
      default: '/images/work/landscape.jpg'
    },
    verifiedSources: {
      type: String,
      default: 'District Census Handbook 2011, Government of Telangana Gazette'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ConstituencyInfo', constituencyInfoSchema);
