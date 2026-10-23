const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config({ path: path.join(__dirname, '../../server/.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const SiteSettings = require('../models/SiteSettings');
const ProfileContent = require('../models/ProfileContent');
const PublicWork = require('../models/PublicWork');
const PublicActivity = require('../models/PublicActivity');
const GalleryMedia = require('../models/GalleryMedia');
const ConstituencyInfo = require('../models/ConstituencyInfo');
const PageSection = require('../models/PageSection');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sathenna_profile';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for content migration.');

    // 1. Seed or Update Admin User
    const existingAdmin = await AdminUser.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
      const passwordHash = await AdminUser.hashPassword('admin');
      await AdminUser.create({
        name: 'Constituency Administrator',
        email: 'admin@gmail.com',
        passwordHash,
        role: 'admin',
        isActive: true
      });
      console.log('[Seed] Created default administrator: admin@gmail.com (password: admin)');
    } else {
      existingAdmin.passwordHash = await AdminUser.hashPassword('admin');
      existingAdmin.isActive = true;
      await existingAdmin.save();
      console.log('[Seed] Updated administrator credentials: admin@gmail.com (password: admin)');
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
      biographyExtended: 'Sathenna\'s public life began at the fundamental unit of Indian democracy: the gram panchayat. Serving as Buddharam\'s Sarpanch, he oversaw tank maintenance, community roads, and agricultural credit accessibility. His technical qualification as a civil draughtsman equipped him with direct literacy in engineering blueprints, canal gradient flows, and irrigation bund stability. In 1996, he was elected as ZPTC member representing Ghanapuram mandal. In the 2023 Telangana Legislative Assembly elections, contesting as the Indian National Congress candidate, he secured a decisive mandate with 54.55% of all valid votes.',
      translations: {
        te: {
          leadTitle: 'ప్రజాస్వామ్య విలువలు, వ్యవసాయం & నిరంతర ప్రజాసేవకే అంకితమైన జీవన ప్రస్థానం.',
          biographySummary: '1965లో జయశంకర్ భూపాలపల్లి జిల్లా ఘనపురం మండలం బుద్ధారం గ్రామంలో వ్యవసాయ కుటుంబంలో జన్మించిన గండ్ర సత్యనారాయణ రావు (సత్తెన్న), కాకతీయ విశ్వవిద్యాలయం నుండి బి.ఎ. మరియు సివిల్ ఐటీఐ డిప్లొమా పూర్తి చేశారు. నాలుగు దశాబ్దాలుగా బుద్ధారం గ్రామ సర్పంచ్‌గా, జెడ్పీటీసీగా ప్రజాసేవలో కొనసాగుతూ, 2023 డిసెంబర్ శాసనసభ ఎన్నికల్లో 1,23,116 ఓట్లతో 52,699 ఓట్ల భారీ మెజారిటీతో విజయం సాధించి భూపాలపల్లి ఎమ్మెల్యేగా నిరంతరం ప్రజాసేవలో నిమగ్నమై ఉన్నారు.',
          biographyExtended: 'సత్తెన్న ప్రజా జీవితం భారత ప్రజాస్వామ్య పునాది అయిన గ్రామ పంచాయతీ నుండి ప్రారంభమైంది. బుద్ధారం గ్రామ సర్పంచ్‌గా చెరువుల నిర్వహణ, గ్రామీణ రహదారులు, సాగునీటి పారుదల మరియు రైతుల సంక్షేమంలో కీలక పాత్ర పోషించారు. సివిల్ ఇంజనీరింగ్ పరిజ్ఞానం ఉండటం వల్ల ప్రాజెక్టుల నాణ్యత, కాల్వల లెవల్స్‌పై సాంకేతిక పట్టు సాధించారు. 1996లో ఘనపురం జెడ్పీటీసీగా, 2023లో భూపాలపల్లి ఎమ్మెల్యేగా చారిత్రాత్మక ఘనవిజయం సాధించారు.'
        }
      },
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
          displayOrder: 1,
          translations: {
            te: {
              role: 'గ్రామ సర్పంచ్',
              title: 'బుద్ధారం గ్రామ సర్పంచ్‌గా ప్రజా ప్రస్థానం',
              description: 'స్వగ్రామమైన బుద్ధారంలో గ్రామ సర్పంచ్‌గా ప్రజాసేవ ప్రారంభించి, గ్రామ పరిపాలన, స్థానిక సాగునీటి చెరువులు, రైతు సమస్యల పరిష్కారంలో కీలక పాత్ర.',
              citation: 'స్థానిక ఎన్నికల రికార్డులు'
            }
          }
        },
        {
          yearOrPeriod: '1996',
          role: 'ZPTC Member',
          title: 'Elected ZPTC, Ghanapuram Mandal',
          description: 'Elected to the Zilla Parishad Territorial Constituency (ZPTC) representing Ghanapuram mandal under TDP, coordinating mandal development works and school facilities.',
          citation: 'TV9 Telugu Political Feature',
          displayOrder: 2,
          translations: {
            te: {
              role: 'జెడ్పీటీసీ సభ్యులు',
              title: 'ఘనపురం మండల జెడ్పీటీసీగా ఎన్నిక',
              description: 'ఘనపురం మండలం జెడ్పీటీసీ సభ్యునిగా ఎన్నికై, మండల వ్యాప్తంగా విద్యా సంస్థలు, ఆస్పత్రులు మరియు గ్రామీణ మౌలిక వసతుల కల్పనలో విశేష కృషి.',
              citation: 'టీవీ9 తెలుగు పొలిటికల్ ఫీచర్'
            }
          }
        },
        {
          yearOrPeriod: '2014 & 18',
          role: 'Assembly Candidate',
          title: 'Bhupalpalle Assembly Contests',
          description: 'Contested the Bhupalpalle Assembly constituency in 2014 and in 2018 under All India Forward Bloc (securing 53,982 votes), consolidating deep rural support across all major mandals.',
          citation: 'Election Commission of India / MyNeta',
          displayOrder: 3,
          translations: {
            te: {
              role: 'అసెంబ్లీ అభ్యర్థి',
              title: 'భూపాలపల్లి అసెంబ్లీ నియోజకవర్గ పోటీ',
              description: 'భూపాలపల్లి నియోజకవర్గం నుండి 2014 మరియు 2018 శాసనసభ ఎన్నికల్లో పోటీ చేసి (2018లో 53,982 ఓట్లు సాధించి), అన్ని మండలాల ప్రజల మన్ననలు పొందారు.',
              citation: 'భారత ఎన్నికల సంఘం / మైనేత'
            }
          }
        },
        {
          yearOrPeriod: '2021',
          role: 'Sep 30 · Congress',
          title: 'Induction into Indian National Congress',
          description: 'Formally joined the Indian National Congress on September 30, 2021, under the leadership of TPCC President A. Revanth Reddy, actively coordinating district party cadre and constituent outreach.',
          citation: 'The New Indian Express / The Hans India',
          displayOrder: 4,
          translations: {
            te: {
              role: 'సెప్టెంబర్ 30 · కాంగ్రెస్',
              title: 'భారత జాతీయ కాంగ్రెస్ పార్టీలో చేరిక',
              description: 'టీపీసీసీ అధ్యక్షులు ఎ. రేవంత్ రెడ్డి గారి సమక్షంలో 2021 సెప్టెంబర్ 30న కాంగ్రెస్ పార్టీలో చేరి, నియోజకవర్గ స్థాయిలో పార్టీ శ్రేణులను బలోపేతం చేశారు.',
              citation: 'ది న్యూ ఇండియన్ ఎక్స్‌ప్రెస్ / ది హన్స్ ఇండియా'
            }
          }
        },
        {
          yearOrPeriod: '2023',
          role: 'Elected MLA',
          title: 'Dec 3, 2023: Decisive Victory in 3rd Telangana Assembly',
          description: 'Elected to the Telangana Legislative Assembly representing Bhupalpalle constituency (108) with 123,116 votes (54.55% of the total poll), recording a winning margin of 52,699 votes. Currently serving 2023–2028 legislative term.',
          citation: 'Election Commission of India / PRS Legislative Research',
          accentColor: '#86EFAC',
          displayOrder: 5,
          translations: {
            te: {
              role: 'ఎమ్మెల్యేగా ఎన్నిక',
              title: 'డిసెంబర్ 3, 2023: 52,699 ఓట్ల మెజారిటీతో చారిత్రాత్మక ఘనవిజయం',
              description: 'తెలంగాణ శాసనసభ ఎన్నికల్లో భూపాలపల్లి నియోజకవర్గం (108) నుండి 1,23,116 ఓట్లతో (54.55% ఓట్ల శాతం) మరియు 52,699 ఓట్ల అఖండ మెజారిటీతో విజయం సాధించి 3వ శాసనసభ్యునిగా బాధ్యతలు స్వీకరించారు.',
              citation: 'భారత ఎన్నికల సంఘం / పిఆర్ఎస్ లెజిస్లేటివ్ రీసెర్చ్'
            }
          }
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
        displayOrder: 1,
        translations: {
          te: {
            title: 'ఘనపూర్ రిజర్వాయర్ సాగునీటి కాలువల ఆధునికీకరణ',
            summary: 'ఘనపూర్ రిజర్వాయర్ పరిధిలోని నాలుగు ప్రధాన పంట కాలువల ఆధునికీకరణ మరియు కాంక్రీట్ లైనింగ్ పనులకు ₹31 కోట్ల నిధులు మంజూరు. దేవాదుల మరియు ఎస్సారెస్పీ ద్వారా 44,000 ఎకరాల ఆయకట్టుకు పుష్కలంగా సాగునీరు అందించే లక్ష్యం.',
            categoryLabel: 'సాగునీటి ఆధునికీకరణ',
            statusNote: 'టెండర్ల ప్రక్రియ ప్రారంభమైంది · 12 నెలల్లో పూర్తి చేయాలని లక్ష్యం',
            representativeAction: 'ప్రభుత్వంతో సమన్వయం చేసి నిధుల మంజూరు సాధించారు'
          }
        }
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
        displayOrder: 2,
        translations: {
          te: {
            title: 'కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి ఆలయ సమగ్ర అభివృద్ధి',
            summary: 'రేగొండ మండలంలోని ప్రముఖ పుణ్యక్షేత్రమైన కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి దేవస్థాన అభివృద్ధికి ₹12.15 కోట్ల ప్రత్యేక నిధులు మంజూరు. భక్తుల క్యూ కాంప్లెక్స్, అన్నదాన సత్రం మరియు యాత్రికుల వసతుల నిర్మాణం.',
            categoryLabel: 'ఆధ్యాత్మికం & పర్యాటకం',
            statusNote: 'క్షేత్రస్థాయిలో నిర్మాణ పనులు వేగంగా జరుగుతున్నాయి',
            representativeAction: 'ముఖ్యమంత్రి ప్రత్యేక నిధుల ద్వారా మంజూరు చేయించారు'
          }
        }
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
        displayOrder: 3,
        translations: {
          te: {
            title: 'ఇందిరమ్మ ఇండ్ల పథకం అమలు & క్షేత్రస్థాయి పర్యవేక్షణ',
            summary: 'భూపాలపల్లి నియోజకవర్గంలోని నిరుపేదలకు పారదర్శకంగా ఇందిరమ్మ ఇళ్ళు అందించేందుకు అధికారులతో నిరంతర సమీక్షలు. నాణ్యతతో కూడిన పనులు, త్వరితగతిన లబ్ధిదారులకు అందజేత.',
            categoryLabel: 'ఇందిరమ్మ ఇళ్ళు & సంక్షేమం',
            statusNote: 'నిరంతర సమీక్షలు మరియు క్షేత్రస్థాయి తనిఖీలు',
            representativeAction: 'ప్రజా దర్బార్ ద్వారా లబ్ధిదారుల ఎంపిక పర్యవేక్షణ'
          }
        }
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
        displayOrder: 4,
        translations: {
          te: {
            title: 'చిట్యాల ఆధునిక బస్టాండ్ & గ్రామీణ బీటీ రోడ్ల నిర్మాణం',
            summary: 'చిట్యాలలో ₹3.75 కోట్ల వ్యయంతో అత్యాధునిక ఆర్టీసీ బస్టాండ్ నిర్మాణానికి జిల్లా కలెక్టర్‌తో కలిసి శంకుస్థాపన. గ్రామీణ వ్యవసాయ మార్కెట్లను కలుపుతూ ₹4.16 కోట్ల బీటీ రోడ్ల విస్తరణ.',
            categoryLabel: 'రవాణా & రహదారులు',
            statusNote: 'బస్టాండ్ మరియు రహదారుల నిర్మాణ పనులు పురోగతిలో ఉన్నాయి',
            representativeAction: 'గ్రామీణ రవాణా సౌకర్యాలకై శంకుస్థాపన చేశారు'
          }
        }
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
        displayOrder: 5,
        translations: {
          te: {
            title: 'మంజునగర్ & నవాబుపేటలో మూడు 33/11 కేవీ విద్యుత్ సబ్‌స్టేషన్లు',
            summary: 'ఉప ముఖ్యమంత్రి మల్లు భట్టి విక్రమార్క గారితో కలిసి ₹6 కోట్ల వ్యయంతో నిర్మించిన మూడు 33/11 కేవీ సబ్‌స్టేషన్లను ప్రారంభించారు. దీనివల్ల వ్యవసాయ బోర్లకు లో-వోల్టేజీ సమస్య పరిష్కారమై నిరంతర విద్యుత్ లభిస్తుంది.',
            categoryLabel: 'విద్యుత్ & వ్యవసాయం',
            statusNote: 'పూర్తయి నిరంతర నాణ్యమైన విద్యుత్ సరఫరా ప్రారంభమైంది',
            representativeAction: 'ఉప ముఖ్యమంత్రితో కలిసి ప్రారంభోత్సవం చేశారు'
          }
        }
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
        displayOrder: 1,
        translations: {
          te: {
            title: 'సింగరేణి బొగ్గు గని కార్మికులు & భూ నిర్వాసిత కుటుంబాలకై శాసనసభలో పోరాటం',
            location: 'తెలంగాణ శాసనసభ వేదిక',
            categoryLabel: 'శాసనసభ ప్రసంగం',
            summary: 'తెలంగాణ శాసనసభ సమావేశాల్లో గండ్ర సత్యనారాయణ రావు గారు సింగరేణి కార్మికుల దీర్ఘకాలిక సమస్యలను లేవనెత్తారు. భూ నిర్వాసితులకు మెరుగైన పునరావాస ప్యాకేజీలు, రిటైర్డ్ ఉద్యోగులకు కార్పొరేట్ వైద్య భద్రత, కాంట్రాక్ట్ కార్మికులకు న్యాయమైన వేతనాల అమలుకై ప్రభుత్వంపై ఒత్తిడి తెచ్చారు.',
            sourceLabel: 'అసెంబ్లీ హన్సార్డ్ రికార్డు & ఆంధ్రప్రభ'
          }
        }
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
        displayOrder: 2,
        translations: {
          te: {
            title: 'ఆచార్య కొండా లక్ష్మణ్ బాపూజీ జయంతి సంస్మరణ సభ',
            location: 'భూపాలపల్లి అర్బన్',
            categoryLabel: 'సంస్మరణ ప్రసంగం',
            summary: 'తెలంగాణ తొలితరం విముక్తి యోధుడు, స్వాతంత్ర్య సమరయోధుడు ఆచార్య కొండా లక్ష్మణ్ బాపూజీ జయంతి సందర్భంగా ముఖ్య అతిథిగా పాల్గొని ఘనంగా నివాళులర్పించారు.',
            sourceLabel: 'జిల్లా సమాచార పౌరసంబంధాల శాఖ'
          }
        }
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
        displayOrder: 3,
        translations: {
          te: {
            title: 'నియోజకవర్గ ఉపాధ్యాయులు & విద్యావేత్తల సన్మాన సభ',
            location: 'భూపాలపల్లి కేంద్రం',
            categoryLabel: 'విద్యా సమ్మేళనం',
            summary: 'గ్రామీణ విద్యాభివృద్ధిలో ఉపాధ్యాయుల పాత్ర అత్యంత కీలకమని కొనియాడుతూ, నియోజకవర్గ ఉత్తమ ఉపాధ్యాయులను శాలువాలతో ఘనంగా సత్కరించారు.',
            sourceLabel: 'ఎమ్మెల్యే మీడియా విభాగం'
          }
        }
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
        displayOrder: 4,
        translations: {
          te: {
            title: 'రైతాంగానికి కోల్డ్ స్టోరేజ్ & ఆయిల్ పామ్ సబ్సిడీలకై అసెంబ్లీలో డిమాండ్',
            location: 'తెలంగాణ శాసనసభ',
            categoryLabel: 'శాసనసభ ప్రశ్న',
            summary: 'కూరగాయల రైతులు దళారుల బారిన పడకుండా భూపాలపల్లిలో కోల్డ్ స్టోరేజ్ యూనిట్లు ఏర్పాటు చేయాలని, అలాగే ఆయిల్ పామ్ రైతులకు మొక్కలు మరియు డ్రిప్ సబ్సిడీలను పెంచాలని శాసనసభలో బలమైన డిమాండ్ చేశారు.',
            sourceLabel: 'శాసనసభ ప్రొసీడింగ్స్'
          }
        }
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
        displayOrder: 5,
        translations: {
          te: {
            title: 'చలివాగు ప్రాజెక్టు నీటిమట్టాల పరిశీలన & అక్రమ నీటి తరలింపు నిరోధం',
            location: 'చలివాగు ప్రాజెక్ట్ ఆయకట్టు',
            categoryLabel: 'క్షేత్రస్థాయి పరిశీలన',
            summary: 'చలివాగు రిజర్వాయర్ నీటిమట్టాలను స్వయంగా పరిశీలించి, స్థానిక ఆయకట్టు రైతుల ప్రయోజనాలను కాపాడేందుకు అక్రమ నీటి మళ్లింపులను అడ్డుకోవాలని అధికారులను హెచ్చరించారు.',
            sourceLabel: 'నమస్తే తెలంగాణ & సాక్షి'
          }
        }
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
        displayOrder: 1,
        translations: {
          te: {
            title: 'ముఖ్యమంత్రి ఎ. రేవంత్ రెడ్డి గారితో భారీ బహిరంగ సభ ప్రసంగం',
            caption: 'జయశంకర్ భూపాలపల్లి జిల్లాలో వేలాది మంది ప్రజల సమక్షంలో ముఖ్యమంత్రితో కలిసి సభను ఉద్దేశించి ప్రసంగం',
            categoryLabel: 'ప్రజా సభలు & వేదిక'
          }
        }
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
        displayOrder: 2,
        translations: {
          te: {
            title: 'వారపు "ప్రజా దర్బార్" నమస్కార ముద్ర',
            caption: 'బుద్ధారం క్యాంపు కార్యాలయంలో ప్రజల సమస్యలను ప్రత్యక్షంగా వింటూ వినతులు స్వీకరణ',
            categoryLabel: 'అధికారిక చిత్రాలు · ప్రజా నాయకత్వం'
          }
        }
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
        displayOrder: 3,
        translations: {
          te: {
            title: 'అధికారిక శాసనసభ ప్రొఫైల్ చిత్రం',
            caption: 'తెలంగాణ శాసనసభ అధికారిక రికార్డుల కొరకు నమోదు చేయబడిన చిత్రం',
            categoryLabel: 'అధికారిక చిత్రాలు · నాయకత్వం'
          }
        }
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
        displayOrder: 4,
        translations: {
          te: {
            title: 'ముఖ్యమంత్రి రేవంత్ రెడ్డి గారితో సతీమణి గండ్ర పద్మ & సత్తెన్న',
            caption: 'నియోజకవర్గ ప్రధాన సాగునీటి ప్రాజెక్టులు, ఆలయ నిధుల మంజూరుపై ముఖ్యమంత్రితో చర్చలు',
            categoryLabel: 'పాలనా సమన్వయం'
          }
        }
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
        displayOrder: 5,
        translations: {
          te: {
            title: 'భూపాలపల్లి (108) శాసనసభ్యునిగా చారిత్రాత్మక విజయం',
            caption: 'డిసెంబర్ 2023లో 52,699 ఓట్ల అఖండ మెజారిటీతో విజయం సాధించిన సందర్భంగా',
            categoryLabel: 'అధికారిక చిత్రాలు · ప్రజా తీర్పు'
          }
        }
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

    // 8. Seed PageSection (Dynamic CMS Section Builder)
    await PageSection.deleteMany({});
    await PageSection.create([
      {
        key: 'farmers-water-security',
        page: 'home',
        type: 'feature',
        layout: 'split_media',
        title: 'Safeguarding Every Acre: Devadula & Ghanapur Irrigation Networks',
        subtitle: 'Uncompromising legislative push to ensure dependable canal water reaching tail-end agricultural fields.',
        badge: 'Priority Initiative · సాగునీటి ప్రాధాన్యత',
        content: 'Through coordinated representation with state irrigation authorities, ₹31 Crore has been sanctioned for modernizing the 4 major crop canals under Ghanapur reservoir. With direct oversight on the Devadula Lift Irrigation Scheme and Sriram Sagar Project (SRSP) feeders, water distribution is secured for over 44,000 agrarian acres across Ghanapur, Regonda, and Mogullapalle mandals.',
        mediaUrl: '/images/work/irrigation.jpg',
        mediaAlt: 'Ghanapur canal modernizing works and agricultural fields',
        ctaText: 'Explore Irrigation Projects',
        ctaLink: '/work',
        order: 1,
        isEnabled: true,
        status: 'published',
        translations: {
          te: {
            title: 'ప్రతి ఎకరాకూ సాగునీరు: దేవాదుల & ఘనపూర్ ఆయకట్టు రక్షణ',
            subtitle: 'చివరి ఆయకట్టు వరకు సాగునీరందించడమే లక్ష్యంగా నిరంతర శాసనసభ పోరాటం.',
            badge: 'రైతాంగ ప్రాధాన్యత',
            content: 'రాష్ట్ర సాగునీటి శాఖ అధికారులతో జరిపిన సంప్రదింపులతో ఘనపూర్ రిజర్వాయర్ పరిధిలోని 4 ప్రధాన కాల్వల ఆధునికీకరణ కోసం ₹31 కోట్లు మంజూరు చేయబడ్డాయి. దేవాదుల ఎత్తిపోతల పథకం, ఎస్సారెస్పీ కాల్వల ద్వారా ఘనపూర్, రేగొండ, మొగుళ్లపల్లి మండలాల్లోని 44,000 ఎకరాల రైతులకు సాగునీటి భద్రత చేకూర్చబడుతోంది.',
            ctaText: 'సాగునీటి ప్రాజెక్టుల వివరాలు',
            mediaAlt: 'ఘనపూర్ కాల్వల ఆధునికీకరణ పనులు'
          }
        }
      },
      {
        key: 'singareni-labor-welfare',
        page: 'home',
        type: 'quote_callout',
        layout: 'full_width',
        title: 'Standing Unconditionally with Singareni Coal Belt Families',
        subtitle: 'Our mining brothers risk their lives in the underground depths to power Telangana. Their welfare, healthcare, and fair compensation for displaced families are non-negotiable rights.',
        badge: 'Assembly Stance · ప్రజా గళం',
        content: '“From underground pits to open-cast mines across Bhupalpalle, Singareni Collieries workers form the backbone of our economy. In the Assembly, we demand full rehabilitation packages for land-displaced families, corporate healthcare for retired workers, and immediate regularization of contract mining laborers.”',
        mediaUrl: '/images/events/public-address.png',
        mediaAlt: 'Gandra Satyanarayana Rao speaking on worker welfare in the Assembly',
        ctaText: 'Read Legislative Record',
        ctaLink: '/activities',
        order: 2,
        isEnabled: true,
        status: 'published',
        translations: {
          te: {
            title: 'సింగరేణి కార్మిక కుటుంబాల హక్కుల కోసం అచంచల పోరాటం',
            subtitle: 'భూగర్భ గనుల్లో చెమటోడ్చి తెలంగాణకు వెలుగులు నింపుతున్న సింగరేణి కార్మికుల సంక్షేమం, భూ నిర్వాసితుల పరిహారం మా బాధ్యత.',
            badge: 'శాసనసభ గళం',
            content: '“భూపాలపల్లి నియోజకవర్గంలోని సింగరేణి కార్మికులు, వారి కుటుంబాల సంక్షేమం కోసం అసెంబ్లీలో నిరంతరం గళమెత్తుతున్నాం. భూ నిర్వాసితులకు సమగ్ర పునరావాసం, రిటైర్డ్ కార్మికులకు కార్పొరేట్ వైద్యం, మరియు కాంట్రాక్ట్ కార్మికులకు న్యాయమైన వేతనాల కోసం ప్రభుత్వంపై ఒత్తిడి తెస్తున్నాం.”',
            ctaText: 'శాసనసభ ప్రసంగాల వివరాలు',
            mediaAlt: 'శాసనసభలో కార్మిక సంక్షేమంపై ప్రసంగం'
          }
        }
      },
      {
        key: 'buddharam-praja-darbar',
        page: 'home',
        type: 'feature',
        layout: 'split_media',
        title: 'Direct Citizen Accessibility: Weekly Praja Darbar at Buddharam',
        subtitle: 'A transparent platform for constituents to present village issues, individual grievances, and development needs.',
        badge: 'Camp Office Open Court · ప్రజా దర్బార్',
        content: 'Every Monday and Wednesday morning, the MLA Camp Office at Buddharam Village opens for public representations. Farmers, students, elders, and women delegations interact directly with Sathenna, with petitions immediately recorded and forwarded with official endorsement slips to district authorities.',
        mediaUrl: '/images/about/portrait-namaste.png',
        mediaAlt: 'Gandra Satyanarayana Rao greeting citizens at Praja Darbar',
        ctaText: 'Submit Grievance Online',
        ctaLink: '/contact',
        order: 3,
        isEnabled: true,
        status: 'published',
        translations: {
          te: {
            title: 'ప్రజల వద్దకే నాయకుడు: బుద్ధారంలో వారపు ప్రజా దర్బార్',
            subtitle: 'గ్రామ సమస్యలు, వ్యక్తిగత వినతులను నేరుగా నాయకునికి నివేదించే ప్రత్యక్ష వేదిక.',
            badge: 'క్యాంపు కార్యాలయం · ప్రజా దర్బార్',
            content: 'ప్రతి సోమవారం, బుధవారం ఉదయం బుద్ధారం క్యాంపు కార్యాలయంలో ప్రజా దర్బార్ నిర్వహించబడుతుంది. రైతులు, మహిళలు, యువత తమ సమస్యలను నేరుగా సత్తెన్నకు విన్నవించవచ్చు. ప్రతి అర్జీని నమోదు చేసి సంబంధిత జిల్లా అధికారులకు సిఫార్సు చేయబడుతుంది.',
            ctaText: 'ఆన్‌లైన్‌లో వినతి సమర్పించండి',
            mediaAlt: 'ప్రజా దర్బార్‌లో ప్రజలను ఆహ్వానిస్తున్న సత్తెన్న'
          }
        }
      }
    ]);
    console.log('[Seed] PageSection (Dynamic Sections) seeded successfully.');

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
