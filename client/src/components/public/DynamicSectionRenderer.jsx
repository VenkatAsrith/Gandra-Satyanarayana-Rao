import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';

export default function DynamicSectionRenderer({ section }) {
  const { isTelugu, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);

  if (!section || !section.isEnabled) return null;

  // Resolve localized fields with fallback to English
  const te = section.translations?.te || {};
  const title = (isTelugu && te.title) ? te.title : section.title;
  const subtitle = (isTelugu && te.subtitle) ? te.subtitle : section.subtitle;
  const badge = (isTelugu && te.badge) ? te.badge : section.badge;
  const content = (isTelugu && te.content) ? te.content : section.content;
  const ctaText = (isTelugu && te.ctaText) ? te.ctaText : section.ctaText;
  const mediaAlt = (isTelugu && te.mediaAlt) ? te.mediaAlt : (section.mediaAlt || title);
  const mediaUrl = resolveMediaUrl(section.mediaUrl);

  const toggleFaq = (idx) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  // Render by Type & Layout
  switch (section.type) {
    case 'quote_callout':
      return (
        <section className="section-wrap dynamic-section-wrap dynamic-quote-wrap" id={section.key}>
          <div className="site-container">
            <div className="dynamic-quote-card">
              <div className="dynamic-quote-grid">
                {mediaUrl && (
                  <div className="dynamic-quote-media">
                    <img
                      src={mediaUrl}
                      alt={mediaAlt}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="dynamic-quote-body">
                  {badge && <span className="category-pill">{badge}</span>}
                  <h2 className="dynamic-quote-title">{title}</h2>
                  {subtitle && <p className="dynamic-quote-lead">{subtitle}</p>}
                  {content && (
                    <blockquote className="dynamic-blockquote">
                      {typeof content === 'string' ? content : JSON.stringify(content)}
                    </blockquote>
                  )}
                  {ctaText && section.ctaLink && (
                    <div className="dynamic-quote-action">
                      <Link to={section.ctaLink} className="btn btn-primary">
                        {ctaText} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'statistics':
      return (
        <section className="section-wrap dynamic-section-wrap dynamic-stats-wrap" id={section.key}>
          <div className="site-container">
            <div className="section-header-centered">
              {badge && <span className="category-pill">{badge}</span>}
              <h2 className="section-heading">{title}</h2>
              {subtitle && <p className="section-lead">{subtitle}</p>}
            </div>

            {Array.isArray(content) && content.length > 0 ? (
              <div className="stats-row dynamic-stats-grid">
                {content.map((item, idx) => (
                  <div key={idx} className="stat-card">
                    <div className="stat-number">{item.value || item.stat}</div>
                    <div className="stat-label">
                      {(isTelugu && item.label_te) ? item.label_te : (item.label || item.title)}
                    </div>
                    {item.note && <div className="stat-source">{item.note}</div>}
                  </div>
                ))}
              </div>
            ) : typeof content === 'string' && content.trim() ? (
              <p className="text-secondary text-center">{content}</p>
            ) : null}
          </div>
        </section>
      );

    case 'faq':
      return (
        <section className="section-wrap dynamic-section-wrap dynamic-faq-wrap" id={section.key}>
          <div className="site-container">
            <div className="section-header-centered">
              {badge && <span className="category-pill">{badge}</span>}
              <h2 className="section-heading">{title}</h2>
              {subtitle && <p className="section-lead">{subtitle}</p>}
            </div>

            {Array.isArray(content) && content.length > 0 && (
              <div className="faq-list">
                {content.map((faq, idx) => {
                  const q = (isTelugu && faq.q_te) ? faq.q_te : faq.question;
                  const a = (isTelugu && faq.a_te) ? faq.a_te : faq.answer;
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className={`faq-card ${isOpen ? 'active' : ''}`}>
                      <button
                        type="button"
                        className="faq-question-btn"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{q}</span>
                        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="faq-answer-body">
                          <p>{a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      );

    case 'announcements':
      return (
        <section className="section-wrap dynamic-section-wrap dynamic-announcement-wrap" id={section.key}>
          <div className="site-container">
            <div className="announcement-banner">
              <div className="announcement-badge-col">
                <span className="badge badge-accent">
                  {badge || (isTelugu ? 'ముఖ్య గమనిక' : 'Public Announcement')}
                </span>
              </div>
              <div className="announcement-text-col">
                <h3 className="announcement-title">{title}</h3>
                {subtitle && <p className="announcement-lead">{subtitle}</p>}
                {content && (
                  <p className="announcement-body">
                    {typeof content === 'string' ? content : ''}
                  </p>
                )}
              </div>
              {ctaText && section.ctaLink && (
                <div className="announcement-btn-col">
                  <Link to={section.ctaLink} className="btn btn-secondary btn-sm">
                    {ctaText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case 'feature':
    default:
      return (
        <section className="section-wrap dynamic-section-wrap" id={section.key}>
          <div className="site-container">
            <div className={`dynamic-feature-grid layout-${section.layout || 'split_media'}`}>
              <div className="dynamic-feature-content">
                {badge && <span className="category-pill">{badge}</span>}
                <h2 className="section-heading dynamic-heading">{title}</h2>
                {subtitle && <p className="section-lead dynamic-lead">{subtitle}</p>}
                {content && (
                  <div className="dynamic-body-text">
                    {typeof content === 'string' ? (
                      <p>{content}</p>
                    ) : Array.isArray(content) ? (
                      <ul className="dynamic-feature-bullets">
                        {content.map((point, idx) => (
                          <li key={idx}>
                            {(isTelugu && point.text_te) ? point.text_te : (point.text || point)}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}
                {ctaText && section.ctaLink && (
                  <div className="dynamic-action-row">
                    <Link to={section.ctaLink} className="btn btn-primary">
                      {ctaText} →
                    </Link>
                  </div>
                )}
              </div>

              {mediaUrl && (
                <div className="dynamic-feature-media">
                  <div className="dynamic-img-frame">
                    <img
                      src={mediaUrl}
                      alt={mediaAlt}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      );
  }
}
