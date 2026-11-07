import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ContactChannels({ settings }) {
  const { isTelugu } = useLanguage();
  const trackRef = useRef(null);
  const [activeChannelIdx, setActiveChannelIdx] = useState(0);

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

  const channelsData = [
    {
      id: 'darbar',
      badge: isTelugu ? 'ప్రజా దర్బార్' : 'Open Praja Darbar',
      status: isTelugu ? 'సోమ & బుధ 9:30 AM' : 'Mon & Wed 9:30 AM',
      title: isTelugu ? 'ప్రత్యక్ష ప్రజా దర్బార్' : 'Weekly Praja Darbar',
      desc: isTelugu
        ? 'ప్రతి సోమవారం మరియు బుధవారం ఉదయం 9:30 గంటల నుండి బుద్ధారం క్యాంపు కార్యాలయంలో నిరంతరాయంగా ప్రజల సమస్యల స్వీకరణ.'
        : 'Every Monday and Wednesday, 9:30 AM at Buddharam Camp Office. Direct public engagement with administrative officers present.',
      actionType: 'tel',
      actionUrl: `tel:${phone}`,
      actionText: isTelugu ? 'క్యాంపు కార్యాలయానికి కాల్ చేయండి' : 'Call Camp Office',
      accent: 'green'
    },
    {
      id: 'office',
      badge: isTelugu ? 'క్యాంపు కార్యాలయం' : 'Camp Office',
      status: 'Buddharam Village',
      title: isTelugu ? 'బుద్ధారం క్యాంపు కార్యాలయం' : 'Buddharam Camp Office',
      desc: `${address.line1}, ${address.village}, ${address.mandal}, ${address.district}. ${isTelugu ? 'ప్రత్యక్ష ప్రజా విచారణ మరియు అధికారులతో తక్షణ సమస్య పరిష్కారం.' : 'Direct public interaction for on-the-spot resolution with administrative nodal officers.'}`,
      actionType: 'tel',
      actionUrl: `tel:${phone}`,
      actionText: `${phone}`,
      accent: 'saffron'
    },
    {
      id: 'grievance',
      badge: isTelugu ? 'వినతుల విభాగం' : 'Grievance Desk',
      status: isTelugu ? 'లిఖితపూర్వక అర్జీలు' : 'Written Petitions',
      title: isTelugu ? 'వినతి పత్రాల సమర్పణ' : 'Grievance Submission Desk',
      desc: isTelugu
        ? 'గ్రామీణ సమస్యలు, తాగునీరు, రోడ్లు, పింఛన్లు మరియు అభివృద్ధి పనులపై అధికారిక లిఖితపూర్వక వినతిపత్రం సమర్పించండి.'
        : 'Constituents may dispatch signed representations, village appeals, and civic requests directly to the MLA legislative desk.',
      actionType: 'mailto',
      actionUrl: dispatchEmailHref,
      actionText: isTelugu ? 'వినతి సమర్పించండి (ఈమెయిల్)' : 'Dispatch Representation',
      accent: 'blue'
    },
    {
      id: 'hotline',
      badge: isTelugu ? 'శాసనసభ డైరెక్టరీ' : 'Official Hotline',
      status: 'Telangana Assembly 2023–2028',
      title: phone,
      desc: isTelugu
        ? 'తెలంగాణ శాసనసభ 2023–2028 అధికారిక డైరెక్టరీలో నమోదైన శాసనసభ్యుల ప్రత్యక్ష టెలిఫోన్ నంబర్ మరియు ఈమెయిల్ మార్గం.'
        : 'Direct telephone and email listed in the Telangana Legislative Assembly 2023–2028 official directory.',
      actionType: 'dual',
      actionUrl: `tel:${phone}`,
      actionText: isTelugu ? 'హాట్‌లైన్ కాల్ చేయండి' : 'Call: 9849051228',
      secondaryUrl: `mailto:${email}`,
      secondaryText: isTelugu ? 'ఈమెయిల్ పంపండి' : 'Email Us',
      accent: 'saffron'
    },
    {
      id: 'constituency',
      badge: isTelugu ? 'నియోజకవర్గం 108' : 'Assembly Constituency No. 108',
      status: 'AC 108',
      title: isTelugu ? '6 మండలాలు · 2,63,948 ఓటర్లు' : '6 Mandals · 263,948 Electors',
      desc: isTelugu
        ? 'భూపాలపల్లి, ఘనపూర్, రేగొండ, శాయంపేట, చిట్యాల, మొగుళ్లపల్లి మండలాల సమగ్ర ప్రొఫైల్ మరియు ప్రజా సేవల సమాచారం.'
        : 'Constituency demographic dossiers, revenue mandal boundaries, irrigation command acreage, and administrative grievance channels.',
      actionType: 'route',
      actionUrl: '/constituency',
      actionText: isTelugu ? 'నియోజకవర్గ వివరాలు' : 'Explore Constituency',
      accent: 'green'
    }
  ];

  const scrollToChannel = (index) => {
    setActiveChannelIdx(index);
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = activeChannelIdx > 0 ? activeChannelIdx - 1 : channelsData.length - 1;
    scrollToChannel(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeChannelIdx < channelsData.length - 1 ? activeChannelIdx + 1 : 0;
    scrollToChannel(nextIdx);
  };

  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const cardWidth = trackRef.current.children[0]?.offsetWidth || 320;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < channelsData.length && index !== activeChannelIdx) {
      setActiveChannelIdx(index);
    }
  };

  return (
    <section id="contact" className="section bg-off-white contact-praja-darbar-section" aria-label="Camp Office and Constituent Services">
      <div className="container">
        {/* Section Heading */}
        <div className="channels-header-split">
          <div>
            <div className="tag-label green">
              {isTelugu ? 'ప్రజా సంబంధాలు & క్యాంపు కార్యాలయం' : 'People-Connect & Constituent Services'}
            </div>
            <h2 className="section-title" style={{ marginTop: '0.65rem' }}>
              {isTelugu ? 'క్యాంపు కార్యాలయం & సంప్రదింపు మార్గాలు' : 'Camp Office & Constituency Channels'}
            </h2>
            <p className="section-subtitle" style={{ marginTop: '0.5rem' }}>
              {isTelugu
                ? 'గండ్ర సత్యనారాయణ రావు (సత్తన్న) గారిని బుద్ధారం క్యాంపు కార్యాలయం మరియు శాసనసభ అధికారిక మార్గాల ద్వారా సంప్రదించండి.'
                : 'Direct access to Gandra Satyanarayana Rao (Sathanna) through the Buddharam Camp Office open Praja Darbar and official legislative contact channels.'}
            </p>
          </div>

          {/* Horizontal Trigger Controls */}
          <div className="channels-nav-controls">
            <button
              type="button"
              className="channel-arrow-btn prev"
              onClick={handlePrev}
              aria-label="Previous Service Channel"
              title="Previous Channel"
            >
              &#10094;
            </button>
            <span className="channel-counter-pill">
              0{activeChannelIdx + 1} / 0{channelsData.length}
            </span>
            <button
              type="button"
              className="channel-arrow-btn next"
              onClick={handleNext}
              aria-label="Next Service Channel"
              title="Next Channel"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Side Scroll / Horizontal Snapping Track Across Desktop & Mobile */}
        <div
          className="channels-horizontal-track"
          ref={trackRef}
          onScroll={handleTrackScroll}
          role="region"
          aria-label="Camp Office and Constituency Channels Track"
        >
          {channelsData.map((ch, idx) => (
            <div
              key={ch.id}
              className={`channel-h-card accent-${ch.accent} ${idx === activeChannelIdx ? 'is-active-channel' : ''}`}
              onClick={() => scrollToChannel(idx)}
            >
              <div className="channel-h-card-top">
                <span className={`channel-pill ${ch.accent}`}>{ch.badge}</span>
                <span className="channel-status">{ch.status}</span>
              </div>

              <div className="channel-h-body">
                <h3 className="channel-h-title">{ch.title}</h3>
                <p className="channel-h-desc">{ch.desc}</p>
              </div>

              <div className="channel-h-footer">
                {ch.actionType === 'dual' ? (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%' }}>
                    <a href={ch.actionUrl} className="btn-pill btn-primary" style={{ flex: '1 1 45%', justifyContent: 'center' }}>
                      {ch.actionText}
                    </a>
                    <a href={ch.secondaryUrl} className="btn-pill btn-secondary" style={{ flex: '1 1 45%', justifyContent: 'center' }}>
                      {ch.secondaryText}
                    </a>
                  </div>
                ) : ch.actionType === 'route' ? (
                  <Link to={ch.actionUrl} className="btn-pill btn-primary full-width" style={{ justifyContent: 'center' }}>
                    {ch.actionText} →
                  </Link>
                ) : (
                  <a href={ch.actionUrl} className="btn-pill btn-primary full-width" style={{ justifyContent: 'center' }}>
                    {ch.actionText} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="channels-dots-row">
          {channelsData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`channel-dot-btn ${idx === activeChannelIdx ? 'active' : ''}`}
              onClick={() => scrollToChannel(idx)}
              aria-label={`Jump to Channel 0${idx + 1}`}
            />
          ))}
        </div>

        {/* Constituent Visiting Hours & Praja Darbar Protocol */}
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
