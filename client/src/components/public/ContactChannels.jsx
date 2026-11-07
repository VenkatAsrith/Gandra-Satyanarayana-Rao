import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function ContactChannels({ settings }) {
  const { isTelugu } = useLanguage();

  const phone = settings?.officialPhone || '9849051228';
  const email = settings?.officialEmail || 'gandra.satyanarayanarao@gmail.com';
  const address = settings?.officeAddress || {
    line1: 'H.No: 3-12',
    village: 'Buddharam Village',
    mandal: 'Ghanapuram Mandal',
    district: 'Jayashankar Bhupalpally',
    state: 'Telangana'
  };

  const dispatchEmailHref = `mailto:${email}?subject=Constituent%20Representation%20-%20Bhupalpalle`;

  return (
    <section id="contact" className="section bg-off-white contact-praja-darbar-section">
      <div className="container">
        {/* =========================================================================
            SECTION 6: WEEKLY PRAJA DARBAR & CAMP OFFICE
            ========================================================================= */}
        <div className="praja-darbar-block">
          <div className="tag-label green">
            {isTelugu ? 'క్యాంపు కార్యాలయం ప్రజా దర్బార్' : 'Camp Office Open Court · ప్రజా దర్బార్'}
          </div>
          <h2 className="section-title">
            {isTelugu
              ? 'ప్రత్యక్ష ప్రజా సంప్రదింపులు: బుద్ధారంలో వారపు "ప్రజా దర్బార్"'
              : 'Direct Citizen Accessibility: Weekly Praja Darbar at Buddharam'}
          </h2>
          <p className="section-subtitle">
            {isTelugu
              ? 'గ్రామీణ సమస్యలు, వ్యక్తిగత వినతులు, మరియు అభివృద్ధి అవసరాలపై నేరుగా ఎమ్మెల్యే గారిని కలిసి విన్నవించుకునే పారదర్శక వేదిక.'
              : 'A transparent platform for constituents to present village issues, individual grievances, and development needs.'}
          </p>

          {/* Desktop Two-Column Presentation (Hidden on Mobile) */}
          <div className="praja-desktop-layout">
            <div className="praja-media-col">
              <div className="praja-media-frame">
                <img
                  src="/images/about/portrait-namaste.png"
                  alt="MLA Sathanna meeting constituents at Buddharam Praja Darbar"
                  loading="lazy"
                  className="praja-img"
                  onError={(e) => {
                    e.target.src = '/images/about/profile-formal.png';
                  }}
                />
                <div className="praja-img-badge">
                  <span>🏛️ Buddharam Camp Office · Open Court</span>
                </div>
              </div>
            </div>

            <div className="praja-info-col">
              <div className="praja-schedule-card">
                <div className="praja-timing-header">
                  <span className="timing-day-pill saffron">
                    {isTelugu ? 'ప్రతి సోమవారం & బుధవారం' : 'Every Monday & Wednesday'}
                  </span>
                  <span className="timing-time-pill green">
                    {isTelugu ? 'ఉదయం 9:30 గంటల నుండి' : 'Starting 9:30 AM'}
                  </span>
                </div>
                <h3 className="praja-card-headline">
                  {isTelugu
                    ? 'ప్రజల వద్దకే నాయకుడు — అధికారులతో తక్షణ సమస్యల పరిష్కారం'
                    : 'Constituents Interact Directly with Sathanna & Nodal Officers'}
                </h3>
                <p className="praja-card-desc">
                  {isTelugu
                    ? 'ప్రతి సోమవారం మరియు బుధవారం ఉదయం బుద్ధారం క్యాంపు కార్యాలయంలో రైతులు, విద్యార్థులు, మహిళలు మరియు వృద్ధులు నేరుగా ఎమ్మెల్యే సత్తన్న గారిని కలిసి తమ సమస్యలను తెలుపుతారు. వినతిపత్రాలు వెంటనే రికార్డు చేయబడి, జిల్లా శాఖాధికారులకు అధికారిక ఎండార్స్‌మెంట్‌తో తక్షణ పరిష్కారానికై పంపబడతాయి.'
                    : 'Every Monday and Wednesday morning, the MLA Camp Office at Buddharam Village opens for public representations. Farmers, students, elders, and women delegations interact directly with Sathanna, with petitions immediately recorded and forwarded with official endorsement slips to district authorities.'}
                </p>

                <div className="praja-address-strip">
                  <div className="praja-addr-item">
                    <span className="addr-icon">📍</span>
                    <span className="addr-text">
                      {address.line1}, {address.village}, {address.mandal}, {address.district}
                    </span>
                  </div>
                  <div className="praja-addr-item">
                    <span className="addr-icon">📞</span>
                    <a href={`tel:${phone}`} className="addr-link">Hotline: {phone}</a>
                  </div>
                </div>

                <div className="praja-action-row">
                  <a href={`tel:${phone}`} className="btn-pill btn-primary">
                    {isTelugu ? 'క్యాంపు కార్యాలయానికి కాల్ చేయండి' : 'Call Camp Office Hotline'}
                  </a>
                  <a href={dispatchEmailHref} className="btn-pill btn-secondary">
                    {isTelugu ? 'లిఖితపూర్వక వినతి సమర్పించండి' : 'Submit Representation'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile 4-Card Progressive ScrollStack (Hidden on Desktop) */}
          <div className="praja-mobile-scrollstack">
            <ScrollStack className="praja-stack">
              {/* Card 1: Schedule */}
              <ScrollStackItem accent="saffron">
                <div className="stack-darbar-card">
                  <div className="darbar-badge saffron">
                    {isTelugu ? 'ప్రజా దర్బార్ సమయాలు' : 'Weekly Praja Darbar'}
                  </div>
                  <div className="darbar-timing-large">
                    Mon & Wed · 9:30 AM
                  </div>
                  <h3 className="darbar-card-title">
                    {isTelugu ? 'బుద్ధారం క్యాంపు కార్యాలయంలో ప్రత్యక్ష కలయిక' : 'Regular Weekly Schedule at Buddharam'}
                  </h3>
                  <p className="darbar-card-desc">
                    {isTelugu
                      ? 'ప్రతి వారం రెండు రోజులు ఉదయం 9:30 గంటల నుండి ప్రజల సమస్యలు వినేందుకు క్యాంపు కార్యాలయం సిద్ధంగా ఉంటుంది.'
                      : 'Fixed bi-weekly public court ensuring transparent and accessible grassroots representation without middlemen.'}
                  </p>
                </div>
              </ScrollStackItem>

              {/* Card 2: Direct Citizen Interaction */}
              <ScrollStackItem accent="green">
                <div className="stack-darbar-card">
                  <div className="darbar-badge green">
                    {isTelugu ? 'ప్రత్యక్ష ప్రజా వేదిక' : 'Direct Citizen Interaction'}
                  </div>
                  <h3 className="darbar-card-title">
                    {isTelugu ? 'రైతులు, మహిళలు, విద్యార్థులతో ముఖాముఖి' : 'Present Village Issues & Grievances'}
                  </h3>
                  <p className="darbar-card-desc">
                    {isTelugu
                      ? 'రైతాంగం సాగునీటి సమస్యలు, విద్యార్థుల ఫీజులు, పింఛన్లు మరియు గ్రామాల్లో రోడ్ల మరమ్మతులపై నేరుగా విన్నవించవచ్చు.'
                      : 'Farmers, students, elders, and women delegations present agricultural, welfare, and civic challenges directly to Sathanna.'}
                  </p>
                </div>
              </ScrollStackItem>

              {/* Card 3: Administrative Follow-up */}
              <ScrollStackItem accent="neutral">
                <div className="stack-darbar-card">
                  <div className="darbar-badge blue">
                    {isTelugu ? 'అధికారిక పరిష్కారం' : 'Administrative Follow-up'}
                  </div>
                  <h3 className="darbar-card-title">
                    {isTelugu ? 'ఎండార్స్‌మెంట్ స్లిప్పులతో తక్షణ పరిష్కారం' : 'Immediate Record & District Forwarding'}
                  </h3>
                  <p className="darbar-card-desc">
                    {isTelugu
                      ? 'స్వీకరించిన ప్రతి వినతిపత్రం అధికారిక రిజిస్టర్‌లో నమోదు చేయబడి సంబంధిత రెవెన్యూ, ఇరిగేషన్, విద్యుత్ అధికారులకు పంపబడుతుంది.'
                      : 'Every petition is officially recorded and routed with MLA endorsement slips to the relevant departmental nodal officers.'}
                  </p>
                </div>
              </ScrollStackItem>

              {/* Card 4: Visit Camp Office & Contact */}
              <ScrollStackItem accent="saffron">
                <div className="stack-darbar-card">
                  <div className="darbar-badge saffron">
                    {isTelugu ? 'సంప్రదించండి' : 'Visit & Contact'}
                  </div>
                  <h3 className="darbar-card-title">
                    {isTelugu ? 'బుద్ధారం క్యాంపు కార్యాలయ చిరునామా' : 'Buddharam Camp Office Address'}
                  </h3>
                  <p className="darbar-card-desc">
                    {address.line1}, {address.village}, {address.mandal}, {address.district}.
                  </p>
                  <div className="stack-btn-group">
                    <a href={`tel:${phone}`} className="btn-pill btn-primary full-width">
                      📞 {isTelugu ? 'కాల్ చేయండి: ' : 'Call Hotline: '} {phone}
                    </a>
                  </div>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        </div>

        {/* =========================================================================
            SECTION 7: PEOPLE-CONNECT & CONSTITUENT SERVICES
            ========================================================================= */}
        <div className="people-connect-block" style={{ marginTop: '4rem' }}>
          <div className="tag-label">
            {isTelugu ? 'ప్రజా సంబంధాలు & సేవలు' : 'People-Connect & Constituent Services'}
          </div>
          <h2 className="section-title">
            {isTelugu ? 'క్యాంపు కార్యాలయం & సంప్రదింపు మార్గాలు' : 'Camp Office & Constituency Channels'}
          </h2>
          <p className="section-subtitle">
            {isTelugu
              ? 'గండ్ర సత్యనారాయణ రావు (సత్తన్న) గారిని బుద్ధారం క్యాంపు కార్యాలయం మరియు శాసనసభ అధికారిక మార్గాల ద్వారా సంప్రదించండి.'
              : 'Direct access to Gandra Satyanarayana Rao (Sathanna) through the Buddharam Camp Office open Praja Darbar and official legislative contact channels.'}
          </p>

          {/* Desktop Asymmetric Bento Grid (Hidden on Mobile) */}
          <div className="people-bento-grid">
            {/* Module 1: Open Praja Darbar */}
            <div className="people-bento-card bento-darbar accent-green">
              <div className="bento-badge-row">
                <span className="bento-pill green">
                  {isTelugu ? 'ప్రజా దర్బార్' : 'Open Praja Darbar'}
                </span>
                <span className="bento-status-indicator">
                  <span className="status-dot"></span>
                  {isTelugu ? 'సోమ & బుధ 9:30 AM' : 'Mon & Wed 9:30 AM'}
                </span>
              </div>
              <div className="bento-icon-frame">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="bento-card-title">
                {isTelugu ? 'ప్రత్యక్ష ప్రజా దర్బార్' : 'Weekly Praja Darbar'}
              </h3>
              <p className="bento-card-desc">
                {isTelugu
                  ? 'ప్రతి సోమవారం మరియు బుధవారం ఉదయం 9:30 గంటల నుండి బుద్ధారం క్యాంపు కార్యాలయంలో నిరంతరాయంగా ప్రజల సమస్యల స్వీకరణ.'
                  : 'Every Monday and Wednesday, 9:30 AM at Buddharam Camp Office. Direct public engagement with administrative officers present.'}
              </p>
              <div className="bento-card-footer">
                <a href={`tel:${phone}`} className="bento-link">
                  <span>{isTelugu ? 'క్యాంపు కార్యాలయం నంబర్' : 'Call Camp Office'}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Module 2: Buddharam Camp Office Address */}
            <div className="people-bento-card bento-office accent-saffron">
              <div className="bento-badge-row">
                <span className="bento-pill saffron">
                  {isTelugu ? 'క్యాంపు కార్యాలయం' : 'Camp Office'}
                </span>
              </div>
              <div className="bento-icon-frame">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="bento-card-title">
                {isTelugu ? 'బుద్ధారం క్యాంపు కార్యాలయం' : 'Buddharam Camp Office'}
              </h3>
              <p className="bento-card-desc">
                <strong>H.No: 3-12, Buddharam Village, Ghanapuram Mandal, Jayashankar Bhupalpally.</strong>
                <br />
                {isTelugu
                  ? 'ప్రజల సమస్యల ప్రత్యక్ష పరిష్కారం మరియు మండల నోడల్ అధికారులతో సమీక్షల వేదిక.'
                  : 'Direct public interaction for on-the-spot resolution with administrative nodal officers.'}
              </p>
              <div className="bento-card-footer">
                <a href={`tel:${phone}`} className="bento-link">
                  <span>{phone}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Module 3: Grievance Submission Desk */}
            <div className="people-bento-card bento-grievance accent-blue">
              <div className="bento-badge-row">
                <span className="bento-pill">
                  {isTelugu ? 'వినతుల విభాగం' : 'Grievance Desk'}
                </span>
              </div>
              <div className="bento-icon-frame">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="bento-card-title">
                {isTelugu ? 'వినతి పత్రాల సమర్పణ' : 'Grievance Submission Desk'}
              </h3>
              <p className="bento-card-desc">
                {isTelugu
                  ? 'గ్రామీణ సమస్యలు, తాగునీరు, డబుల్ బెడ్‌రూమ్ ఇళ్లు, పింఛన్లు మరియు అభివృద్ధి పనులపై అధికారిక లిఖితపూర్వక వినతిపత్రం సమర్పించండి.'
                  : 'Constituents may dispatch signed representations, village appeals, and civic requests directly to the MLA legislative desk.'}
              </p>
              <div className="bento-card-footer">
                <a href={dispatchEmailHref} className="bento-link">
                  <span>{isTelugu ? 'వినతి సమర్పించండి (ఈమెయిల్)' : 'Dispatch Representation'}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Module 4: Official Hotline */}
            <div className="people-bento-card bento-hotline accent-saffron">
              <div className="bento-badge-row">
                <span className="bento-pill saffron">
                  {isTelugu ? 'శాసనసభ డైరెక్టరీ' : 'Official Hotline'}
                </span>
              </div>
              <div className="bento-icon-frame">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="bento-card-title">
                {phone}
              </h3>
              <p className="bento-card-desc">
                {isTelugu
                  ? 'తెలంగాణ శాసనసభ 2023–2028 అధికారిక డైరెక్టరీలో నమోదైన శాసనసభ్యుల ప్రత్యక్ష టెలిఫోన్ నంబర్ మరియు ఈమెయిల్ మార్గం.'
                  : 'Direct telephone and email listed in the Telangana Legislative Assembly 2023–2028 official directory.'}
              </p>
              <div className="bento-card-footer">
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={`tel:${phone}`} className="bento-link">
                    <span>Call: {phone}</span>
                  </a>
                  <a href={`mailto:${email}`} className="bento-link">
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Module 5: Constituency Profile */}
            <div className="people-bento-card bento-profile accent-green">
              <div className="bento-badge-row">
                <span className="bento-pill green">
                  {isTelugu ? 'నియోజకవర్గం 108' : 'Assembly Constituency No. 108'}
                </span>
              </div>
              <div className="bento-icon-frame">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="bento-card-title">
                {isTelugu ? '6 మండలాలు · 2,63,948 ఓటర్లు' : '6 Mandals · 263,948 Electors'}
              </h3>
              <p className="bento-card-desc">
                {isTelugu
                  ? 'భూపాలపల్లి, ఘనపూర్, రేగొండ, శాయంపేట, చిట్యాల, మొగుళ్లపల్లి మండలాల సమగ్ర ప్రొఫైల్ మరియు ప్రజా సమస్యల పరిష్కార నివేదికలు.'
                  : 'Constituency demographic dossiers, revenue mandal boundaries, irrigation command acreage, and administrative grievance channels.'}
              </p>
              <div className="bento-card-footer">
                <Link to="/constituency" className="bento-link">
                  <span>{isTelugu ? 'నియోజకవర్గ వివరాలు' : 'Explore Constituency'}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Stacked Service Cards (Hidden on Desktop) */}
          <div className="people-mobile-stacked">
            <div className="mobile-service-card accent-green">
              <span className="mob-card-badge green">Mon & Wed · 9:30 AM</span>
              <h3 className="mob-card-title">{isTelugu ? 'వారపు ప్రజా దర్బార్' : 'Open Praja Darbar'}</h3>
              <p className="mob-card-desc">
                {isTelugu
                  ? 'బుద్ధారం క్యాంపు కార్యాలయంలో నిరంతరాయంగా ప్రజల సమస్యల స్వీకరణ.'
                  : 'Direct constituent access at Buddharam Camp Office every Monday & Wednesday.'}
              </p>
              <a href={`tel:${phone}`} className="btn-pill btn-primary full-width">
                📞 {isTelugu ? 'కార్యాలయానికి కాల్ చేయండి' : 'Call Camp Office'}
              </a>
            </div>

            <div className="mobile-service-card accent-saffron">
              <span className="mob-card-badge saffron">Buddharam Village</span>
              <h3 className="mob-card-title">{isTelugu ? 'బుద్ధారం క్యాంపు కార్యాలయం' : 'Buddharam Camp Office'}</h3>
              <p className="mob-card-desc">
                H.No: 3-12, Buddharam Village, Ghanapuram Mandal, Jayashankar Bhupalpally.
              </p>
              <a href={`tel:${phone}`} className="btn-pill btn-outline full-width">
                📞 {phone}
              </a>
            </div>

            <div className="mobile-service-card accent-blue">
              <span className="mob-card-badge blue">Written Representation</span>
              <h3 className="mob-card-title">{isTelugu ? 'వినతి పత్రాల సమర్పణ' : 'Grievance Submission Desk'}</h3>
              <p className="mob-card-desc">
                {isTelugu
                  ? 'సమస్యల పరిష్కారానికై లిఖితపూర్వక వినతిపత్రం నేరుగా ఇమెయిల్ చేయండి.'
                  : 'Submit signed representations directly to the MLA legislative team.'}
              </p>
              <a href={dispatchEmailHref} className="btn-pill btn-secondary full-width">
                ✉️ {isTelugu ? 'వినతి సమర్పించండి' : 'Dispatch Representation'}
              </a>
            </div>

            <div className="mobile-service-card accent-saffron">
              <span className="mob-card-badge saffron">Legislative Directory</span>
              <h3 className="mob-card-title">{isTelugu ? 'అధికారిక హాట్‌లైన్' : 'Official Hotline'}</h3>
              <p className="mob-card-desc">{phone} · {email}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href={`tel:${phone}`} className="btn-pill btn-primary" style={{ flex: '1 1 45%' }}>
                  📞 Call
                </a>
                <a href={`mailto:${email}`} className="btn-pill btn-secondary" style={{ flex: '1 1 45%' }}>
                  ✉️ Email
                </a>
              </div>
            </div>

            <div className="mobile-service-card accent-green">
              <span className="mob-card-badge green">AC 108</span>
              <h3 className="mob-card-title">{isTelugu ? 'నియోజకవర్గ ప్రొఫైల్' : 'Constituency Profile'}</h3>
              <p className="mob-card-desc">6 Mandals · 263,948 Electors across Jayashankar Bhupalpally.</p>
              <Link to="/constituency" className="btn-pill btn-secondary full-width">
                🏛️ {isTelugu ? 'నియోజకవర్గం చూడండి' : 'Explore Constituency'} →
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 8: CONSTITUENT VISITING HOURS & PRAJA DARBAR PROTOCOL
            ========================================================================= */}
        <div className="camp-protocol-appointment-card" style={{ marginTop: '3.5rem' }}>
          <div className="protocol-card-inner">
            <div className="protocol-calendar-col">
              <div className="protocol-calendar-widget">
                <div className="cal-header">
                  <span>PRAJA DARBAR</span>
                </div>
                <div className="cal-body">
                  <div className="cal-days">MON & WED</div>
                  <div className="cal-time">9:30 AM</div>
                </div>
              </div>
            </div>

            <div className="protocol-info-col">
              <h3 className="protocol-title">
                {isTelugu
                  ? 'క్యాంపు కార్యాలయ ప్రజా దర్శన నిబంధనలు'
                  : 'Constituent Visiting Hours & Praja Darbar Protocol'}
              </h3>
              <p className="protocol-desc">
                {isTelugu
                  ? 'బుద్ధారం క్యాంపు కార్యాలయంలో ప్రతి సోమవారం మరియు బుధవారం ఉదయం 9:30 గంటల నుండి శ్రీ గండ్ర సత్యనారాయణ రావు గారు ప్రత్యక్షంగా ప్రజల నుండి వినతులు స్వీకరిస్తారు. రెవెన్యూ, నీటిపారుదల, పంచాయతీరాజ్ మరియు విద్యుత్ శాఖల నోడల్ అధికారులు తక్షణ చర్యలకై అందుబాటులో ఉంటారు.'
                  : 'Constituents may attend the weekly Praja Darbar at the Buddharam Camp Office every Monday and Wednesday starting at 9:30 AM to submit petitions directly to Sri Gandra Satyanarayana Rao. Revenue and public works nodal officers remain present for expedited administrative action.'}
              </p>

              <div className="protocol-badges-strip">
                <span className="proto-badge">📍 Buddharam Village, Ghanapuram Mandal</span>
                <span className="proto-badge">⏰ {isTelugu ? 'ఉదయం 9:30 నుండి' : 'From 9:30 AM'}</span>
                <span className="proto-badge">📞 {phone}</span>
              </div>

              <div className="protocol-action-row">
                <a href={`tel:${phone}`} className="btn-pill btn-primary">
                  {isTelugu ? 'క్యాంపు కార్యాలయానికి కాల్ చేయండి' : 'Call Camp Office'}
                </a>
                <a href={dispatchEmailHref} className="btn-pill btn-outline">
                  {isTelugu ? 'వినతి సమర్పించండి' : 'Dispatch Representation'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
