import os
import shutil
import cv2
import json

source_dir = r"d:\SeptClaude2026\Gandra Satyanarayana Rao\Videoes and pics"
client_media = r"d:\SeptClaude2026\Gandra Satyanarayana Rao\client\public\media"
img_dir = os.path.join(client_media, "images")
vid_dir = os.path.join(client_media, "videos")
thumb_dir = os.path.join(client_media, "thumbnails")

for d in [img_dir, vid_dir, thumb_dir]:
    os.makedirs(d, exist_ok=True)

video_catalog = [
    {
        "id": "vid-agri-drone-launch",
        "orig": "WhatsApp Video 2026-10-29 at 8.18.30 PM.mp4",
        "slug": "agricultural-drone-launch",
        "title": "High-Tech Agricultural Spraying Drone Inauguration",
        "titleTe": "రైతులకు అత్యాధునిక వ్యవసాయ డ్రోన్ సాంకేతికత ప్రారంభోత్సవం",
        "category": "agriculture",
        "categoryLabel": "Agriculture & Innovation",
        "categoryLabelTe": "వ్యవసాయం & సాంకేతికత",
        "caption": "Inaugurating smart agricultural drone technology for crop spraying and modern farming support in Bhupalpalle constituency.",
        "captionTe": "భూపాలపల్లి నియోజకవర్గ రైతాంగం కోసం పంటలపై మందుల పిచికారీ చేసే అత్యాధునిక డ్రోన్ సేవలను రిబ్బన్ కట్ చేసి ప్రారంభించిన శాసనసభ్యులు సత్తెన్న.",
        "featured": True,
        "order": 1
    },
    {
        "id": "vid-mega-job-mela-inspection",
        "orig": "WhatsApp Video 2026-10-29 at 8.18.27 PM.mp4",
        "slug": "mega-job-mela-inspection",
        "title": "Bhupalpalle Mega Job Mela Stalls & Recruitment Inspection",
        "titleTe": "భూపాలపల్లి మెగా ఉద్యోగ మేళా స్టాళ్ల పరిశీలన & యువతతో మాటామంతీ",
        "category": "welfare",
        "categoryLabel": "Youth Employment & Welfare",
        "categoryLabelTe": "యువత ఉపాధి & సంక్షేమం",
        "caption": "Reviewing employment stalls and interviewing local youth and hiring companies during the constituency Mega Job Mela.",
        "captionTe": "నిరుద్యోగ యువతీ యువకులకు ప్రైవేట్, కార్పొరేట్ రంగాల్లో విస్తృత ఉద్యోగావకాశాలు కల్పిస్తూ నిర్వహించిన మెగా ఉద్యోగ మేళా స్టాళ్లను స్వయంగా పరిశీలించారు.",
        "featured": True,
        "order": 2
    },
    {
        "id": "vid-job-mela-recruiter-interaction",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.30 PM.mp4",
        "slug": "job-mela-recruiter-interaction",
        "title": "Coordination with Corporate Recruiters at Mega Job Drive",
        "titleTe": "మెగా జాబ్ మేళాలో కార్పొరేట్ ప్రతినిధులతో నియామకాల చర్చలు",
        "category": "welfare",
        "categoryLabel": "Youth Employment & Welfare",
        "categoryLabelTe": "యువత ఉపాధి & సంక్షేమం",
        "caption": "Discussing maximum recruitment quotas and fair remuneration packages for rural youth with leading employers.",
        "captionTe": "భూపాలపల్లి ప్రాంత గ్రామీణ నిరుద్యోగ యువతకు మెరుగైన వేతనాలతో స్థానికంగా ఉద్యోగాలు కల్పించాలని కంపెనీల హెచ్.ఆర్ ప్రతినిధులతో చర్చలు.",
        "featured": False,
        "order": 3
    },
    {
        "id": "vid-sahapankthi-bhojanam-students",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.57 PM.mp4",
        "slug": "sahapankthi-bhojanam-students",
        "title": "Sahapankthi Bhojanam with Government Residential Students",
        "titleTe": "ప్రభుత్వ గురుకుల పాఠశాల విద్యార్థులతో కలిసి సహపంక్తి భోజనం",
        "category": "education",
        "categoryLabel": "Education & Student Welfare",
        "categoryLabelTe": "విద్య & విద్యార్థుల సంక్షేమం",
        "caption": "Dining on the floor alongside students to personally inspect food quality, taste, and kitchen hygiene in government hostels.",
        "captionTe": "ప్రభుత్వ పాఠశాలల్లో నాణ్యమైన పోషకాహారం అందుతున్నదా లేదా అని తెలుసుకునేందుకు విద్యార్థులతో నేలపై కూర్చొని స్వయంగా భోజనం చేసిన సత్తెన్న.",
        "featured": True,
        "order": 4
    },
    {
        "id": "vid-school-midday-meal-inspection",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.57 PM (1).mp4",
        "slug": "school-midday-meal-inspection",
        "title": "Direct Midday Meal Inspection & Serving Fresh Nutrition",
        "titleTe": "మధ్యాహ్న భోజన పథకం పరిశీలన & చిన్నారులకు పాలు పంపిణీ",
        "category": "education",
        "categoryLabel": "Education & Student Welfare",
        "categoryLabelTe": "విద్య & విద్యార్థుల సంక్షేమం",
        "caption": "Inspecting the kitchen and serving wholesome milk and nutritious meals directly to primary students.",
        "captionTe": "పాఠశాల భోజన శాలలో పరిశుభ్రతను పరిశీలించి, బడి పిల్లలకు స్వయంగా గరిటతో పాలు, భోజనాన్ని వడ్డించి ప్రేమను చాటుకున్న శాసనసభ్యులు.",
        "featured": False,
        "order": 5
    },
    {
        "id": "vid-girls-high-school-inspiration",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.56 PM.mp4",
        "slug": "girls-high-school-inspiration",
        "title": "Inspiring Young Minds at Government Girls High School",
        "titleTe": "ప్రభుత్వ బాలికల ఉన్నత పాఠశాలలో విద్యార్థినులకు స్ఫూర్తిదాయక సందేశం",
        "category": "education",
        "categoryLabel": "Education & Student Welfare",
        "categoryLabelTe": "విద్య & విద్యార్థుల సంక్షేమం",
        "caption": "Encouraging girl students to aim for civil services, higher education, and leadership, promising upgraded campus facilities.",
        "captionTe": "బాలికల ఉన్నత విద్య, వసతుల కల్పనపై ప్రత్యేక శ్రద్ధ వహిస్తూ, భవిష్యత్ లక్ష్యాలపై విద్యార్థినులను మోటివేట్ చేస్తూ ప్రసంగం.",
        "featured": False,
        "order": 6
    },
    {
        "id": "vid-welfare-hostel-children-visit",
        "orig": "WhatsApp Video 2026-10-29 at 8.18.29 PM.mp4",
        "slug": "welfare-hostel-children-visit",
        "title": "Nutritional Distribution & Interaction with Welfare Hostel Kids",
        "titleTe": "సంక్షేమ హాస్టల్ చిన్నారులకు పోషకాహార పంపిణీ & ఆప్యాయ పలకరింపు",
        "category": "welfare",
        "categoryLabel": "Public Welfare & Social Justice",
        "categoryLabelTe": "ప్రజా సంక్షేమం & సామాజిక న్యాయం",
        "caption": "Spending time with children at community welfare centers, distributing fresh fruits and monitoring living standards.",
        "captionTe": "సంక్షేమ వసతి గృహంలోని చిన్నపిల్లల యోగక్షేమాలు తెలుసుకుంటూ, వారికి అరటిపండ్లు, పౌష్టికాహారాన్ని పంచిపెట్టిన దృశ్యాలు.",
        "featured": False,
        "order": 7
    },
    {
        "id": "vid-motorized-tricycle-distribution",
        "orig": "WhatsApp Video 2026-10-29 at 8.18.28 PM.mp4",
        "slug": "motorized-tricycle-distribution",
        "title": "Empowerment: Motorized Retrofitted Tricycles for Differently-Abled",
        "titleTe": "దివ్యాంగులకు మోటరైజ్డ్ రెట్రోఫిట్టెడ్ ట్రైసైకిళ్ల పంపిణీ",
        "category": "welfare",
        "categoryLabel": "Public Welfare & Social Justice",
        "categoryLabelTe": "ప్రజా సంక్షేమం & సామాజిక న్యాయం",
        "caption": "Handing over specialized three-wheeler mobility vehicles to physically challenged constituents for independent livelihood.",
        "captionTe": "నియోజకవర్గంలోని వికలాంగ సోదర సోదరీమణులకు ఆత్మగౌరవంతో కూడిన స్వయం ఉపాధి కల్పనకై మోటరైజ్డ్ వాహనాలను అందజేత.",
        "featured": True,
        "order": 8
    },
    {
        "id": "vid-vana-mahotsavam-speech",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.58 PM (2).mp4",
        "slug": "vana-mahotsavam-speech",
        "title": "Vana Mahotsavam Green Drive & Environmental Address",
        "titleTe": "వన మహోత్సవం - పర్యావరణ పరిరక్షణ & హరిత సంరక్షణ సందేశం",
        "category": "constituency",
        "categoryLabel": "Environment & Green Drive",
        "categoryLabelTe": "పర్యావరణం & హరిత భూపాలపల్లి",
        "caption": "Addressing forest officials and constituents on increasing green cover, protecting biodiversity, and water conservation.",
        "captionTe": "అటవీ శాఖ ఆధ్వర్యంలో నిర్వహించిన వన మహోత్సవ కార్యక్రమంలో పాల్గొని పర్యావరణ పరిరక్షణ, మొక్కల పెంపకంపై దిశా నిర్దేశం.",
        "featured": True,
        "order": 9
    },
    {
        "id": "vid-grama-sabha-grievance-redressal",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.58 PM (1).mp4",
        "slug": "grama-sabha-grievance-redressal",
        "title": "Village Grama Sabha & Grievance Redressal Interaction",
        "titleTe": "గ్రామ సభలో ప్రజల వినతుల స్వీకరణ & సమస్యల తక్షణ పరిష్కారం",
        "category": "constituency",
        "categoryLabel": "Constituency & Grassroots",
        "categoryLabelTe": "నియోజకవర్గం & ప్రజా దర్బార్",
        "caption": "Direct interaction with village women, farmers, and elders addressing drinking water, roads, and welfare pensions.",
        "captionTe": "ప్రాథమిక పాఠశాల ప్రాంగణంలో గ్రామస్తులతో ముఖాముఖి సమావేశం, మహిళల నుంచి అర్జీలు స్వీకరించి అధికారులకు ఆదేశాలు జారీ.",
        "featured": False,
        "order": 10
    },
    {
        "id": "vid-palle-nidra-village-walk",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.58 PM.mp4",
        "slug": "palle-nidra-village-walk",
        "title": "Palle Nidra & Padayatra: Direct Household Listening",
        "titleTe": "పల్లె నిద్ర & పాదయాత్ర: ప్రతి గడపకూ ఎమ్మెల్యే సత్తెన్న పలకరింపు",
        "category": "constituency",
        "categoryLabel": "Constituency & Grassroots",
        "categoryLabelTe": "నియోజకవర్గం & ప్రజా దర్బార్",
        "caption": "Walking village alleys without barrier, listening directly to mothers and farmers at their doorsteps.",
        "captionTe": "గ్రామ పర్యటనలో భాగంగా వీధుల్లో కాలినడకన పర్యటిస్తూ ప్రతి ఇంటి సమస్యను స్వయంగా అడిగి తెలుసుకుంటున్న సత్తెన్న.",
        "featured": False,
        "order": 11
    },
    {
        "id": "vid-traditional-dandiya-kolatam",
        "orig": "WhatsApp Video 2026-10-29 at 8.17.48 PM.mp4",
        "slug": "traditional-dandiya-kolatam",
        "title": "Festive Celebration: Traditional Kolatam / Dandiya with Citizens",
        "titleTe": "సాంస్కృతిక వేడుక: ప్రజలతో కలిసి సంప్రదాయ కోలాటం & దాండియా",
        "category": "events",
        "categoryLabel": "Culture & Festivals",
        "categoryLabelTe": "సంస్కృతి & పండుగలు",
        "caption": "Immersing in cultural folk festivities, joining constituent youth and women in joyous traditional Kolatam dance.",
        "captionTe": "పండుగ వేడుకల్లో భాగంగా గ్రామీణ సంస్కృతిని ప్రోత్సహిస్తూ యువత, పెద్దలతో కలిసి కోలాటం ఆడిన ఎమ్మెల్యే సత్తెన్న.",
        "featured": False,
        "order": 12
    },
    {
        "id": "vid-bathukamma-village-procession",
        "orig": "WhatsApp Video 2026-10-29 at 8.17.58 PM.mp4",
        "slug": "bathukamma-village-procession",
        "title": "Telangana Pride: Grand Bathukamma Floral Procession",
        "titleTe": "తెలంగాణ ఆడపడుచుల సంబరం: ఘనంగా బతుకమ్మ శోభాయాత్ర",
        "category": "events",
        "categoryLabel": "Culture & Festivals",
        "categoryLabelTe": "సంస్కృతి & పండుగలు",
        "caption": "Walking alongside rural women carrying vibrant flower Bathukammas, celebrating the state festival with devotion.",
        "captionTe": "తెలంగాణ సాంస్కృతిక ప్రతీక అయిన బతుకమ్మ వేడుకల్లో గ్రామ మహిళలతో కలిసి పురవీధుల్లో శోభాయాత్రలో పాల్గొన్న దృశ్యం.",
        "featured": True,
        "order": 13
    },
    {
        "id": "vid-bathukamma-floral-celebration",
        "orig": "WhatsApp Video 2026-10-29 at 8.18.24 PM.mp4",
        "slug": "bathukamma-floral-celebration",
        "title": "Bathukamma Circle & Traditional Folk Song Celebration",
        "titleTe": "బతుకమ్మ చుట్టూ జానపద పాటలు & సంప్రదాయ నృత్యాలు",
        "category": "events",
        "categoryLabel": "Culture & Festivals",
        "categoryLabelTe": "సంస్కృతి & పండుగలు",
        "caption": "Spectacular multi-tier flower pyramids (Gopuram) arranged for the grand constituency Bathukamma gathering.",
        "captionTe": "అందంగా తీర్చిదిద్దిన పూల బతుకమ్మల చుట్టూ మహిళల చప్పట్లు, పాటలతో నిండిన సంప్రదాయ ఉత్సవ వాతావరణం.",
        "featured": False,
        "order": 14
    },
    {
        "id": "vid-banjara-teej-festival",
        "orig": "WhatsApp Video 2026-10-29 at 8.18.28 PM (1).mp4",
        "slug": "banjara-teej-festival",
        "title": "Tribal Banjara Teej Festival with Sprouted Wheat Baskets",
        "titleTe": "సంప్రదాయ బంజారా తీజ్ ఉత్సవం - గోధుమ మొలకల బుట్టలతో పూజలు",
        "category": "events",
        "categoryLabel": "Culture & Tribal Heritage",
        "categoryLabelTe": "సంస్కృతి & గిరిజన వారసత్వం",
        "caption": "Adorning traditional Banjara turban and mirror-work sash, carrying holy sprouted wheat baskets to honor Lambadi culture.",
        "captionTe": "గిరిజన తండాల సంస్కృతిని గౌరవిస్తూ సంప్రదాయ తలపాగా ధరించి, తీజ్ గోధుమ బుట్టను నెత్తిన పెట్టుకుని వేడుకల్లో పాల్గొన్న సత్తెన్న.",
        "featured": True,
        "order": 15
    },
    {
        "id": "vid-temple-annadhanam-seva",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.30 PM (1).mp4",
        "slug": "temple-annadhanam-seva",
        "title": "Sacred Seva: Temple Annadhanam Serving to Devotees",
        "titleTe": "భక్తి శ్రద్ధలతో ఆలయ అన్నదాన సేవ - భక్తులకు భోజన ప్రసాద వితరణ",
        "category": "events",
        "categoryLabel": "Culture & Devotion",
        "categoryLabelTe": "సంస్కృతి & ఆధ్యాత్మికత",
        "caption": "Donning the sacred deeksha vastram to serve prasadam meals with his own hands to pilgrims and village women.",
        "captionTe": "ఆలయ ప్రాంగణంలో భక్తులకు, వృద్ధులకు, మహిళలకు వినమ్రంగా స్వయంగా అన్నదానం వడ్డిస్తూ సేవా భావాన్ని చాటిన దృశ్యం.",
        "featured": False,
        "order": 16
    },
    {
        "id": "vid-digital-service-center-launch",
        "orig": "WhatsApp Video 2026-10-29 at 8.18.29 PM (1).mp4",
        "slug": "digital-service-center-launch",
        "title": "Digital Citizen Service & IT Registration Center Inauguration",
        "titleTe": "డిజిటల్ పౌర సేవా కేంద్రం & కంప్యూటర్ శిక్షణా యూనిట్ ప్రారంభం",
        "category": "work",
        "categoryLabel": "Digital Infrastructure & Works",
        "categoryLabelTe": "డిజిటల్ మౌలిక వసతులు & అభివృద్ధి",
        "caption": "Launching computerized citizen services to expedite certificates, welfare applications, and digital governance.",
        "captionTe": "ప్రజలకు ప్రభుత్వ సేవలు, దరఖాస్తులు సులభంగా అందేలా ఏర్పాటు చేసిన డిజిటల్ సేవా కేంద్రాన్ని కంప్యూటర్ ద్వారా ప్రారంభించారు.",
        "featured": False,
        "order": 17
    },
    {
        "id": "vid-kotanchu-temple-sculpting",
        "orig": "WhatsApp Video 2026-10-29 at 8.19.36 PM.mp4",
        "slug": "kotanchu-temple-sculpting",
        "title": "Master Stone Sculpting for Kotanchu Heritage Temple Restoration",
        "titleTe": "కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి ఆలయ పునరుద్ధరణ - శిలా శిల్ప పనులు",
        "category": "work",
        "categoryLabel": "Heritage Restoration & Works",
        "categoryLabelTe": "చారిత్రక సంస్కృతి & ఆలయ అభివృద్ధి",
        "caption": "Traditional artisans hand-carving monolithic granite pillars for the sanctum expansion at historic Kotanchu temple.",
        "captionTe": "కాకతీయుల నాటి ప్రసిద్ధ కోటంచ శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయ అభివృద్ధికి జరుగుతున్న కృష్ణశిలా స్తంభాల చెక్కడపు పనులు.",
        "featured": True,
        "order": 18
    }
]

photos_catalog = [
    {
        "id": "img-agri-drone-inauguration",
        "orig": "WhatsApp Image 2026-10-29 at 8.18.31 PM.jpeg",
        "slug": "agri-drone-inauguration",
        "title": "Ribbon Cutting & Blessing: Agricultural Drone Launch by MLA Sathenna",
        "titleTe": "రైతాంగం సమక్షంలో వ్యవసాయ డ్రోన్ ప్రారంభోత్సవం - ఎమ్మెల్యే సత్తెన్న",
        "category": "agriculture",
        "categoryLabel": "Agriculture & Innovation",
        "categoryLabelTe": "వ్యవసాయం & సాంకేతికత",
        "caption": "Gandra Satyanarayana Rao cutting ribbon with progressive farmers and women leaders to deploy agricultural drones across the constituency.",
        "captionTe": "రైతులకు శ్రమ తగ్గించి దిగుబడులు పెంచేందుకు అధునాతన అగ్రికల్చర్ డ్రోన్ల వినియోగాన్ని లాంఛనంగా ప్రారంభించిన శాసనసభ్యులు గండ్ర సత్యనారాయణ రావు.",
        "featured": True,
        "order": 19
    },
    {
        "id": "img-agri-drone-flight",
        "orig": "WhatsApp Image 2026-10-29 at 8.18.30 PM.jpeg",
        "slug": "agri-drone-flight",
        "title": "Modern Hexacopter Agricultural Spraying Drone in Operation",
        "titleTe": "పొలాల్లో ఎగురుతూ మందులు పిచికారీ చేస్తున్న అత్యాధునిక హెక్సాకాప్టర్ డ్రోన్",
        "category": "agriculture",
        "categoryLabel": "Agriculture & Innovation",
        "categoryLabelTe": "వ్యవసాయం & సాంకేతికత",
        "caption": "Precision spraying technology covering acres in minutes, reducing labor costs and chemical exposure for Bhupalpally farmers.",
        "captionTe": "నిమిషాల వ్యవధిలోనే ఎకరాల కొద్దీ పొలంలో సమర్థవంతంగా పురుగుమందులు, ఎరువులు పిచికారీ చేసే స్మార్ట్ డ్రోన్ సాంకేతికత.",
        "featured": True,
        "order": 20
    }
]

print("Starting processing of videos...")
for item in video_catalog:
    src_file = os.path.join(source_dir, item["orig"])
    dst_file = os.path.join(vid_dir, f"{item['slug']}.mp4")
    
    # Copy video if not already present or size differs
    if not os.path.exists(dst_file) or os.path.getsize(dst_file) != os.path.getsize(src_file):
        print(f"Copying {item['orig']} -> {item['slug']}.mp4")
        shutil.copy2(src_file, dst_file)
    
    # Also keep copy with original name in case direct original filename is loaded
    orig_dst = os.path.join(vid_dir, item["orig"])
    if not os.path.exists(orig_dst):
        shutil.copy2(src_file, orig_dst)

    # Extract dimensions, duration, and generate poster
    cap = cv2.VideoCapture(src_file)
    count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    duration_sec = count / fps if fps > 0 else 0
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    mins = int(duration_sec // 60)
    secs = int(duration_sec % 60)
    item["duration"] = f"{mins}:{secs:02d}"
    item["durationSec"] = round(duration_sec, 1)
    item["width"] = w
    item["height"] = h
    item["mediaType"] = "video"
    item["format"] = "mp4"
    item["videoUrl"] = f"/media/videos/{item['slug']}.mp4"
    item["secureUrl"] = f"/media/videos/{item['slug']}.mp4"
    item["thumbnailUrl"] = f"/media/thumbnails/{item['slug']}.jpg"
    item["altText"] = item["title"]

    thumb_path = os.path.join(thumb_dir, f"{item['slug']}.jpg")
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(count * 0.45))
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(thumb_path, frame)
    cap.release()
    print(f"Done video {item['slug']} ({w}x{h}, {item['duration']})")

print("Starting processing of photos...")
for item in photos_catalog:
    src_file = os.path.join(source_dir, item["orig"])
    dst_file = os.path.join(img_dir, f"{item['slug']}.jpg")
    if not os.path.exists(dst_file) or os.path.getsize(dst_file) != os.path.getsize(src_file):
        shutil.copy2(src_file, dst_file)
    
    orig_dst = os.path.join(img_dir, item["orig"])
    if not os.path.exists(orig_dst):
        shutil.copy2(src_file, orig_dst)

    img = cv2.imread(src_file)
    h, w = img.shape[:2]
    item["width"] = w
    item["height"] = h
    item["mediaType"] = "image"
    item["format"] = "jpg"
    item["secureUrl"] = f"/media/images/{item['slug']}.jpg"
    item["thumbnailUrl"] = f"/media/images/{item['slug']}.jpg"
    item["altText"] = item["title"]
    print(f"Done image {item['slug']} ({w}x{h})")

full_catalog = {
    "videos": video_catalog,
    "photos": photos_catalog
}

catalog_path = os.path.join(client_media, "catalog.json")
with open(catalog_path, "w", encoding="utf-8") as f:
    json.dump(full_catalog, f, indent=2, ensure_ascii=False)

# Also write to client/src/data/mediaCatalog.js for immediate static bundling/fallback
src_data_dir = r"d:\SeptClaude2026\Gandra Satyanarayana Rao\client\src\data"
os.makedirs(src_data_dir, exist_ok=True)
with open(os.path.join(src_data_dir, "mediaCatalog.js"), "w", encoding="utf-8") as f:
    f.write("// Auto-generated from official field media dossier\n")
    f.write("export const MEDIA_CATALOG = " + json.dumps(full_catalog, indent=2, ensure_ascii=False) + ";\n")

print("All media processed and catalog written to both JSON and JS module!")
