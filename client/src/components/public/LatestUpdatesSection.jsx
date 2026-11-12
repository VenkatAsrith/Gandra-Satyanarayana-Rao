import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

// Verified Field Dispatches & Official Constituency Updates (Latest Active Dispatches)
export const LATEST_UPDATE_RECORDS = [
  {
    id: 'update-mogullapalle-paddy-2026-11-11',
    date: '2026-11-11',
    dateFormattedEn: '11 November 2026',
    dateFormattedTe: '11 నవంబర్ 2026',
    pressNoteLabelEn: 'Paddy Procurement Inauguration',
    pressNoteLabelTe: 'ధాన్యం కొనుగోలు కేంద్రాల ప్రారంభం',
    locationEn: 'Mogullapalle Mandal (Motlapalli, Issipeta)',
    locationTe: 'మొగుళ్లపల్లి మండలం (మోట్లపల్లి, ఇస్సిపేట)',
    categoryEn: 'Agriculture & Farmer Welfare',
    categoryTe: 'వ్యవసాయం & రైతు సంక్షేమం',
    titleEn: 'Inauguration of Paddy Procurement Centers across Mogullapalle Mandal – MLA Sri Gandra Satyanarayana Rao',
    titleTe: 'మొగుళ్లపల్లి మండలంలో పలు గ్రామాల్లో వరి కొనుగోలు కేంద్రాలను ప్రారంభించిన ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు',
    leadEn:
      'Bhupalpalle MLA Sri Gandra Satyanarayana Rao inaugurated the newly established paddy procurement centers across Motlapalli, Mogullapalle, Issipeta, and adjoining villages in Mogullapalle Mandal.',
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని మొగుళ్లపల్లి మండలంలో మోట్లపల్లి, మొగుళ్లపల్లి, ఇస్సిపేట, తదితర గ్రామాల్లో ఏర్పాటు చేసిన వరి కొనుగోలు కేంద్రాలను భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు ప్రారంభించారు.',
    bodyEn: [
      'Speaking on the occasion, the MLA stated that the people\'s government operates with farmer welfare as its cornerstone, ensuring robust institutional arrangements so that every single grain produced by cultivators is procured at the Minimum Support Price (MSP).',
      'He advised farmers to sell their yield directly at government procurement centers rather than turning to middlemen, ensuring fair remuneration. The MLA directed concerned officials to provide all necessary amenities at the centers to prevent any inconvenience to farmers. He emphasized maintaining strict transparency in grain procurement, weighing, and transportation, while ensuring prompt payments directly to farmers.',
      'Affirming that this administration is a pro-farmer government, the MLA highlighted that farmer welfare, agricultural modernization, and rural economic empowerment remain its foremost missions. Local public representatives, Congress party leaders, administrative officials, farmers, and villagers attended the programme.'
    ],
    bodyTe: [
      'ఈ సందర్భంగా ఎమ్మెల్యే గారు మాట్లాడుతూ.. ప్రజా ప్రభుత్వం రైతు సంక్షేమమే లక్ష్యంగా పనిచేస్తోందని, రైతులు పండించిన ప్రతి ధాన్యపు గింజను ప్రభుత్వం కొనుగోలు చేసేందుకు అవసరమైన ఏర్పాట్లు చేస్తోందని తెలిపారు. రైతులు దళారులను ఆశ్రయించకుండా, మద్దతు ధరకు తమ ధాన్యాన్ని కొనుగోలు కేంద్రాల్లో విక్రయించి గిట్టుబాటు ధర పొందాలని సూచించారు.',
      'రైతులకు ఎలాంటి ఇబ్బందులు కలగకుండా కొనుగోలు కేంద్రాల్లో అవసరమైన సౌకర్యాలు కల్పించాలని సంబంధిత అధికారులను ఆదేశించారు. ధాన్యం కొనుగోలు, తూకం, రవాణా తదితర అంశాల్లో పారదర్శకత పాటిస్తూ రైతులకు త్వరితగతిన చెల్లింపులు జరిగేలా చర్యలు తీసుకోవాలని సూచించారు.',
      'ప్రజా ప్రభుత్వం రైతు పక్షపాత ప్రభుత్వమని, రైతుల సంక్షేమం, వ్యవసాయ అభివృద్ధి, గ్రామీణ ఆర్థిక వ్యవస్థ బలోపేతమే ప్రభుత్వ ప్రధాన లక్ష్యాలని ఎమ్మెల్యే గారు పేర్కొన్నారు. రైతుల కష్టానికి తగిన ప్రతిఫలం అందించేందుకు ప్రభుత్వం నిరంతరం కృషి చేస్తుందని స్పష్టం చేశారు. ఈ కార్యక్రమంలో స్థానిక ప్రజాప్రతినిధులు, కాంగ్రెస్ పార్టీ అధ్యక్షుడు, మండల కాంగ్రెస్ పార్టీ నాయకులు, అధికారులు, రైతులు, గ్రామస్తులు తదితరులు పాల్గొన్నారు.'
    ],
    mainImage: '/images/updates/mogullapalle-paddy-motlapalli.jpg',
    photos: [
      {
        id: 'mog-1',
        url: '/images/updates/mogullapalle-paddy-motlapalli.jpg',
        titleEn: 'MLA Sathanna Inaugurating Motlapalli Paddy Procurement Center',
        titleTe: 'మోట్లపల్లి వరి ధాన్యం కొనుగోలు కేంద్రాన్ని ప్రారంభిస్తున్న ఎమ్మెల్యే సాతన్న',
        captionEn: 'MLA Sri Gandra Satyanarayana Rao initiating digital weighing at Motlapalli procurement center.',
        captionTe: 'మోట్లపల్లి కొనుగోలు కేంద్రంలో డిజిటల్ తూకం వేసి కేంద్రాన్ని ప్రారంభిస్తున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు.'
      },
      {
        id: 'mog-2',
        url: '/images/updates/mogullapalle-paddy-issipeta.jpg',
        titleEn: 'Inauguration of Issipeta Procurement Center',
        titleTe: 'ఇస్సిపేట గ్రామంలో వరి కొనుగోలు కేంద్రం ప్రారంభం',
        captionEn: 'Dignitaries and farmers gathered for the commencement of procurement at Issipeta center.',
        captionTe: 'రైతులు మరియు అధికారుల సమక్షంలో ఇస్సిపేట కేంద్రంలో కొనుగోళ్లు ప్రారంభం.'
      },
      {
        id: 'mog-3',
        url: '/images/updates/mogullapalle-paddy-address.jpg',
        titleEn: 'Direct Interaction with Farmers and Procurement Officials',
        titleTe: 'రైతులు, అధికారులతో ఎమ్మెల్యే సాతన్న ముఖాముఖి',
        captionEn: 'Instructing officials to maintain zero discrepancies in moisture and weighing.',
        captionTe: 'తూకం, తేమ శాతంలో రైతులకు ఎలాంటి నష్టం రాకుండా చూడాలని అధికారులను ఆదేశించిన ఎమ్మెల్యే.'
      }
    ]
  },
  {
    id: 'update-tekumatla-development-2026-11-11',
    date: '2026-11-11',
    dateFormattedEn: '11 November 2026',
    dateFormattedTe: '11 నవంబర్ 2026',
    pressNoteLabelEn: 'Infrastructure Foundation & Paddy Centers',
    pressNoteLabelTe: 'అభివృద్ధి పనుల శంకుస్థాపన & ధాన్యం కేంద్రాలు',
    locationEn: 'Tekumatla Mandal (Vellampalli, Bornapalli, Peddampalli)',
    locationTe: 'టేకుమట్ల మండలం (వేల్లంపల్లి, బోర్నపల్లి, పెద్దంపల్లి)',
    categoryEn: 'Rural Development & Agriculture',
    categoryTe: 'గ్రామీణాభివృద్ధి & వ్యవసాయం',
    titleEn: 'Special Priority for Tekumatla Mandal Development – Farmer Welfare is Government\'s Goal: MLA Gandra Satyanarayana Rao',
    titleTe: 'టేకుమట్ల మండల అభివృద్ధికి ప్రత్యేక ప్రాధాన్యత – రైతుల సంక్షేమమే ప్రజా ప్రభుత్వ ధ్యేయం: ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు',
    leadEn:
      'In Tekumatla Mandal of Bhupalpalle constituency, MLA Sri Gandra Satyanarayana Rao laid the foundation stones for civic infrastructure works alongside inaugurating multiple paddy procurement centers across rural habitations.',
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని టేకుమట్ల మండలంలో ఈరోజు భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు పలు గ్రామాల్లో అభివృద్ధి పనులకు శంకుస్థాపనలు చేయడంతో పాటు వరి కొనుగోలు కేంద్రాలను ప్రారంభించారు.',
    bodyEn: [
      'Foundation stones were ceremonially laid for Anganwadi centers, Gram Panchayat secretariats, and Gram Samakhya women\'s federation buildings across Vellampalli, Bornapalli, and Peddampalli villages.',
      'Concurrently, government paddy procurement centers were inaugurated across Garimillapalli, Raghavareddypet, Pangidipalli, Tekumatla, Gummadavelli, Vellampalli, Velishala, and Venkatraopalli (b).',
      'Speaking on the occasion, the MLA emphasized that rural development and quality infrastructure remain the mission of the people\'s government. Modern Anganwadi centers ensure proper nutrition and amenities for children, while Gram Panchayat and Samakhya buildings provide structural support for grassroots governance and women groups.',
      'Reiterating that farmer welfare is the core goal, the MLA affirmed that centers are operationalized to ensure farmers obtain remunerative MSP without falling victim to intermediaries. Local officials, public representatives, former leaders, party mandal presidents, and farmers attended in large numbers.'
    ],
    bodyTe: [
      'వేల్లంపల్లి, బోర్నపల్లి, పెద్దoపల్లి గ్రామాల్లో అంగన్వాడీ కేంద్రాలు, గ్రామపంచాయతీ భవనాలు, గ్రామ సమైక్య భవనాల నిర్మాణ పనులకు శంకుస్థాపనలు చేశారు. అలాగే గరిమిల్ల పల్లి, రాఘవరెడ్డిపేట, పంగిడిపల్లి, టేకుమట్ల, గుమ్మడవెల్లి, వేల్ల్లంపల్లి, వెలిశాల, వెంకట్రావుపల్లి(b) గ్రామాల్లో వరి కొనుగోలు కేంద్రాలను ప్రారంభించారు.',
      'ఈ సందర్భంగా ఎమ్మెల్యే గారు మాట్లాడుతూ... గ్రామాల అభివృద్ధి, ప్రజలకు మెరుగైన మౌలిక సదుపాయాల కల్పనే ప్రజా ప్రభుత్వ లక్ష్యమని తెలిపారు. అంగన్వాడీ కేంద్రాల ద్వారా చిన్నారులకు మెరుగైన పోషకాహారం, సౌకర్యాలు అందించడంతో పాటు గ్రామపంచాయతీ, గ్రామ సమైక్య భవనాల నిర్మాణంతో గ్రామీణ పాలనకు, మహిళా సంఘాల కార్యకలాపాలకు మరింత బలం చేకూరుతుందని పేర్కొన్నారు.',
      'రైతుల సంక్షేమమే ప్రభుత్వ ప్రధాన ధ్యేయమని, రైతులు ఆరుగాలం కష్టపడి పండించిన ధాన్యాన్ని మద్దతు ధరకు కొనుగోలు చేసేందుకు వరి కొనుగోలు కేంద్రాలను ప్రారంభిస్తున్నామని తెలిపారు. రైతులు దళారులను ఆశ్రయించకుండా, ఎలాంటి ఇబ్బందులు ఎదుర్కోకుండా ధాన్యాన్ని కొనుగోలు కేంద్రాల్లో విక్రయించుకోవాలని సూచించారు. ధాన్యం కొనుగోలు ప్రక్రియలో రైతులకు ఎలాంటి ఇబ్బందులు కలగకుండా అధికారులు సమన్వయంతో పనిచేయాలని సూచించారు.',
      'ఈ కార్యక్రమంలో ఎమ్మెల్యే గారి వెంట సంబంధిత అధికారులు, స్థానిక ప్రజాప్రతినిధులు, మాజీ ప్రజా ప్రతినిధులు మండల పార్టీ అధ్యక్షుడు, మండల నాయకులు, కాంగ్రెస్ పార్టీ నాయకులు, రైతులు తదితరులు పాల్గొన్నారు.'
    ],
    mainImage: '/images/updates/tekumatla-paddy-inauguration.jpg',
    photos: [
      {
        id: 'tek-1',
        url: '/images/updates/tekumatla-paddy-inauguration.jpg',
        titleEn: 'Inaugurating Paddy Weighing at Tekumatla Mandal Center',
        titleTe: 'టేకుమట్ల మండలంలో వరి కొనుగోలు కేంద్రాన్ని ప్రారంభిస్తున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు',
        captionEn: 'MLA Sathanna inaugurating electronic weighing scale with traditional agrarian honors.',
        captionTe: 'రైతు కండువాతో ఎలక్ట్రానిక్ తూకం వేసి ధాన్యం కొనుగోలు కేంద్రాన్ని ప్రారంభిస్తున్న ఎమ్మెల్యే సాతన్న.'
      },
      {
        id: 'tek-2',
        url: '/images/updates/tekumatla-paddy-weighing.jpg',
        titleEn: 'Pouring First Harvest Grains at Procurement Center',
        titleTe: 'కొనుగోలు కేంద్రంలో మొదటి ధాన్యం బస్తా తూకం వేస్తున్న దృశ్యం',
        captionEn: 'Commencing transparent procurement for agricultural families in Tekumatla.',
        captionTe: 'టేకుమట్ల మండల రైతులకు మద్దతు ధర అందించేందుకు ధాన్యం తూకం వేస్తున్న ప్రజాప్రతినిధులు.'
      }
    ]
  },
  {
    id: 'update-gorukothapalli-2026-11-06',
    date: '2026-11-06',
    dateFormattedEn: '06 November 2026',
    dateFormattedTe: '06 నవంబర్ 2026',
    pressNoteLabelEn: 'Welfare Cheque Handover',
    pressNoteLabelTe: 'సంక్షేమ చెక్కుల పంపిణీ',
    locationEn: 'Gorukothapalli Mandal',
    locationTe: 'గోరుకొత్తపల్లి మండలం',
    categoryEn: 'Public Welfare & Social Security',
    categoryTe: 'ప్రజా సంక్షేమం & సామాజిక భద్రత',
    titleEn: 'Distribution of Kalyana Lakshmi & Shaadi Mubarak Cheques in Gorukothapalli Mandal – MLA Sri Gandra Satyanarayana Rao',
    titleTe: 'గోరుకొత్తపల్లి మండలంలో కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కుల పంపిణీ చేసిన - ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు',
    leadEn:
      'Bhupalpalle MLA Sri Gandra Satyanarayana Rao attended as the Chief Guest at the Kalyana Lakshmi and Shaadi Mubarak cheque distribution ceremony held in Gorukothapalli Mandal.',
    leadTe:
      'భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు గోరుకొత్తపల్లి మండలంలో నిర్వహించిన కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కుల పంపిణీ కార్యక్రమానికి ముఖ్య అతిథిగా హాజరయ్యారు.',
    bodyEn: [
      'On this occasion, financial aid cheques were distributed to 21 beneficiaries across the mandal.',
      'Speaking at the gathering, the MLA emphasized that providing financial security for the marriage of young women from underprivileged families is the paramount objective of the people\'s government led by Chief Minister Sri A. Revanth Reddy, and tireless efforts are being made to ensure that all welfare schemes reach every eligible household directly without hurdles.',
      'Local public representatives, Congress party leaders, former civic leaders, and beneficiaries participated in the event in large numbers.'
    ],
    bodyTe: [
      'ఈ సందర్భంగా 21 మంది లబ్ధిదారులకు కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కులను స్వయంగా పంపిణీ చేశారు.',
      'ఈ సందర్భంగా ఎమ్మెల్యే గారు మాట్లాడుతూ పేద కుటుంబాల్లోని ఆడపిల్లల వివాహాలకు ఆర్థిక భరోసా కల్పించడమే ప్రజా ప్రభుత్వ లక్ష్యమని, అర్హులైన ప్రతి ఒక్కరికీ ప్రభుత్వ సంక్షేమ పథకాలు అందేలా కృషి చేస్తున్నామని తెలిపారు.',
      'ఈ కార్యక్రమంలో స్థానిక ప్రజాప్రతినిధులు, కాంగ్రెస్ పార్టీ నాయకులు, మాజీ ప్రజా ప్రతినిధులు, లబ్ధిదారులు పాల్గొనడం జరిగింది.'
    ],
    mainImage: '/images/updates/gorukothapalli-cheques.jpg',
    photos: [
      {
        id: 'gk-1',
        url: '/images/updates/gorukothapalli-cheques.jpg',
        titleEn: 'Kalyana Lakshmi & Shaadi Mubarak Cheque Handover to Beneficiaries',
        titleTe: 'లబ్ధిదారులకు కళ్యాణలక్ష్మి & షాదీ ముబారక్ చెక్కుల పంపిణీ',
        captionEn: 'MLA Sri Gandra Satyanarayana Rao handing over financial assistance cheques to 21 beneficiary families in Gorukothapalli Mandal.',
        captionTe: 'గోరుకొత్తపల్లి మండలంలో 21 మంది లబ్ధిదారుల కుటుంబాలకు చెక్కులను స్వయంగా అందజేస్తున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు.'
      }
    ]
  },
  {
    id: 'update-chityal-development-2026-11-03',
    date: '2026-11-03',
    dateFormattedEn: '03 November 2026',
    dateFormattedTe: '03 నవంబర్ 2026',
    pressNoteLabelEn: 'Foundation Stone Unveiling',
    pressNoteLabelTe: 'అభివృద్ధి పనుల శంకుస్థాపన',
    locationEn: 'Chityal Mandal',
    locationTe: 'చిట్యాల మండలం',
    categoryEn: 'Rural Infrastructure & Women Empowerment',
    categoryTe: 'గ్రామీణ మౌలిక వసతులు & మహిళా సాధికారత',
    titleEn: 'Foundation Stone Laid for ₹2.14 Crore Development Works in Chityal Mandal – MLA Gandra Satyanarayana Rao',
    titleTe: 'రూ.2.14 కోట్లతో చిట్యాల మండలంలో అభివృద్ధి పనులకు శంకుస్థాపనలు చేసిన – ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు',
    leadEn:
      'Bhupalpalle MLA Sri Gandra Satyanarayana Rao laid the foundation stones for multiple developmental works sanctioned at an estimated cost of approximately ₹2.14 Crore across Chityal Mandal.',
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని చిట్యాల మండలంలో సుమారు రూ.2.14 కోట్ల వ్యయంతో చేపట్టనున్న పలు అభివృద్ధి పనులకు భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు శంకుస్థాపనలు చేశారు.',
    bodyEn: [
      'On this occasion, foundation stones were laid for women\'s self-help group buildings in Chainpaka, Anduku Thanda, Giddemutharam, and Kalvapalli villages, as well as Mahila Samakhya buildings and Anganwadi centers in Bawsingh Palli and Pashigadda Thanda. Furthermore, in Ramachandrapuram village, foundation stones were laid for an Anganwadi building, Mahila Samakhya center, and the Gram Panchayat building.',
      'Speaking on the occasion, the MLA emphasized that the people\'s government led by Chief Minister Sri A. Revanth Reddy is giving top priority to women\'s empowerment and rural development. Funds are sanctioned for self-help group buildings, improved Anganwadi amenities for children, and administrative Gram Panchayat secretariats.',
      'The government is progressing with the clear goal of comprehensive rural development and superior infrastructure. The MLA affirmed that he will work tirelessly to bring necessary state funding for the development of Bhupalpalle constituency. Local public representatives, sarpanches, Congress party leaders, women group members, Anganwadi staff, and villagers participated in large numbers.'
    ],
    bodyTe: [
      'ఈ సందర్భంగా చైన్పాక, అందుకు తండా, గిద్దెముత్తారం, కాల్వపల్లి గ్రామాల్లో మహిళా సంఘ భవనాల నిర్మాణానికి, బావుసింగ్ పల్లి, పాశిగడ్డ తండా గ్రామాల్లో మహిళా సమైక్య భవనాలు, అంగన్వాడీ భవనాల నిర్మాణానికి శంకుస్థాపన చేశారు. అదేవిధంగా రామచంద్రాపురం గ్రామంలో అంగన్వాడీ భవనం, మహిళా సమైక్య భవనం, గ్రామ పంచాయతీ భవన నిర్మాణ పనులకు శంకుస్థాపన నిర్వహించారు.',
      'ఈ సందర్భంగా ఎమ్మెల్యే గారు మాట్లాడుతూ ముఖ్యమంత్రి శ్రీ రేవంత్ రెడ్డి గారి నాయకత్వంలోని ప్రజా ప్రభుత్వం మహిళా సాధికారతకు, గ్రామీణ ప్రాంతాల అభివృద్ధికి పెద్దపీట వేస్తోందని తెలిపారు. మహిళా సంఘాలకు సొంత భవనాలు, చిన్నారులకు మెరుగైన అంగన్వాడీ వసతులు, గ్రామ పాలనకు అవసరమైన గ్రామ పంచాయతీ భవనాలను నిర్మించేందుకు ప్రభుత్వం నిధులు మంజూరు చేస్తోందన్నారు.',
      'గ్రామాల సమగ్ర అభివృద్ధి, ప్రజలకు మెరుగైన మౌలిక సదుపాయాల కల్పనే లక్ష్యంగా ప్రభుత్వం ముందుకు సాగుతోందని, భూపాలపల్లి నియోజకవర్గ అభివృద్ధికి అవసరమైన నిధులు తీసుకురావడంలో నిరంతరం కృషి చేస్తానని ఎమ్మెల్యే గారు తెలిపారు. ఈ కార్యక్రమాల్లో స్థానిక ప్రజాప్రతినిధులు, సర్పంచులు, కాంగ్రెస్ పార్టీ నాయకులు, మహిళా సంఘాల ప్రతినిధులు, అంగన్వాడీ సిబ్బంది, గ్రామ పంచాయతీ అధికారులు, స్థానిక నాయకులు, గ్రామ ప్రజలు పాల్గొన్నారు.'
    ],
    mainImage: '/images/updates/chityal-development.jpg',
    photos: [
      {
        id: 'ch-1',
        url: '/images/updates/chityal-development.jpg',
        titleEn: 'Foundation Stone Unveiling for ₹2.14 Cr Rural Infrastructure in Chityal',
        titleTe: 'చిట్యాల మండలంలో రూ.2.14 కోట్ల అభివృద్ధి పనుల శిలాఫలకం ఆవిష్కరణ',
        captionEn: 'MLA Sri Gandra Satyanarayana Rao joined by local women leaders and public representatives laying foundation stones.',
        captionTe: 'మహిళా ప్రజాప్రతినిధులు, స్థానిక నాయకుల సమక్షంలో శిలాఫలకం ఆవిష్కరిస్తున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు.'
      }
    ]
  }
];

export default function LatestUpdatesSection() {
  const { isTelugu } = useLanguage();
  const [activeUpdateIdx, setActiveUpdateIdx] = useState(0);
  const [activePhotoSubIdx, setActivePhotoSubIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [instagramNotice, setInstagramNotice] = useState(false);

  const trackRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const updates = LATEST_UPDATE_RECORDS;
  const currentUpdate = updates[activeUpdateIdx] || updates[0];
  const photosList = currentUpdate.photos && currentUpdate.photos.length > 0
    ? currentUpdate.photos
    : [{ id: 'single-1', url: currentUpdate.mainImage, titleEn: currentUpdate.titleEn, titleTe: currentUpdate.titleTe, captionEn: currentUpdate.leadEn, captionTe: currentUpdate.leadTe }];

  const currentPhoto = photosList[activePhotoSubIdx] || photosList[0];

  // Auto-rotation loop with 3-second delay
  useEffect(() => {
    if (!isAutoPlaying || modalOpen) return;

    const timer = setInterval(() => {
      setActiveUpdateIdx((prev) => {
        const next = (prev + 1) % updates.length;
        setActivePhotoSubIdx(0);
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, modalOpen, updates.length, activeUpdateIdx]);

  // Keep active update in horizontal track view
  useEffect(() => {
    if (trackRef.current) {
      const activeEl = trackRef.current.children[activeUpdateIdx];
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [activeUpdateIdx]);

  const handlePrevUpdate = () => {
    setActiveUpdateIdx((prev) => (prev > 0 ? prev - 1 : updates.length - 1));
    setActivePhotoSubIdx(0);
  };

  const handleNextUpdate = () => {
    setActiveUpdateIdx((prev) => (prev + 1) % updates.length);
    setActivePhotoSubIdx(0);
  };

  const handleSelectUpdate = (idx) => {
    setActiveUpdateIdx(idx);
    setActivePhotoSubIdx(0);
  };

  const openLightbox = (subIdx = 0) => {
    setActivePhotoSubIdx(subIdx);
    setModalOpen(true);
    document.body.classList.add('menu-open');
  };

  const closeLightbox = () => {
    setModalOpen(false);
    document.body.classList.remove('menu-open');
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoSubIdx((prev) => (prev > 0 ? prev - 1 : photosList.length - 1));
  };

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoSubIdx((prev) => (prev < photosList.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen, photosList.length]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNextUpdate();
      else handlePrevUpdate();
    }
  };

  // Sharing Handlers
  const shareTitle = isTelugu ? currentUpdate.titleTe : currentUpdate.titleEn;
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#latest-updates`
    : 'https://gandrasatyanarayanarao.in/#latest-updates';

  const handleWhatsAppShare = () => {
    const text = `*${shareTitle}*\n\n${isTelugu ? currentUpdate.leadTe : currentUpdate.leadEn}\n\n🏛️ MLA Sri Gandra Satyanarayana Rao (Sathanna)\n${shareUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Dedicated Instagram Story / Direct Share Handler
  const handleInstagramShare = async () => {
    const shareText = `${shareTitle}\n\nMLA Sri Gandra Satyanarayana Rao (Sathanna)\nOfficial Portal: ${shareUrl}`;

    // Native Web Share API if supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopyFeedback(
        isTelugu
          ? 'లింక్ కాపీ చేయబడింది! మీ Instagram Story లో లింక్ స్టిక్కర్‌ను అతికించండి.'
          : 'Link & headline copied! Paste directly into your Instagram Story link sticker.'
      );
      setInstagramNotice(true);
      setTimeout(() => {
        setCopyFeedback('');
        setInstagramNotice(false);
      }, 5000);
    } catch (err) {
      setCopyFeedback(shareUrl);
      setTimeout(() => setCopyFeedback(''), 4000);
    }
  };

  return (
    <section
      className="latest-updates-section"
      id="latest-updates"
      aria-label="New Updates and Field Dispatches"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container">
        <div className="latest-updates-canvas">
          {/* Header Row with Minimal Counter and Step Controls (No 3s loop badge text) */}
          <div className="new-updates-section-header-row">
            <div>
              <div className="tag-label green">
                {isTelugu ? 'తాజా సమాచారం · NEW UPDATES' : 'NEW UPDATES'}
              </div>
              <h2 className="section-title" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                {isTelugu ? 'నియోజకవర్గ తాజా సమాచారం' : 'New Updates & Field Dispatches'}
              </h2>
            </div>

            {/* Horizontal Step Controls */}
            <div className="updates-loop-controls">
              <div className="updates-timer-badge">
                <span className="timer-badge-text">
                  0{activeUpdateIdx + 1} / 0{updates.length}
                </span>
              </div>

              <div className="updates-nav-btn-group">
                <button
                  type="button"
                  className="updates-nav-arrow-btn"
                  onClick={handlePrevUpdate}
                  aria-label="Previous Update"
                  title="Previous Update"
                >
                  &#10094;
                </button>
                <button
                  type="button"
                  className="updates-nav-arrow-btn"
                  onClick={handleNextUpdate}
                  aria-label="Next Update"
                  title="Next Update"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Horizontal Selection Strip with Loop Progress Line */}
          <div className="updates-horizontal-track-wrap">
            <div className="updates-horizontal-track" ref={trackRef}>
              {updates.map((item, idx) => {
                const isActive = activeUpdateIdx === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`updates-track-card ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectUpdate(idx)}
                    aria-label={`Update 0${idx + 1}: ${isTelugu ? item.titleTe : item.titleEn}`}
                  >
                    <div className="track-card-thumb">
                      <img src={resolveMediaUrl(item.mainImage)} alt="" />
                      <span className="track-card-idx">0{idx + 1}</span>
                    </div>

                    <div className="track-card-meta">
                      <span className="track-card-date">
                        {isTelugu ? item.dateFormattedTe : item.dateFormattedEn}
                      </span>
                      <h4 className="track-card-title">
                        {isTelugu ? item.titleTe : item.titleEn}
                      </h4>
                    </div>

                    {/* Progress Bar (Visual indicator of active update) */}
                    {isActive && isAutoPlaying && (
                      <div className="track-card-progress-bar" aria-hidden="true">
                        <div className="progress-fill" key={`progress-${activeUpdateIdx}`}></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Active Update Stage: Mobile has Photos FIRST (order: -1), Matter SECOND */}
          <div className="latest-updates-grid-reordered" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {/* Visual Photo Deck Column (Appears FIRST on Mobile) */}
            <div className="latest-photos-column">
              <div className="latest-deck-container">
                <div
                  className="latest-deck-main-card"
                  onClick={() => openLightbox(activePhotoSubIdx)}
                  role="button"
                  tabIndex={0}
                  aria-label="Click to view full photo in lightbox"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(activePhotoSubIdx);
                    }
                  }}
                >
                  <img
                    src={resolveMediaUrl(currentPhoto.url)}
                    alt={isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                    className="latest-deck-img"
                    loading="lazy"
                  />
                  <div className="latest-deck-overlay"></div>

                  {/* Top Overlay Badge */}
                  <div className="latest-deck-badge-bar">
                    <span className="latest-deck-photo-count">
                      0{activeUpdateIdx + 1} / 0{updates.length} · {isTelugu ? currentUpdate.locationTe : currentUpdate.locationEn}
                    </span>
                    <span className="latest-deck-hint">
                      {isTelugu ? 'ఫోటో చూడండి' : 'Click to View Photo'}
                    </span>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="latest-deck-bottom-caption">
                    <p className="latest-deck-caption-text">
                      {isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                    </p>
                  </div>
                </div>

                {/* Multiple Photo Thumbnails if current dispatch has > 1 photo */}
                {photosList.length > 1 && (
                  <div className="latest-sub-thumbnails-row">
                    {photosList.map((ph, pIdx) => (
                      <button
                        key={ph.id || pIdx}
                        type="button"
                        className={`sub-thumb-chip ${activePhotoSubIdx === pIdx ? 'active' : ''}`}
                        onClick={() => setActivePhotoSubIdx(pIdx)}
                        aria-label={`Photo 0${pIdx + 1}`}
                      >
                        <img src={resolveMediaUrl(ph.url)} alt="" />
                        <span className="sub-thumb-idx">0{pIdx + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Matter & News Column (Appears BELOW Photo Deck on Mobile) */}
            <div className="latest-matter-column">
              {/* Meta Date & Press Label Bar */}
              <div className="latest-meta-header-bar">
                <div className="latest-pulse-badge">
                  <span className="live-pulse-dot" aria-hidden="true"></span>
                  <span className="latest-badge-tag">
                    {isTelugu ? 'నియోజకవర్గ సమాచారం' : 'Field Dispatch'}
                  </span>
                  <span className="latest-badge-sep">•</span>
                  <span className="latest-badge-date">
                    {isTelugu ? currentUpdate.dateFormattedTe : currentUpdate.dateFormattedEn}
                  </span>
                </div>

                <div className="latest-press-chip">
                  {isTelugu ? currentUpdate.pressNoteLabelTe : currentUpdate.pressNoteLabelEn}
                </div>
              </div>

              {/* Headline */}
              <h3 className="latest-headline-title">
                {isTelugu ? currentUpdate.titleTe : currentUpdate.titleEn}
              </h3>

              {/* Lead Paragraph */}
              <p className="latest-lead-paragraph">
                {isTelugu ? currentUpdate.leadTe : currentUpdate.leadEn}
              </p>

              {/* Detailed News Paragraphs */}
              <div className="latest-body-paragraphs">
                {(isTelugu ? currentUpdate.bodyTe : currentUpdate.bodyEn).map((para, i) => (
                  <p key={i} className="latest-paragraph">
                    {para}
                  </p>
                ))}
              </div>

              {/* Dedicated Share Bar with Direct Instagram Copy Option */}
              <div className="latest-share-container">
                <div className="latest-share-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>{isTelugu ? 'ఈ వార్తను పంచుకోండి:' : 'Share this update:'}</span>
                </div>

                <div className="latest-share-actions">
                  <button
                    type="button"
                    className="share-btn share-whatsapp"
                    onClick={handleWhatsAppShare}
                    aria-label="Share on WhatsApp Status & Chat"
                    title="Share on WhatsApp"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.06c-1.49 0-2.94-.4-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.03 8.03 0 0 1-1.23-4.29c0-4.43 3.61-8.05 8.05-8.05 2.15 0 4.17.84 5.69 2.36a8.01 8.01 0 0 1 2.36 5.69c0 4.44-3.62 8.05-8.07 8.05zm4.41-6.03c-.24-.12-1.43-.71-1.65-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42h-.48c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    className="share-btn share-facebook"
                    onClick={handleFacebookShare}
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    className="share-btn share-story"
                    onClick={handleInstagramShare}
                    aria-label="Copy Link for Instagram Story & Direct"
                    title="Share to Instagram Story / Direct"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>{isTelugu ? 'ఇన్‌స్టా స్టోరీ / లింక్' : 'Insta Story / Copy'}</span>
                  </button>
                </div>

                {copyFeedback && (
                  <div className="share-feedback-toast" role="status">
                    <span>{copyFeedback}</span>
                    {instagramNotice && (
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-toast-action"
                      >
                        {isTelugu ? 'ఇన్‌స్టాగ్రామ్ తెరవండి →' : 'Open Instagram →'}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Scroll Modal / Lightbox */}
      {modalOpen && (
        <div
          className="latest-lightbox-modal active"
          role="dialog"
          aria-modal="true"
          aria-label="Horizontal Photo Viewer"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Control Bar */}
          <div className="latest-modal-top-bar" onClick={(e) => e.stopPropagation()}>
            <div className="latest-modal-counter">
              <span className="modal-num-active">0{activePhotoSubIdx + 1}</span>
              <span className="modal-sep">/</span>
              <span className="modal-num-total">0{photosList.length}</span>
              <span className="modal-sep">•</span>
              <span className="modal-photo-headline">
                {isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
              </span>
            </div>

            <button
              type="button"
              className="latest-modal-close-btn"
              onClick={closeLightbox}
              aria-label="Close Lightbox (Esc)"
              title="Close"
            >
              &times;
            </button>
          </div>

          {/* Main Slide Stage with Horizontal Arrow Triggers */}
          <div className="latest-modal-stage" onClick={(e) => e.stopPropagation()}>
            {photosList.length > 1 && (
              <button
                type="button"
                className="latest-modal-arrow-btn prev"
                onClick={handlePrevPhoto}
                aria-label="Previous Photo"
                title="Previous Photo"
              >
                &#10094;
              </button>
            )}

            <div className="latest-modal-viewport">
              <div className="latest-modal-slide">
                <img
                  src={resolveMediaUrl(currentPhoto.url)}
                  alt={isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                  className="latest-modal-img"
                />
              </div>

              <div className="latest-modal-caption-card">
                <h3 className="modal-caption-heading">
                  {isTelugu ? currentPhoto.titleTe : currentPhoto.titleEn}
                </h3>
                <p className="modal-caption-text">
                  {isTelugu ? currentPhoto.captionTe : currentPhoto.captionEn}
                </p>
              </div>
            </div>

            {photosList.length > 1 && (
              <button
                type="button"
                className="latest-modal-arrow-btn next"
                onClick={handleNextPhoto}
                aria-label="Next Photo"
                title="Next Photo"
              >
                &#10095;
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Navigation Strip */}
          {photosList.length > 1 && (
            <div className="latest-modal-bottom-strip" onClick={(e) => e.stopPropagation()}>
              {photosList.map((ph, idx) => (
                <div
                  key={ph.id || idx}
                  className={`latest-modal-thumb ${activePhotoSubIdx === idx ? 'active' : ''}`}
                  onClick={() => setActivePhotoSubIdx(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img src={resolveMediaUrl(ph.url)} alt="" />
                  <span className="modal-thumb-num">0{idx + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
