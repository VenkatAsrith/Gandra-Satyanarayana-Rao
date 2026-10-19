require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const SiteSettings = require('../models/SiteSettings');
const ProfileContent = require('../models/ProfileContent');
const PublicWork = require('../models/PublicWork');
const PublicActivity = require('../models/PublicActivity');
const GalleryMedia = require('../models/GalleryMedia');
const ConstituencyInfo = require('../models/ConstituencyInfo');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sathenna_profile';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for content migration.');

    // 1. Seed Admin User if none exists
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const passwordHash = await AdminUser.hashPassword('Sathenna@Admin2026!');
      await AdminUser.create({
        name: 'Constituency Administrator',
        email: 'admin@sathenna.in',
        passwordHash,
        role: 'admin',
        isActive: true
      });
      console.log('[Seed] Created default administrator: admin@sathenna.in');
    }

    // 2. Seed SiteSettings
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      siteTitle: 'Gandra Satyanarayana Rao | Member of Legislative Assembly, Bhupalpalle',
      teluguTitle: 'గండ్ర సత్యనారాయణ రావు (సత్తెన్న)',
      tagline: 'Official Public Profile & Legislative Dossier',
      emblemUrl: '/images/party-symbol.png',
      partyAffiliation: 'Indian National Congress',
      constituencyName: 'Bhupalpalle',
      constituencyNo: 108,
      district: 'Jayashankar Bhupalpally',
      state: 'Telangana',
      legislativeTerm: '3rd Telangana Legislative Assembly (2023–2028)',
      officialPhone: '9849051228',
      officialEmail: 'gandra.satyanarayanarao@gmail.com',
      officeAddress: {
        line1: 'H.No: 3-12',
        village: 'Buddharam Village',
        mandal: 'Ghanapuram Mandal',
        district: 'Jayashankar Bhupalpally',
        state: 'Telangana',
        notes: 'Weekly Praja Darbar open public court for representations'
      },
      metaDescription: 'Official public profile documenting the public service, legislative work, and constituency engagement of Gandra Satyanarayana Rao (Sathenna), MLA for Bhupalpalle, Telangana.',
      verificationNotice: 'Documented strictly from verifiable public records, legislative filings, and regional press reporting.'
    });
    console.log('[Seed] SiteSettings seeded successfully.');

    // 3. Seed ProfileContent
    await ProfileContent.deleteMany({});
    await ProfileContent.create({
      fullName: 'Gandra Satyanarayana Rao',
      commonName: 'Sathenna',
      teluguName: 'గండ్ర సత్యనారాయణ రావు (సత్తెన్న)',
      birthYear: 1965,
      parentName: 'Late Sri Gandra Samma Rao',
      spouseName: 'Smt. Gandra Padma',
      nativeVillage: 'Buddharam Village, Ghanapuram Mandal',
      education: 'BA (Kakatiya University, Warangal, 1983) & ITI Civil Diploma',
      leadTitle: 'A lifetime dedicated to agriculture, grassroots democracy, and direct constituent representation.',
      biographySummary: 'Born in 1965 to agrarian elder Late Sri Gandra Samma Rao in Buddharam village, Ghanapuram mandal, Gandra Satyanarayana Rao (Sathenna) completed his Bachelor of Arts from Kakatiya University and an ITI Civil diploma. Over nearly four decades of dedicated public service—starting as Village Sarpanch in Buddharam, then ZPTC Member, and ultimately winning the Bhupalpalle Assembly seat in December 2023 with 123,116 votes and a historic 52,699-vote victory margin—he has stood as an unwavering champion for farmers\' canal waters, Singareni coal miners, and rural infrastructure.',
      heroPortraitUrl: '/images/hero/hero-portrait.png',
      electoralStats: {
        votesSecured: 123116,
        voteMargin: 52699,
        voteSharePercentage: 54.55,
        assemblyNo: 108,
        tenureYears: '2023–2028',
        verifiedSources: 'Election Commission of India / PRS Legislative Research'
      },
      timeline: [
        {
          yearOrPeriod: 'EARLY',
          role: 'Village Sarpanch',
          title: 'Sarpanch, Buddharam Village',
          description: 'Commenced public representation in native Buddharam village, Ghanapuram mandal, overseeing village administration, irrigation tanks, and rural civic matters.',
          citation: 'Regional Electoral Records & Political Biographies',
          displayOrder: 1
        },
        {
          yearOrPeriod: '1996',
          role: 'ZPTC Member',
          title: 'Elected ZPTC, Ghanapuram Mandal',
          description: 'Elected to the Zilla Parishad Territorial Constituency (ZPTC) representing Ghanapuram mandal under TDP, coordinating mandal development works and school facilities.',
          citation: 'TV9 Telugu Political Feature',
          displayOrder: 2
        },
        {
          yearOrPeriod: '2014 & 18',
          role: 'Assembly Candidate',
          title: 'Bhupalpalle Assembly Contests',
          description: 'Contested the Bhupalpalle Assembly constituency in 2014 and in 2018 under All India Forward Bloc (securing 53,982 votes), consolidating deep rural support across all major mandals.',
          citation: 'Election Commission of India / MyNeta',
          displayOrder: 3
        },
        {
          yearOrPeriod: '2021',
          role: 'Sep 30 · Congress',
          title: 'Induction into Indian National Congress',
          description: 'Formally joined the Indian National Congress on September 30, 2021, under the leadership of TPCC President A. Revanth Reddy, actively coordinating district party cadre and constituent outreach.',
          citation: 'The New Indian Express / The Hans India',
          displayOrder: 4
        },
        {
          yearOrPeriod: '2023',
          role: 'Elected MLA',
          title: 'Dec 3, 2023: Decisive Victory in 3rd Telangana Assembly',
          description: 'Elected to the Telangana Legislative Assembly representing Bhupalpalle constituency (108) with 123,116 votes (54.55% of the total poll), recording a winning margin of 52,699 votes. Currently serving 2023–2028 legislative term.',
          citation: 'Election Commission of India / PRS Legislative Research',
          accentColor: '#86EFAC',
          displayOrder: 5
        }
      ]
    });
    console.log('[Seed] ProfileContent seeded successfully.');

    // 4. Seed PublicWork
    await PublicWork.deleteMany({});
    await PublicWork.create([
      {
        title: 'Ghanapur Reservoir Crop Canals Modernization',
        slug: 'ghanapur-reservoir-crop-canals-modernization',
        summary: 'Announced sanction of ₹31 crore for the comprehensive modernization and lining of four major crop canals under the Ghanapur reservoir, securing dependable water distribution for 44,000 acres utilizing Devadula lift irrigation networks and Sriram Sagar Project (SRSP) allocations.',
        category: 'irrigation',
        categoryLabel: 'Irrigation Modernization',
        mandal: 'Ghanapur',
        amountValueCrores: 31,
        amountFormatted: '₹31 Crore',
        status: 'tenders_initiated',
        statusNote: 'Tenders initiated · 12-month completion timeframe',
        representativeAction: 'Announced sanction & reviewed DPR',
        mediaUrl: '/images/work/irrigation.jpg',
        sourceUrl: '',
        sourceLabel: 'The Hans India & Dailyhunt',
        isFeatured: true,
        isPublished: true,
        displayOrder: 1
      },
      {
        title: 'Kotanchu Sri Lakshmi Narasimha Swamy Temple Upgrade',
        slug: 'kotanchu-sri-lakshmi-narasimha-swamy-temple-upgrade',
        summary: 'Special development initiative securing ₹12.15 crore for temple conservation, pilgrim queue complexes, dining halls, and tourism amenities at Sri Lakshmi Narasimha Swamy Temple in Kotanchu, Regonda mandal.',
        category: 'heritage',
        categoryLabel: 'Heritage & Tourism',
        mandal: 'Regonda',
        amountValueCrores: 12.15,
        amountFormatted: '₹12.15 Crore',
        status: 'work_in_progress',
        statusNote: 'Construction progressing on ground',
        representativeAction: 'Facilitated sanction & reviewed temple works',
        mediaUrl: '/images/work/temple.jpg',
        sourceUrl: '',
        sourceLabel: 'The Hans India & V6 Velugu',
        isFeatured: true,
        isPublished: true,
        displayOrder: 2
      },
      {
        title: 'Indiramma Housing Scheme Monitoring',
        slug: 'indiramma-housing-monitoring',
        summary: 'Convened departmental review meetings directing officials to accelerate construction timelines and ensure transparent delivery of housing to eligible families across Jayashankar Bhupalpally.',
        category: 'housing',
        categoryLabel: 'Housing & Welfare',
        mandal: 'Bhupalpalle',
        amountValueCrores: null,
        amountFormatted: 'Government Sanction',
        status: 'work_in_progress',
        statusNote: 'Regular review & quality inspections',
        representativeAction: 'Directed officials & reviewed execution',
        mediaUrl: '/images/work/housing.jpg',
        sourceUrl: '',
        sourceLabel: 'Sakshi & Hans India',
        isFeatured: false,
        isPublished: true,
        displayOrder: 3
      },
      {
        title: 'Chityal Bus Station & BT Roads',
        slug: 'chityal-bus-station-and-bt-roads',
        summary: 'Laid foundation stone for ₹3.75 crore modern bus terminus in Chityal alongside District Collector, following ₹4.16 crore rural BT road projects linking agricultural markets.',
        category: 'transit',
        categoryLabel: 'Transit & Roads',
        mandal: 'Chityal',
        amountValueCrores: 3.75,
        amountFormatted: '₹3.75 Crore',
        status: 'work_in_progress',
        statusNote: 'Civil works under construction',
        representativeAction: 'Laid foundation stone',
        mediaUrl: '/images/work/landscape.jpg',
        sourceUrl: '',
        sourceLabel: 'Sakshi',
        isFeatured: false,
        isPublished: true,
        displayOrder: 4
      },
      {
        title: 'Three 33/11 KV Power Sub-stations',
        slug: 'three-33-11-kv-power-sub-stations',
        summary: 'Inaugurated three 33/11 KV power sub-stations (₹2 crore each, ₹6 crore total) with Deputy Chief Minister Mallu Bhatti Vikramarka, stabilizing agricultural and domestic feeder power across Manjunagar and Nawabupeta.',
        category: 'energy',
        categoryLabel: 'Energy & Agriculture',
        mandal: 'Manjunagar & Nawabupeta',
        amountValueCrores: 6,
        amountFormatted: '₹6 Crore Total',
        status: 'completed',
        statusNote: 'Commissioned and supplying power',
        representativeAction: 'Inaugurated with Deputy CM',
        mediaUrl: '/images/work/landscape.jpg',
        sourceUrl: '',
        sourceLabel: 'Andhra Prabha',
        isFeatured: false,
        isPublished: true,
        displayOrder: 5
      }
    ]);
    console.log('[Seed] PublicWork records seeded successfully.');

    // 5. Seed PublicActivity
    await PublicActivity.deleteMany({});
    await PublicActivity.create([
      {
        title: 'Advocacy for Singareni Coal Miners & Displaced Families',
        slug: 'advocacy-for-singareni-coal-miners-assembly',
        activityDate: new Date('2026-09-18'),
        location: 'Telangana Legislative Assembly',
        category: 'legislative',
        categoryLabel: 'Assembly Intervention',
        summary: 'During the Telangana Legislative Assembly session, Gandra Satyanarayana Rao forcefully raised the long-standing welfare concerns of Singareni Collieries workers, seeking comprehensive rehabilitation packages for land-displaced families, medical security for retired employees, and fair terms for contract laborers.',
        mediaUrl: '/images/events/public-address.png',
        sourceLabel: 'Official Assembly Record & Andhra Prabha',
        isHighlighted: true,
        isPublished: true,
        displayOrder: 1
      },
      {
        title: 'Konda Laxman Bapuji Memorial Commemoration',
        slug: 'konda-laxman-bapuji-memorial-commemoration',
        activityDate: new Date('2026-09-21'),
        location: 'Bhupalpally Urban',
        category: 'civic',
        categoryLabel: 'Memorial Address',
        summary: 'Participated as Chief Guest at the commemorative program paying tribute to freedom fighter and Telangana stalwart Acharya Konda Laxman Bapuji.',
        sourceLabel: 'District Information Office',
        isHighlighted: false,
        isPublished: true,
        displayOrder: 2
      },
      {
        title: 'Constituency Educators & Teachers Recognition',
        slug: 'educators-teachers-recognition',
        activityDate: new Date('2026-09-20'),
        location: 'Bhupalpally',
        category: 'civic',
        categoryLabel: 'Civic Recognition',
        summary: 'Addressed local school teachers and educational leaders on the indispensable role of primary and secondary schooling in rural transformation.',
        sourceLabel: 'Constituency Media Desk',
        isHighlighted: false,
        isPublished: true,
        displayOrder: 3
      },
      {
        title: 'Assembly Interventions on Crop Diversification & Cold Storage',
        slug: 'assembly-demands-crop-cold-storage',
        activityDate: new Date('2026-09-16'),
        location: 'Telangana Legislative Assembly',
        category: 'agriculture',
        categoryLabel: 'Legislative Question',
        summary: 'Advocated on the floor of the Assembly for cold storage facilities in Bhupalpalle to protect vegetable farmers from distress sales, while requesting government subsidies for oil palm cultivation.',
        sourceLabel: 'Assembly Hansard',
        isHighlighted: false,
        isPublished: true,
        displayOrder: 4
      },
      {
        title: 'Protection of Chalivagu Irrigation Reservoir',
        slug: 'chalivagu-reservoir-protection',
        activityDate: new Date('2026-08-07'),
        location: 'Chalivagu Project Site',
        category: 'infrastructure',
        categoryLabel: 'On-site Inspection',
        summary: 'Monitored water retention levels at Chalivagu project and warned against unauthorized water diversion to safeguard irrigation for farmers across local command areas.',
        sourceLabel: 'Namasthe Telangana & Sakshi',
        isHighlighted: false,
        isPublished: true,
        displayOrder: 5
      }
    ]);
    console.log('[Seed] PublicActivity records seeded successfully.');

    // 6. Seed GalleryMedia
    await GalleryMedia.deleteMany({});
    await GalleryMedia.create([
      {
        publicId: 'local_public-address',
        secureUrl: '/images/events/public-address.png',
        title: 'Constituency Mass Meeting Address with Chief Minister A. Revanth Reddy',
        caption: 'Addressing thousands of constituents alongside Chief Minister A. Revanth Reddy in Jayashankar Bhupalpally',
        altText: 'Gandra Satyanarayana Rao addressing the public alongside Chief Minister A. Revanth Reddy',
        category: 'events',
        categoryLabel: 'Public Events · Stage Address',
        credit: 'Official Public Record',
        isFeatured: true,
        isPublished: true,
        displayOrder: 1
      },
      {
        publicId: 'local_portrait-namaste',
        secureUrl: '/images/about/portrait-namaste.png',
        title: 'Weekly "Praja Darbar" Greeting Portrait',
        caption: 'Direct interaction with constituents at the MLA Camp Office',
        altText: 'Gandra Satyanarayana Rao greeting citizens with folded hands',
        category: 'portraits',
        categoryLabel: 'Official Portraits · Grassroots',
        credit: 'Camp Office Media',
        isFeatured: true,
        isPublished: true,
        displayOrder: 2
      },
      {
        publicId: 'local_profile-formal',
        secureUrl: '/images/about/profile-formal.png',
        title: 'Formal Legislative Profile & Studio Portrait',
        caption: 'Official legislative dossier profile',
        altText: 'Official formal portrait of Gandra Satyanarayana Rao',
        category: 'portraits',
        categoryLabel: 'Official Portraits · Leadership',
        credit: 'Legislative Directory',
        isFeatured: true,
        isPublished: true,
        displayOrder: 3
      },
      {
        publicId: 'local_family-revanth',
        secureUrl: '/images/about/family-revanth.png',
        title: 'Smt. Gandra Padma & Sathenna with CM Revanth Reddy',
        caption: 'Coordination with State Executive on key constituency priorities',
        altText: 'Gandra Satyanarayana Rao and Smt. Gandra Padma meeting Chief Minister Revanth Reddy',
        category: 'constituency',
        categoryLabel: 'Governance · State Coordination',
        credit: 'Chief Minister Office Archive',
        isFeatured: true,
        isPublished: true,
        displayOrder: 4
      },
      {
        publicId: 'local_hero-portrait',
        secureUrl: '/images/hero/hero-portrait.png',
        title: 'Elected MLA for Bhupalpalle (108)',
        caption: 'Mandate portrait following December 2023 victory',
        altText: 'Gandra Satyanarayana Rao with Indian National Congress tricolor scarf',
        category: 'portraits',
        categoryLabel: 'Official Portraits · Assembly Mandate',
        credit: 'Official Archive',
        isFeatured: true,
        isPublished: true,
        displayOrder: 5
      },
      {
        publicId: 'local_irrigation',
        secureUrl: '/images/work/irrigation.jpg',
        title: 'Ghanapur Reservoir Canal Irrigation Works',
        caption: 'Modernization works along the 4 major crop canals',
        altText: 'Ghanapur canal network and lush paddy fields in Bhupalpally',
        category: 'work',
        categoryLabel: 'Public Works · Irrigation',
        credit: 'Irrigation Department',
        isFeatured: false,
        isPublished: true,
        displayOrder: 6
      },
      {
        publicId: 'local_temple',
        secureUrl: '/images/work/temple.jpg',
        title: 'Kotanchu Sri Lakshmi Narasimha Swamy Temple',
        caption: 'Heritage conservation and pilgrim amenities in Kotanchu, Regonda',
        altText: 'Ancient stone temple architecture in Kotanchu',
        category: 'work',
        categoryLabel: 'Public Works · Heritage',
        credit: 'Endowments Department',
        isFeatured: false,
        isPublished: true,
        displayOrder: 7
      },
      {
        publicId: 'local_housing',
        secureUrl: '/images/work/housing.jpg',
        title: 'Indiramma Housing Beneficiary Complexes',
        caption: 'Residential units for rural beneficiary families',
        altText: 'Indiramma housing residential construction units',
        category: 'work',
        categoryLabel: 'Public Works · Housing',
        credit: 'Housing Corporation',
        isFeatured: false,
        isPublished: true,
        displayOrder: 8
      }
    ]);
    console.log('[Seed] GalleryMedia seeded successfully.');

    // 7. Seed ConstituencyInfo
    await ConstituencyInfo.deleteMany({});
    await ConstituencyInfo.create({
      assemblyNo: 108,
      constituencyName: 'Bhupalpalle',
      districtName: 'Jayashankar Bhupalpally',
      totalAreaSqKm: 2293,
      ruralPercentage: 92.2,
      literacyRatePercentage: 60.32,
      totalPopulation2011: 416763,
      revenueVillagesText: '200+',
      mandals: [
        { name: 'Bhupalpalle', description: 'District Headquarter, Singareni Collieries coal belt & thermal station', isMajor: true },
        { name: 'Ghanpur (Mulug)', description: 'Agrarian heartland & Ghanapur reservoir command ayacut', isMajor: true },
        { name: 'Regonda', description: 'Agricultural mandal & Kotanchu temple pilgrimage site', isMajor: true },
        { name: 'Shayampet', description: 'Rural agricultural economy & village education institutions', isMajor: true },
        { name: 'Chityal', description: 'Transit junction, modern bus terminus & commercial center', isMajor: true },
        { name: 'Mogullapalle', description: 'Farming communities and tank irrigation command areas', isMajor: true }
      ],
      overviewText: 'Jayashankar Bhupalpally district is characterized by agricultural agrarian landscapes, Singareni Collieries coal deposits, and thermal power generation. Encompassing key mandals including Bhupalpalle, Ghanpur (Mulug), Regonda, Shayampet, Chityal, and Mogullapalle, the area demands sustained policy focus on canal water tail-end delivery, rural road connectivity, tribal hamlets welfare, and mining worker safety.',
      landscapeImageUrl: '/images/work/landscape.jpg',
      verifiedSources: 'District Census Handbook 2011, Government of Telangana Gazette'
    });
    console.log('[Seed] ConstituencyInfo seeded successfully.');

    console.log('=======================================================');
    console.log('🎉 CONTENT SEEDING COMPLETE! ALL VERIFIED DATA PERSISTED.');
    console.log('=======================================================');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();
