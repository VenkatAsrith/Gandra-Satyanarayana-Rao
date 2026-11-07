import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function SocialMediaSection({ settings }) {
  const { isTelugu } = useLanguage();

  const socialLinks = settings?.socialLinks || {};

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      nameTe: 'యూట్యూబ్',
      label: 'Official Video Channel',
      labelTe: 'అధికారిక వీడియో ప్రసారాలు',
      descEn: 'Watch constituency review meetings, legislative assembly addresses, and field project inaugurations.',
      descTe: 'శాసనసభ ప్రసంగాలు, మండలాల పర్యటనలు మరియు అభివృద్ధి పనుల శంకుస్థాపనల అధికారిక వీడియోలు.',
      icon: '▶',
      color: '#FF0000',
      url: socialLinks.youtube || 'https://www.youtube.com/@GandraSatyanarayanaRao',
      ctaText: 'Watch Official Channel',
      ctaTextTe: 'యూట్యూబ్‌లో వీక్షించండి'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      nameTe: 'ఫేస్‌బుక్',
      label: 'Public Activities & Press',
      labelTe: 'ప్రజా కార్యక్రమాలు & ప్రెస్ నోట్స్',
      descEn: 'Daily photo coverage, developmental progress reports, and constituent press releases across all 6 mandals.',
      descTe: 'దినసరి పర్యటనల ఛాయాచిత్రాలు, ప్రజా సమస్యల పరిష్కార నివేదికలు మరియు అధికారిక పత్రికా ప్రకటనలు.',
      icon: 'f',
      color: '#1877F2',
      url: socialLinks.facebook || 'https://www.facebook.com/GandraSatyanarayanaRaoOfficial',
      ctaText: 'Follow on Facebook',
      ctaTextTe: 'ఫేస్‌బుక్‌లో అనుసరించండి'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      nameTe: 'ఇన్‌స్టాగ్రామ్',
      label: 'Field Documentation & Reels',
      labelTe: 'క్షేత్రస్థాయి చిత్రాలు & రీల్స్',
      descEn: 'Visual stories and direct moments from Buddharam Praja Darbar and grassroots village visits.',
      descTe: 'బుద్ధారం ప్రజా దర్బార్ మరియు గ్రామీణ పర్యటనల క్షేత్రస్థాయి చిత్రాలు, ప్రజా సంభాషణలు.',
      icon: 'IG',
      color: '#E4405F',
      url: socialLinks.instagram || 'https://www.instagram.com/gandra_satyanarayana_rao',
      ctaText: 'Follow on Instagram',
      ctaTextTe: 'ఇన్‌స్టాగ్రామ్‌లో చూడండి'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      nameTe: 'ఎక్స్ (ట్విట్టర్)',
      label: 'Legislative & Policy Briefs',
      labelTe: 'శాసనసభ & విధాన ప్రకటనలు',
      descEn: 'Official legislative policy statements, state government representations, and administrative updates.',
      descTe: 'శాసనసభ విధాన ప్రకటనలు, రాష్ట్ర ప్రభుత్వ వినతులు మరియు పరిపాలనా సమీక్షల తాజా సమాచారం.',
      icon: '𝕏',
      color: '#111111',
      url: socialLinks.twitter || 'https://twitter.com/Gandra_INC',
      ctaText: 'Follow on X',
      ctaTextTe: 'ఎక్స్‌లో అనుసరించండి'
    }
  ];

  return (
    <section className="section social-media-section" id="social-channels" aria-label="Official Digital Media Presence">
      <div className="container">
        <div className="social-section-head">
          <div className="tag-label saffron">
            {isTelugu ? 'అధికారిక డిజిటల్ వేదికలు' : 'Official Digital Presence'}
          </div>
          <h2 className="section-title" style={{ marginTop: '0.65rem' }}>
            {isTelugu ? 'సత్తన్నతో అనుసంధానం కండి' : 'Connect with Sathanna'}
          </h2>
          <p className="section-subtitle" style={{ marginTop: '0.5rem' }}>
            {isTelugu
              ? 'నియోజకవర్గ పర్యటనలు, శాసనసభ సమావేశాలు, అభివృద్ధి పనులు మరియు ప్రజా కార్యక్రమాల అధికారిక సమాచారాన్ని సోషల్ మీడియా ద్వారా ఎప్పటికప్పుడు తెలుసుకోండి.'
              : 'Follow official updates, public activities, constituency visits, development initiatives and legislative engagements.'}
          </p>
        </div>

        {/* Desktop Editorial Media Grid */}
        <div className="social-desktop-grid">
          {platforms.map((p) => (
            <div key={p.id} className={`social-card platform-${p.id}`}>
              <div className="social-card-top">
                <div className="social-icon-box" style={{ background: p.color }}>
                  <span>{p.icon}</span>
                </div>
                <div className="social-meta-info">
                  <span className="social-platform-name">{isTelugu ? p.nameTe : p.name}</span>
                  <span className="social-platform-sub">{isTelugu ? p.labelTe : p.label}</span>
                </div>
              </div>

              <p className="social-card-desc">
                {isTelugu ? p.descTe : p.descEn}
              </p>

              <div className="social-card-action">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-primary full-width"
                  style={{ justifyContent: 'center' }}
                >
                  {isTelugu ? p.ctaTextTe : p.ctaText} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Browsable Social Rail */}
        <div className="social-mobile-rail-wrap">
          <div className="social-mobile-rail">
            {platforms.map((p) => (
              <div key={p.id} className="social-rail-item">
                <div className="social-rail-header">
                  <span className="social-rail-icon" style={{ background: p.color }}>
                    {p.icon}
                  </span>
                  <div>
                    <h4 className="social-rail-name">{isTelugu ? p.nameTe : p.name}</h4>
                    <span className="social-rail-tag">{isTelugu ? p.labelTe : p.label}</span>
                  </div>
                </div>
                <p className="social-rail-desc">
                  {isTelugu ? p.descTe : p.descEn}
                </p>
                <div className="social-rail-action">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-primary full-width"
                    style={{ justifyContent: 'center' }}
                  >
                    {isTelugu ? p.ctaTextTe : p.ctaText} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
