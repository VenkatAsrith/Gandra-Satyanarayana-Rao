import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import '../../styles/latest-updates.css';

// Verified Field Dispatches & Official Constituency Updates with Multi-Photo Records
export const LATEST_UPDATE_RECORDS = [
  {
    id: 'update-buguloni-jatara-2026-11-24',
    categoryKey: 'field_visits',
    date: '2026-11-24',
    dateFormattedEn: '24 November 2026',
    dateFormattedTe: '24 నవంబర్ 2026',
    pressNoteLabelEn: 'Buguloni Venkateswara Swamy Jatara',
    pressNoteLabelTe: 'బుగులోని వేంకటేశ్వర స్వామి జాతర',
    locationEn: 'Buguloni Hill Shrine, Bhupalpalle',
    locationTe: 'బుగులోని గుట్ట, భూపాలపల్లి',
    categoryEn: 'Cultural & Field Visits',
    categoryTe: 'క్షేత్ర పర్యటన & ఆధ్యాత్మిక దర్శనం',
    titleEn: 'MLA Sri Gandra Satyanarayana Rao and Spouse Offer Prayers to Sri Venkateswara Swamy at Buguloni Jatara',
    titleTe: 'బుగులోని జాతరలో శ్రీ వేంకటేశ్వర స్వామివారిని దర్శించుకున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు దంపతులు',
    leadEn:
      'Hon’ble Bhupalpalle MLA Sri Gandra Satyanarayana Rao along with his wife visited the revered hilltop shrine of Sri Sri Venkateswara Swamy during the auspicious Buguloni Jatara. Performing special pujas and receiving theertha prasadam, they prayed for the eternal prosperity, peace, happiness, good health, and bountiful agricultural harvest for every family across Bhupalpalle constituency.',
    leadTe:
      'బుగులోని జాతరలో కొండపై కొలువుదీరిన శ్రీ శ్రీ వేంకటేశ్వర స్వామివారిని భూపాలపల్లి శాసనసభ్యులు శ్రీ గండ్ర సత్యనారాయణ రావు గారు తన సతీమణితో కలిసి దర్శించుకున్నారు. ఈ సందర్భంగా స్వామివారికి ప్రత్యేక పూజలు నిర్వహించి, తీర్థప్రసాదాలు స్వీకరించారు. భూపాలపల్లి నియోజకవర్గ ప్రజలందరూ సుఖసంతోషాలతో, ఆయురారోగ్యాలతో, పాడిపంటలతో సుభిక్షంగా ఉండాలని స్వామివారిని ప్రార్థించారు.',
    mainImage: '/images/updates/buguloni-venkateswara-jatara-1.jpg',
    photos: [
      {
        id: 'bug-1',
        url: '/images/updates/buguloni-venkateswara-jatara-1.jpg',
        titleEn: 'MLA Sri Gandra Satyanarayana Rao & Spouse Performing Special Pujas at Buguloni Jatara',
        titleTe: 'బుగులోని జాతరలో శ్రీ వేంకటేశ్వర స్వామివారికి ప్రత్యేక పూజలు నిర్వహిస్తున్న ఎమ్మెల్యే దంపతులు',
        captionEn: 'MLA Sri Gandra Satyanarayana Rao and his wife offering prayers at the sanctum sanctorum on the Buguloni hill.',
        captionTe: 'కొండపై కొలువుదీరిన స్వామివారికి భక్తిశ్రద్ధలతో ప్రత్యేక పూజలు నిర్వహిస్తున్న ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు దంపతులు.'
      },
      {
        id: 'bug-2',
        url: '/images/updates/buguloni-venkateswara-jatara-2.jpg',
        titleEn: 'Receiving Sacred Theertha Prasadam from Temple Priests',
        titleTe: 'వేద పండితుల ఆశీర్వచనాలు, తీర్థప్రసాదాల స్వీకరణ',
        captionEn: 'Temple archakas blessing the MLA couple with Vedic hymns and sacred prasadam.',
        captionTe: 'పూజా కార్యక్రమాల అనంతరం ఆలయ పూజారుల నుంచి ఆశీర్వచనాలు, తీర్థప్రసాదాలు స్వీకరిస్తున్న దృశ్యం.'
      },
      {
        id: 'bug-3',
        url: '/images/updates/buguloni-venkateswara-jatara-3.jpg',
        titleEn: 'Blessings for Agricultural Bounty, Peace & Welfare of Bhupalpalle',
        titleTe: 'నియోజకవర్గ ప్రజల ఆయురారోగ్యాలు, పాడిపంటల సుభిక్షం కోసం ప్రార్థన',
        captionEn: 'Praying for good rains, flourishing crops, and health & happiness for all constituents.',
        captionTe: 'భూపాలపల్లి నియోజకవర్గ ప్రజలందరూ సుఖసంతోషాలతో, ఆయురారోగ్యాలతో, పాడిపంటలతో సుభిక్షంగా ఉండాలని ప్రార్థన.'
      }
    ]
  },
  {
    id: 'update-chelpur-indiramma-insurance-2026-11-20',
    categoryKey: 'welfare',
    date: '2026-11-20',
    dateFormattedEn: '20 November 2026',
    dateFormattedTe: '20 నవంబర్ 2026',
    pressNoteLabelEn: 'Indiramma Family Life Insurance',
    pressNoteLabelTe: 'ఇందిరమ్మ కుటుంబ జీవిత బీమా',
    locationEn: 'Chelpur Gram Panchayat, Ghanapur (M) Mandal',
    locationTe: 'చెల్పూర్ గ్రామపంచాయతీ, ఘనపురం మండలం',
    categoryEn: 'Public Welfare',
    categoryTe: 'ప్రజా సంక్షేమం',
    titleEn: '₹5 Lakh Financial Security for Every Underprivileged Family Through Indiramma Life Insurance – MLA Sri Gandra Satyanarayana Rao',
    titleTe: 'ఇందిరమ్మ కుటుంబ జీవిత బీమాతో ప్రతి పేద కుటుంబానికి ₹5 లక్షల ఆర్థిక భరోసా – ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు',
    leadEn:
      'In Chelpur Gram Panchayat of Ghanapur (M) Mandal, Bhupalpalle MLA Sri Gandra Satyanarayana Rao alongside District Collector Sri Rahul Sharma inspected the online registration process for Indiramma Family Life Insurance applications.',
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని ఘనపూర్ మండలం చెల్పూర్ గ్రామపంచాయతీ ఆవరణలో నిర్వహించిన ఇందిరమ్మ కుటుంబ జీవిత బీమా పథకం దరఖాస్తుల ఆన్‌లైన్ నమోదు ప్రక్రియను భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు, జిల్లా కలెక్టర్ శ్రీ రాహుల్ శర్మ గారితో కలిసి పరిశీలించారు.',
    mainImage: '/images/updates/chelpur-indiramma-insurance-1.jpg',
    photos: [
      {
        id: 'chel-1',
        url: '/images/updates/chelpur-indiramma-insurance-1.jpg',
        titleEn: 'MLA Sathanna & Collector Rahul Sharma Inspecting Registration Counter',
        titleTe: 'కలెక్టర్ రాహుల్ శర్మతో కలిసి ఆన్‌లైన్ నమోదు ప్రక్రియను పరిశీలిస్తున్న ఎమ్మెల్యే సాతన్న',
        captionEn: 'Reviewing application forms, eligibility requirements, and portal entry steps with mandal officials.',
        captionTe: 'అధికారులను అడిగి ఆన్‌లైన్ దరఖాస్తు నమోదు విధానం, అర్హతలు, అవసరమైన పత్రాల ప్రక్రియను తెలుసుకున్న ఎమ్మెల్యే గారు.'
      },
      {
        id: 'chel-2',
        url: '/images/updates/chelpur-indiramma-insurance-2.jpg',
        titleEn: 'Assessing Online Enrolment Progress at Chelpur Gram Panchayat',
        titleTe: 'చెల్పూర్ గ్రామపంచాయతీలో దరఖాస్తు నమోదు సరళి పరిశీలన',
        captionEn: 'Verifying that every eligible family receives immediate registration support.',
        captionTe: 'లబ్ధిదారుల వివరాల నమోదులో ఎలాంటి లోటుపాట్లు లేకుండా సజావుగా పూర్తి చేయాలని అధికారులకు సూచన.'
      },
      {
        id: 'chel-3',
        url: '/images/updates/chelpur-indiramma-insurance-3.jpg',
        titleEn: 'Interacting with Rural Women and Scheme Applicants',
        titleTe: 'మహిళలు, గ్రామస్తులతో ముఖాముఖి సంభాషిస్తున్న ఎమ్మెల్యే సాతన్న',
        captionEn: 'Explaining how ₹5 lakh life cover shields families from financial ruin if breadwinner passes away.',
        captionTe: 'కుటుంబ పెద్ద లేదా సంపాదించే వ్యక్తి మరణిస్తే కుటుంబం రోడ్డున పడకుండా ₹5 లక్షల ఆర్థిక భరోసా కల్పిస్తుందని వివరణ.'
      },
      {
        id: 'chel-4',
        url: '/images/updates/chelpur-indiramma-insurance-4.jpg',
        titleEn: 'Guiding Citizens on Document Submission and Free Enrollment',
        titleTe: 'లబ్ధిదారులకు పథకం ప్రయోజనాలు వివరిస్తున్న ప్రజాప్రతినిధులు',
        captionEn: 'Stressing that the Indiramma scheme serves as a protective armor for poor and vulnerable classes.',
        captionTe: 'ఈ పథకం నిరుపేద, బడుగు, బలహీన వర్గాల కుటుంబాలకు ఒక రక్షణ కవచంలా పనిచేస్తుందని ఎమ్మెల్యే పేర్కొన్నారు.'
      },
      {
        id: 'chel-5',
        url: '/images/updates/chelpur-indiramma-insurance-5.jpg',
        titleEn: 'Addressing the Gathering at Chelpur Gram Panchayat',
        titleTe: 'చెల్పూర్‌లో ప్రజాప్రతినిధులు, ప్రజలను ఉద్దేశించి ప్రసంగం',
        captionEn: 'Calling upon every eligible household across Ghanapur Mandal to complete online registration.',
        captionTe: 'ప్రభుత్వం ప్రవేశపెట్టిన ఈ గొప్ప సంక్షేమ పథకాన్ని ప్రజలందరూ సద్వినియోగం చేసుకోవాలని ఎమ్మెల్యే గారి పిలుపు.'
      }
    ]
  },
  {
    id: 'update-chityal-cheyutha-2026-11-14',
    categoryKey: 'welfare',
    date: '2026-11-14',
    dateFormattedEn: '14 November 2026',
    dateFormattedTe: '14 నవంబర్ 2026',
    pressNoteLabelEn: 'Cheyutha Pensions & CMRF Relief',
    pressNoteLabelTe: 'చేయూత పింఛన్లు & సీఎంఆర్ఎఫ్ సహాయం',
    locationEn: 'Chityal Mandal',
    locationTe: 'చిట్యాల మండలం',
    categoryEn: 'Public Welfare',
    categoryTe: 'ప్రజా సంక్షేమం',
    titleEn: "Delivering Welfare Schemes to Every Eligible Household is the Mission of People's Government: MLA Sri Gandra Satyanarayana Rao",
    titleTe: 'అర్హులైన ప్రతి ఒక్కరికీ సంక్షేమ పథకాలు అందించడమే ప్రజా ప్రభుత్వ లక్ష్యం: ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు',
    leadEn:
      "A grand distribution ceremony for newly sanctioned Cheyutha pensions and Chief Minister's Relief Fund (CMRF) cheques was organized in Chityal Mandal of Bhupalpalle constituency. Hon'ble MLA Sri Gandra Satyanarayana Rao handed over new Cheyutha pension sanction orders to 533 eligible beneficiaries, alongside distributing financial assistance cheques worth ₹14,33,450 to 47 beneficiaries through CMRF.",
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని చిట్యాల మండలంలో నూతన చేయూత పింఛన్ ఉత్తర్వుల పంపిణీ కార్యక్రమాన్ని నిర్వహించారు. ఈ కార్యక్రమంలో 533 మంది లబ్ధిదారులకు నూతన చేయూత పింఛన్ ఉత్తర్వులను భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు అందజేశారు. అదేవిధంగా ముఖ్యమంత్రి సహాయనిధి (CMRF) ద్వారా 47 మంది లబ్ధిదారులకు రూ.14,33,450 విలువైన చెక్కులను పంపిణీ చేశారు.',
    mainImage: '/images/updates/chityal-cheyutha-pension-1.jpg',
    photos: [
      {
        id: 'chit-chey-1',
        url: '/images/updates/chityal-cheyutha-pension-1.jpg',
        titleEn: 'Handing Over New Cheyutha Pension Sanction Orders to Disabled Child & Family',
        titleTe: 'దివ్యాంగుల కుటుంబానికి నూతన చేయూత పింఛను ఉత్తర్వు అందజేస్తున్న ఎమ్మెల్యే సాతన్న',
        captionEn: 'MLA Sri Gandra Satyanarayana Rao handing over Cheyutha order to beneficiary family in Chityal.',
        captionTe: 'చిట్యాల మండలంలో దివ్యాంగ బాలుడి కుటుంబానికి చేయూత పింఛన్ మంజూరు పత్రం అందజేస్తున్న ఎమ్మెల్యే.'
      },
      {
        id: 'chit-chey-2',
        url: '/images/updates/chityal-cheyutha-cmrf-cheque.jpg',
        titleEn: 'Distribution of CMRF Relief Cheques Worth ₹14.33 Lakh to 47 Beneficiaries',
        titleTe: '47 మందికి రూ.14.33 లక్షల సీఎం సహాయనిధి (CMRF) చెక్కుల పంపిణీ',
        captionEn: 'Handing over medical assistance cheques under Chief Minister\'s Relief Fund.',
        captionTe: 'వైద్య ఖర్చుల నిమిత్తం మంజూరైన ముఖ్యమంత్రి సహాయనిధి చెక్కులను లబ్ధిదారులకు అందజేస్తున్న దృశ్యం.'
      },
      {
        id: 'chit-chey-3',
        url: '/images/updates/chityal-cheyutha-gathering.jpg',
        titleEn: 'Addressing the Massive Beneficiary Gathering in Chityal Mandal',
        titleTe: 'చిట్యాల మండలంలో 533 మంది లబ్ధిదారుల భారీ సభను ఉద్దేశించి ప్రసంగం',
        captionEn: 'Affirming uncompromising commitment to rural welfare and grassroots governance.',
        captionTe: 'నిరుపేదలు, వృద్ధులు, దివ్యాంగులకు భరోసా కల్పించడమే ప్రజా ప్రభుత్వ లక్ష్యమని పేర్కొన్న ఎమ్మెల్యే.'
      },
      {
        id: 'chit-chey-4',
        url: '/images/updates/chityal-cheyutha-beneficiaries.jpg',
        titleEn: 'Felicitation and Group Photograph with Women Beneficiaries',
        titleTe: 'మహిళా లబ్ధిదారులతో సామూహిక ఛాయాచిత్రం',
        captionEn: 'Women beneficiaries expressing appreciation for timely welfare delivery.',
        captionTe: 'చేయూత పింఛన్లు పొందిన మహిళలతో కలిసి ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు.'
      },
      {
        id: 'chit-chey-5',
        url: '/images/updates/chityal-cheyutha-orders.jpg',
        titleEn: 'Direct Handover of Sanction Orders to Rural Beneficiaries',
        titleTe: 'లబ్ధిదారులకు నేరుగా పింఛన్ మంజూరు పత్రాల అందజేత',
        captionEn: 'Ensuring transparent, doorstep reach of social security entitlements.',
        captionTe: 'అర్హులైన ప్రతి ఒక్కరికీ సంక్షేమ పథకాలు పారదర్శకంగా అందజేస్తున్న ప్రజాప్రతినిధులు.'
      }
    ]
  },
  {
    id: 'update-mogullapalle-paddy-2026-11-11',
    categoryKey: 'irrigation',
    date: '2026-11-11',
    dateFormattedEn: '11 November 2026',
    dateFormattedTe: '11 నవంబర్ 2026',
    pressNoteLabelEn: 'Paddy Procurement Inauguration',
    pressNoteLabelTe: 'ధాన్యం కొనుగోలు కేంద్రాల ప్రారంభం',
    locationEn: 'Mogullapalle Mandal (Motlapalli, Issipeta)',
    locationTe: 'మొగుళ్లపల్లి మండలం (మోట్లపల్లి, ఇస్సిపేట)',
    categoryEn: 'Irrigation & Agriculture',
    categoryTe: 'సాగునీరు & వ్యవసాయం',
    titleEn: 'Inauguration of Paddy Procurement Centers across Mogullapalle Mandal – MLA Sri Gandra Satyanarayana Rao',
    titleTe: 'మొగుళ్లపల్లి మండలంలో పలు గ్రామాల్లో వరి కొనుగోలు కేంద్రాలను ప్రారంభించిన ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు గారు',
    leadEn:
      'Bhupalpalle MLA Sri Gandra Satyanarayana Rao inaugurated newly established paddy procurement centers across Motlapalli, Mogullapalle, Issipeta, and adjoining villages in Mogullapalle Mandal.',
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని మొగుళ్లపల్లి మండలంలో మోట్లపల్లి, మొగుళ్లపల్లి, ఇస్సిపేట, తదితర గ్రామాల్లో ఏర్పాటు చేసిన వరి కొనుగోలు కేంద్రాలను భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు ప్రారంభించారు.',
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
    categoryKey: 'field_visits',
    date: '2026-11-11',
    dateFormattedEn: '11 November 2026',
    dateFormattedTe: '11 నవంబర్ 2026',
    pressNoteLabelEn: 'Infrastructure Foundation & Paddy Centers',
    pressNoteLabelTe: 'అభివృద్ధి పనుల శంకుస్థాపన & ధాన్యం కేంద్రాలు',
    locationEn: 'Tekumatla Mandal',
    locationTe: 'టేకుమట్ల మండలం',
    categoryEn: 'Field Visits & Civic Works',
    categoryTe: 'క్షేత్ర పర్యటన & అభివృద్ధి',
    titleEn: "Special Priority for Tekumatla Mandal Development – Farmer Welfare is Government's Goal: MLA Gandra Satyanarayana Rao",
    titleTe: 'టేకుమట్ల మండల అభివృద్ధికి ప్రత్యేక ప్రాధాన్యత – రైతుల సంక్షేమమే ప్రజా ప్రభుత్వ ధ్యేయం: ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు',
    leadEn:
      'In Tekumatla Mandal of Bhupalpalle constituency, MLA Sri Gandra Satyanarayana Rao laid foundation stones for civic infrastructure works alongside inaugurating multiple paddy procurement centers across rural habitations.',
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని టేకుమట్ల మండలంలో ఈరోజు భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు పలు గ్రామాల్లో అభివృద్ధి పనులకు శంకుస్థాపనలు చేయడంతో పాటు వరి కొనుగోలు కేంద్రాలను ప్రారంభించారు.',
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
    categoryKey: 'public_meetings',
    date: '2026-11-06',
    dateFormattedEn: '06 November 2026',
    dateFormattedTe: '06 నవంబర్ 2026',
    pressNoteLabelEn: 'Welfare Cheque Handover',
    pressNoteLabelTe: 'సంక్షేమ చెక్కుల పంపిణీ',
    locationEn: 'Gorukothapalli Mandal',
    locationTe: 'గోరుకొత్తపల్లి మండలం',
    categoryEn: 'Public Meetings & Welfare',
    categoryTe: 'ప్రజా సభ & సంక్షేమం',
    titleEn: 'Distribution of Kalyana Lakshmi & Shaadi Mubarak Cheques in Gorukothapalli Mandal – MLA Sri Gandra Satyanarayana Rao',
    titleTe: 'గోరుకొత్తపల్లి మండలంలో కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కుల పంపిణీ చేసిన - ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు',
    leadEn:
      'Bhupalpalle MLA Sri Gandra Satyanarayana Rao attended as Chief Guest at the Kalyana Lakshmi and Shaadi Mubarak cheque distribution ceremony held in Gorukothapalli Mandal, handing financial relief to 21 families.',
    leadTe:
      'భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు గోరుకొత్తపల్లి మండలంలో నిర్వహించిన కళ్యాణలక్ష్మి, షాదీ ముబారక్ చెక్కుల పంపిణీ కార్యక్రమానికి ముఖ్య అతిథిగా హాజరై 21 మంది లబ్ధిదారులకు చెక్కులను స్వయంగా పంపిణీ చేశారు.',
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
    categoryKey: 'development',
    date: '2026-11-03',
    dateFormattedEn: '03 November 2026',
    dateFormattedTe: '03 నవంబర్ 2026',
    pressNoteLabelEn: 'Foundation Stone Unveiling',
    pressNoteLabelTe: 'అభివృద్ధి పనుల శంకుస్థాపన',
    locationEn: 'Chityal Mandal',
    locationTe: 'చిట్యాల మండలం',
    categoryEn: 'Development Works',
    categoryTe: 'గ్రామీణాభివృద్ధి',
    titleEn: 'Foundation Stone Laid for ₹2.14 Crore Development Works in Chityal Mandal – MLA Gandra Satyanarayana Rao',
    titleTe: 'రూ.2.14 కోట్లతో చిట్యాల మండలంలో అభివృద్ధి పనులకు శంకుస్థాపనలు చేసిన – ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు',
    leadEn:
      'Bhupalpalle MLA Sri Gandra Satyanarayana Rao laid foundation stones for multiple developmental works sanctioned at an estimated cost of ₹2.14 Crore across Chityal Mandal, including women self-help buildings and Anganwadi centers.',
    leadTe:
      'భూపాలపల్లి నియోజకవర్గంలోని చిట్యాల మండలంలో సుమారు రూ.2.14 కోట్ల వ్యయంతో చేపట్టనున్న పలు అభివృద్ధి పనులకు (మహిళా సంఘ భవనాలు, అంగన్వాడీ కేంద్రాలు, జీపీ భవనాలు) భూపాలపల్లి ఎమ్మెల్యే శ్రీ గండ్ర సత్యనారాయణ రావు గారు శంకుస్థాపనలు చేశారు.',
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

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Active story and photo selection
  const [activeStoryId, setActiveStoryId] = useState(LATEST_UPDATE_RECORDS[0].id);
  const [activePhotoSubIdx, setActivePhotoSubIdx] = useState(0);

  // Fullscreen photo viewer state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Loading / animation states
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAnimatingText, setIsAnimatingText] = useState(false);

  // Touch tracking for mobile swipe
  const touchStartX = useRef(0);
  const filmstripRef = useRef(null);
  const featuredArticleRef = useRef(null);
  const horizontalRailRef = useRef(null);

  // Categories configuration with localized titles
  const categories = useMemo(() => [
    { key: 'all', labelEn: 'All Updates', labelTe: 'అన్నీ (All)' },
    { key: 'field_visits', labelEn: 'Field Visits', labelTe: 'క్షేత్ర పర్యటనలు' },
    { key: 'development', labelEn: 'Development', labelTe: 'అభివృద్ధి పనులు' },
    { key: 'public_meetings', labelEn: 'Public Meetings', labelTe: 'ప్రజా సభలు' },
    { key: 'welfare', labelEn: 'Welfare', labelTe: 'ప్రజా సంక్షేమం' },
    { key: 'irrigation', labelEn: 'Irrigation', labelTe: 'సాగునీరు' }
  ], []);

  // Filtered stories based on current category
  const filteredStories = useMemo(() => {
    if (selectedCategory === 'all') return LATEST_UPDATE_RECORDS;
    return LATEST_UPDATE_RECORDS.filter((item) => item.categoryKey === selectedCategory);
  }, [selectedCategory]);

  // Resolve current active story with fallback
  const currentStory = useMemo(() => {
    const found = filteredStories.find((s) => s.id === activeStoryId);
    return found || filteredStories[0] || LATEST_UPDATE_RECORDS[0];
  }, [filteredStories, activeStoryId]);

  // All photos for current active story
  const storyPhotos = useMemo(() => {
    if (currentStory?.photos && currentStory.photos.length > 0) {
      return currentStory.photos;
    }
    return [
      {
        id: `${currentStory.id}-main`,
        url: currentStory.mainImage,
        titleEn: currentStory.titleEn,
        titleTe: currentStory.titleTe,
        captionEn: currentStory.leadEn,
        captionTe: currentStory.leadTe
      }
    ];
  }, [currentStory]);

  const currentPhoto = storyPhotos[activePhotoSubIdx] || storyPhotos[0];

  const scrollToFeaturedTop = () => {
    if (featuredArticleRef.current) {
      const rect = featuredArticleRef.current.getBoundingClientRect();
      const topPos = rect.top + window.scrollY - 82;
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
  };

  // Story selection handler with smooth transition and mobile auto-scroll to top
  const handleSelectStory = (storyId, cardElement) => {
    const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth <= 1024;

    if (storyId === activeStoryId) {
      if (isMobileOrTablet) {
        scrollToFeaturedTop();
      }
      return;
    }

    setIsAnimatingText(true);
    setIsImageLoaded(false);
    setActiveStoryId(storyId);
    setActivePhotoSubIdx(0);
    setTimeout(() => setIsAnimatingText(false), 380);

    // On mobile / tablet screens, smoothly scroll directly to the top stage
    if (isMobileOrTablet) {
      setTimeout(() => {
        scrollToFeaturedTop();
      }, 50);
    }

    // Also smoothly center the clicked card in the horizontal rail
    if (cardElement && typeof cardElement.scrollIntoView === 'function') {
      try {
        cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch (err) {}
    }
  };

  // Photo navigation within active story
  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    setIsImageLoaded(false);
    setActivePhotoSubIdx((prev) => (prev > 0 ? prev - 1 : storyPhotos.length - 1));
  };

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    setIsImageLoaded(false);
    setActivePhotoSubIdx((prev) => (prev < storyPhotos.length - 1 ? prev + 1 : 0));
  };

  // Open & Close full-screen lightbox
  const openLightbox = (photoIdx = 0) => {
    setActivePhotoSubIdx(photoIdx);
    setIsLightboxOpen(true);
    document.body.classList.add('menu-open');
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Lightbox keyboard navigation (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, storyPhotos.length]);

  // Touch swipe handlers for featured media
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextPhoto();
      else handlePrevPhoto();
    }
  };

  // Scroll filmstrip left/right
  const scrollFilmstrip = (direction) => {
    if (!filmstripRef.current) return;
    const scrollAmount = direction === 'left' ? -220 : 220;
    filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Social Sharing State & Handlers
  const [copyFeedback, setCopyFeedback] = useState('');
  const [instagramNotice, setInstagramNotice] = useState(false);

  const shareTitle = isTelugu ? currentStory.titleTe : currentStory.titleEn;
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#latest-updates`
    : 'https://gandrasatyanarayanarao.in/#latest-updates';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyFeedback(isTelugu ? 'లింక్ కాపీ చేయబడింది!' : 'Link copied to clipboard!');
      setInstagramNotice(false);
      setTimeout(() => setCopyFeedback(''), 3500);
    } catch {
      setCopyFeedback(shareUrl);
      setTimeout(() => setCopyFeedback(''), 4000);
    }
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppShare = () => {
    const text = `*${shareTitle}*\n\n${isTelugu ? currentStory.leadTe : currentStory.leadEn}\n\n🏛️ MLA Sri Gandra Satyanarayana Rao (Sathanna)\n${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramShare = async () => {
    const shareText = `${shareTitle}\n\nMLA Sri Gandra Satyanarayana Rao (Sathanna)\nOfficial Portal: ${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err) {
        // user cancelled or share failed, fallback
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText}\n\nOfficial Instagram: https://www.instagram.com/gandrasatyanarayanarao`);
      setCopyFeedback(
        isTelugu
          ? 'లింక్ & సమాచారం కాపీ చేయబడింది! మీ Instagram Story లేదా పోస్ట్‌లో అతికించండి.'
          : 'Headline & link copied! Paste directly into your Instagram Story link sticker.'
      );
      setInstagramNotice(true);
      setTimeout(() => {
        setCopyFeedback('');
        setInstagramNotice(false);
      }, 5000);
    } catch {
      window.open('https://www.instagram.com/gandrasatyanarayanarao', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      className={`latest-updates ${isTelugu ? 'is-telugu' : ''}`}
      id="latest-updates"
      aria-label="Latest Updates and Field Dispatches"
    >
      <div className="container">
        {/* ====================================================================
            01. REFINED EDITORIAL HEADER & CATEGORY NAVIGATION
            ==================================================================== */}
        <div className="updates-header-row">
          <div className="updates-header-content">
            <div className="updates-section-badge">
              {isTelugu ? 'తాజా సమాచారం & క్షేత్ర పర్యటనలు' : 'LATEST UPDATES'}
            </div>
            <h2 className="updates-main-title">
              {isTelugu ? 'నూతన అప్‌డేట్‌లు & క్షేత్రస్థాయి నివేదికలు' : 'New Updates & Field Dispatches'}
            </h2>
            <p className="updates-subtitle">
              {isTelugu
                ? 'భూపాలపల్లి నియోజకవర్గంలో తాజా అభివృద్ధి పనులు, ప్రజా సంక్షేమ కార్యక్రమాలు మరియు పర్యటనలు.'
                : 'On-ground activities, public engagements and development updates from Bhupalpalle.'}
            </p>
          </div>

          {/* Category Filter Rail */}
          <nav className="updates-filters-nav" aria-label="Updates Categories">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    // Reset to first matching story if current not in filtered
                    const matching = cat.key === 'all'
                      ? LATEST_UPDATE_RECORDS
                      : LATEST_UPDATE_RECORDS.filter((s) => s.categoryKey === cat.key);
                    if (matching.length > 0 && !matching.some((m) => m.id === activeStoryId)) {
                      handleSelectStory(matching[0].id);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  {isTelugu ? cat.labelTe : cat.labelEn}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ====================================================================
            02. TWO-COLUMN EDITORIAL COMPOSITION (FEATURED STORY + STORY LIST)
            ==================================================================== */}
        <div className="updates-editorial-grid">
          {/* LEFT: Featured Documentary Photograph & Editorial Overview */}
          <article
            ref={featuredArticleRef}
            className={`featured-story-card ${isAnimatingText ? 'story-transitioning' : ''}`}
            id="featured-story-stage"
          >
            <div
              className={`featured-media-canvas ${!isImageLoaded ? 'updates-skeleton' : ''}`}
              onClick={() => openLightbox(activePhotoSubIdx)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="button"
              tabIndex={0}
              aria-label="Click to enlarge event photograph"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openLightbox(activePhotoSubIdx);
              }}
            >
              <img
                src={currentPhoto.url}
                alt={isTelugu ? (currentPhoto.titleTe || currentStory.titleTe) : (currentPhoto.titleEn || currentStory.titleEn)}
                className="featured-image"
                loading="eager"
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  e.target.src = '/images/updates/chityal-development.jpg';
                  setIsImageLoaded(true);
                }}
              />
              <div className="featured-image-gradient" aria-hidden="true"></div>

              {/* Top Media Bar */}
              <div className="featured-media-topbar">
                <span className="featured-category-pill">
                  {isTelugu ? currentStory.categoryTe : currentStory.categoryEn}
                </span>

                {storyPhotos.length > 1 && (
                  <span className="featured-counter-pill">
                    {activePhotoSubIdx + 1} / {storyPhotos.length}
                  </span>
                )}
              </div>

              {/* Prev / Next Photo Buttons if Multiple Photos Exist */}
              {storyPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="media-nav-btn prev"
                    onClick={handlePrevPhoto}
                    aria-label="Previous photograph"
                    title="Previous Photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button
                    type="button"
                    className="media-nav-btn next"
                    onClick={handleNextPhoto}
                    aria-label="Next photograph"
                    title="Next Photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </>
              )}

              {/* Bottom Image Overlay Details */}
              <div className="featured-media-bottom-meta">
                <div className="featured-media-caption">
                  {isTelugu
                    ? (currentPhoto.captionTe || currentStory.leadTe)
                    : (currentPhoto.captionEn || currentStory.leadEn)}
                </div>

                <button
                  type="button"
                  className="view-photos-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(activePhotoSubIdx);
                  }}
                  aria-label="Open Full-Screen Photo Gallery"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>{isTelugu ? 'చిత్రమాలిక చూడండి' : 'View Photos'} ({storyPhotos.length})</span>
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="featured-article-body">
              <div className="featured-meta-row">
                <span className="featured-location">
                  {isTelugu ? currentStory.locationTe : currentStory.locationEn}
                </span>
                <span className="featured-meta-dot" aria-hidden="true"></span>
                <time dateTime={currentStory.date}>
                  {isTelugu ? currentStory.dateFormattedTe : currentStory.dateFormattedEn}
                </time>
              </div>

              <h3 className={`featured-headline ${isAnimatingText ? 'fade-in-text' : ''}`}>
                {isTelugu ? currentStory.titleTe : currentStory.titleEn}
              </h3>

              <p className="featured-lead-paragraph">
                {isTelugu ? currentStory.leadTe : currentStory.leadEn}
              </p>

              {/* Dedicated Social Share Bar */}
              <div className="updates-share-bar">
                <span className="share-bar-label">
                  {isTelugu ? 'ఈ వార్తను షేర్ చేయండి:' : 'Share update:'}
                </span>

                <div className="share-bar-actions">
                  <button
                    type="button"
                    className="share-btn whatsapp"
                    onClick={handleWhatsAppShare}
                    aria-label="Share on WhatsApp"
                    title="Share on WhatsApp"
                  >
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    className="share-btn facebook"
                    onClick={handleFacebookShare}
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                  >
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    className="share-btn instagram"
                    onClick={handleInstagramShare}
                    aria-label="Share or copy for Instagram Story / Post"
                    title="Share to Instagram"
                  >
                    <span>Instagram</span>
                  </button>

                  <button
                    type="button"
                    className="share-btn copylink"
                    onClick={handleCopyLink}
                    aria-label="Copy direct link to clipboard"
                    title="Copy Link"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{isTelugu ? 'లింక్ కాపీ' : 'Copy Link'}</span>
                  </button>
                </div>

                {copyFeedback && (
                  <div className="share-feedback-toast" role="status">
                    <span>{copyFeedback}</span>
                    {instagramNotice && (
                      <a
                        href="https://www.instagram.com/gandrasatyanarayanarao"
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

              <div className="featured-footer-actions">
                <span className="photos-counter-tag">
                  {isTelugu
                    ? `${storyPhotos.length} అధికారిక ఛాయాచిత్రాలు`
                    : `${storyPhotos.length} Official Photographs Documented`}
                </span>

                <button
                  type="button"
                  className="read-dispatch-btn"
                  onClick={() => openLightbox(0)}
                  aria-label="Read complete press release and photos"
                >
                  {isTelugu ? 'పూర్తి నివేదిక & చిత్రాలు' : 'Read Full Dispatch & Photos'} →
                </button>
              </div>
            </div>
          </article>

          {/* RIGHT (Desktop) / HORIZONTAL SWIPE RAIL (Mobile): Supporting Updates */}
          <aside
            className="supporting-stories-column"
            aria-label="Recent Updates List"
            ref={horizontalRailRef}
          >
            <div className="supporting-stories-mobile-header" aria-hidden="true">
              <span className="mobile-rail-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {isTelugu ? 'ఇతర తాజా సమాచారాలు (పక్కకు జరపండి)' : 'More Dispatches (Swipe Horizontal)'}
              </span>
              <span className="mobile-rail-indicator">
                {filteredStories.length} {isTelugu ? 'అంశాలు' : 'updates'}
              </span>
            </div>

            <div className="supporting-stories-track">
              {filteredStories.map((story) => {
                const isActive = story.id === currentStory.id;
                const photoCount = story.photos?.length || 1;

                return (
                  <div
                    key={story.id}
                    className={`supporting-story-card ${isActive ? 'is-active' : ''}`}
                    onClick={(e) => handleSelectStory(story.id, e.currentTarget)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSelectStory(story.id, e.currentTarget);
                    }}
                  >
                    <div className="story-thumb-wrap">
                      <img
                        src={story.mainImage}
                        alt={isTelugu ? story.titleTe : story.titleEn}
                        className="story-thumb-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/images/updates/chityal-development.jpg';
                        }}
                      />
                      {isActive && (
                        <div className="story-active-pill" aria-hidden="true">
                          {isTelugu ? 'ప్రస్తుత అంశం' : 'Active'}
                        </div>
                      )}
                    </div>

                    <div className="story-details-col">
                      <div className="story-badge-row">
                        <span className="story-mini-badge">
                          {isTelugu ? story.categoryTe : story.categoryEn}
                        </span>
                        <span className="story-meta-date">
                          {isTelugu ? story.dateFormattedTe : story.dateFormattedEn}
                        </span>
                      </div>

                      <h4 className="story-row-title">
                        {isTelugu ? story.titleTe : story.titleEn}
                      </h4>

                      <div className="story-location-tag">
                        <span>{isTelugu ? story.locationTe : story.locationEn}</span>
                        <span>·</span>
                        <span>{photoCount} {isTelugu ? 'ఫోటోలు' : 'photos'}</span>
                      </div>

                      <div className="story-mobile-tap-hint" aria-hidden="true">
                        {isActive
                          ? (isTelugu ? '● పైభాగంలో ఉంది' : '● In View on Top')
                          : (isTelugu ? 'పైకి తీసుకురండి ↑' : 'Tap to View on Top ↑')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        {/* ====================================================================
            03. BOTTOM: EVENT PHOTO FILMSTRIP
            ==================================================================== */}
        <div className="updates-filmstrip-section">
          <div className="filmstrip-header-row">
            <span className="filmstrip-title">
              {isTelugu ? 'డాక్యుమెంటరీ ఛాయాచిత్రాలు' : 'Event Photo Filmstrip'}
            </span>

            <div className="filmstrip-nav-arrows">
              <button
                type="button"
                className="filmstrip-arrow-btn"
                onClick={() => scrollFilmstrip('left')}
                aria-label="Scroll Filmstrip Left"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                type="button"
                className="filmstrip-arrow-btn"
                onClick={() => scrollFilmstrip('right')}
                aria-label="Scroll Filmstrip Right"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>

          <div className="filmstrip-scroll-track" ref={filmstripRef}>
            {/* Active Story's Photos First */}
            {storyPhotos.map((photo, pIdx) => {
              const isSelected = pIdx === activePhotoSubIdx;

              return (
                <div
                  key={photo.id || pIdx}
                  className={`filmstrip-item-tile ${isSelected ? 'is-active-photo' : ''}`}
                  onClick={() => openLightbox(pIdx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo ${pIdx + 1} of ${storyPhotos.length}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openLightbox(pIdx);
                  }}
                >
                  <img
                    src={photo.url}
                    alt={isTelugu ? (photo.titleTe || 'ఛాయాచిత్రం') : (photo.titleEn || 'Event Photo')}
                    loading="lazy"
                  />
                  <span className="filmstrip-photo-badge">
                    0{pIdx + 1}
                  </span>
                </div>
              );
            })}

            {/* Other Story Highlights in Filmstrip */}
            {filteredStories
              .filter((s) => s.id !== currentStory.id)
              .map((otherStory) => (
                <div
                  key={otherStory.id}
                  className="filmstrip-item-tile"
                  onClick={() => handleSelectStory(otherStory.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Switch to story: ${isTelugu ? otherStory.titleTe : otherStory.titleEn}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelectStory(otherStory.id);
                  }}
                >
                  <img
                    src={otherStory.mainImage}
                    alt={isTelugu ? otherStory.titleTe : otherStory.titleEn}
                    loading="lazy"
                  />
                  <span className="filmstrip-photo-badge">
                    {isTelugu ? otherStory.categoryTe : otherStory.categoryEn}
                  </span>
                </div>
              ))}

            {/* End Tile: View Full Gallery */}
            <Link to="/gallery" className="filmstrip-gallery-link-tile">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span>{isTelugu ? 'పూర్తి చిత్రమాలిక' : 'View Full Gallery'} →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
          04. ACCESSIBLE FULL-SCREEN EVENT PHOTO VIEWER (LIGHTBOX MODAL)
          ==================================================================== */}
      {isLightboxOpen && (
        <div
          className="updates-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Full-Screen Event Photo Viewer"
        >
          <div
            className="updates-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="updates-lightbox-header">
              <div className="updates-lightbox-headline-wrap">
                <div className="updates-lightbox-meta">
                  {isTelugu ? currentStory.categoryTe : currentStory.categoryEn} · {isTelugu ? currentStory.locationTe : currentStory.locationEn} · {isTelugu ? currentStory.dateFormattedTe : currentStory.dateFormattedEn}
                </div>
                <h3 className="updates-lightbox-title">
                  {isTelugu
                    ? (currentPhoto.titleTe || currentStory.titleTe)
                    : (currentPhoto.titleEn || currentStory.titleEn)}
                </h3>
              </div>

              <button
                type="button"
                className="updates-lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Lightbox Stage */}
            <div className="updates-lightbox-stage">
              <img
                src={currentPhoto.url}
                alt={isTelugu ? (currentPhoto.titleTe || currentStory.titleTe) : (currentPhoto.titleEn || currentStory.titleEn)}
                className="updates-lightbox-img"
              />

              {storyPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="lightbox-arrow-btn prev"
                    onClick={handlePrevPhoto}
                    aria-label="Previous photograph"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button
                    type="button"
                    className="lightbox-arrow-btn next"
                    onClick={handleNextPhoto}
                    aria-label="Next photograph"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="updates-lightbox-footer">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '75%' }}>
                <p className="updates-lightbox-caption">
                  {isTelugu
                    ? (currentPhoto.captionTe || currentStory.leadTe)
                    : (currentPhoto.captionEn || currentStory.leadEn)}
                </p>

                {/* Quick Share Icons in Modal */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '4px' }}>
                  <button
                    type="button"
                    className="share-btn whatsapp"
                    onClick={handleWhatsAppShare}
                    style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    className="share-btn facebook"
                    onClick={handleFacebookShare}
                    style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  >
                    Facebook
                  </button>
                  <button
                    type="button"
                    className="share-btn instagram"
                    onClick={handleInstagramShare}
                    style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  >
                    Instagram
                  </button>
                  <button
                    type="button"
                    className="share-btn copylink"
                    onClick={handleCopyLink}
                    style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  >
                    {isTelugu ? 'లింక్ కాపీ' : 'Copy Link'}
                  </button>
                </div>
              </div>

              <span className="updates-lightbox-counter">
                {activePhotoSubIdx + 1} / {storyPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
