import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveMediaUrl } from '../../services/api';
import { MEDIA_CATALOG } from '../../data/mediaCatalog';
import AnimatedList from './AnimatedList';

export default function VideoReelShowcase() {
  const { isTelugu, t } = useLanguage();
  const videoList = MEDIA_CATALOG?.videos || [];

  // Top featured videos for home showcase
  const featuredVideos = useMemo(() => videoList.slice(0, 8), [videoList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const activeVideo = featuredVideos[activeIndex] || featuredVideos[0] || null;

  const handleItemSelect = (item, index) => {
    setActiveIndex(index);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted without user interaction
      });
    }
  };

  // Map real videos to the AnimatedList item structure
  const animatedItems = useMemo(() => {
    return featuredVideos.map((vid) => {
      const title = isTelugu && vid.titleTe ? vid.titleTe : vid.title;
      const description = isTelugu && vid.captionTe ? vid.captionTe : vid.caption;
      const meta = isTelugu && vid.categoryLabelTe ? vid.categoryLabelTe : (vid.categoryLabel || 'Video');
      return {
        ...vid,
        title,
        description,
        meta,
        dateFormatted: vid.date ? new Date(vid.date).toLocaleDateString() : 'Official Record'
      };
    });
  }, [featuredVideos, isTelugu]);

  if (!activeVideo) return null;

  const activeTitle = isTelugu && activeVideo.titleTe ? activeVideo.titleTe : activeVideo.title;
  const activeCaption = isTelugu && activeVideo.captionTe ? activeVideo.captionTe : activeVideo.caption;
  const activeCategory = isTelugu && activeVideo.categoryLabelTe ? activeVideo.categoryLabelTe : activeVideo.categoryLabel;

  return (
    <section className="video-theatre-section" aria-label="Official Video Records">
      <div className="container">
        {/* Section Header */}
        <div>
          <div className="tag-label" style={{ color: 'var(--saffron, #F36B21)', borderColor: 'rgba(243, 107, 33, 0.4)', background: 'rgba(243, 107, 33, 0.1)' }}>
            {t('videoReel.tagLabel', isTelugu ? 'క్షేత్రస్థాయి వీడియో రికార్డులు' : 'Field Video Records')}
          </div>
          <h2 className="section-title text-white video-theatre-title" style={{ color: '#FFFFFF', marginTop: '0.5rem' }}>
            {t('videoReel.sectionTitle', isTelugu
              ? 'ప్రజల కోసం నిరంతర శ్రమ: అధికారిక వీడియో డాక్యుమెంటేషన్'
              : 'Constituency Service in Action: Official Video Documentation')}
          </h2>
          <p style={{ color: '#CBD5E1', maxWidth: '780px', marginTop: '0.5rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {t('videoReel.sectionSubtitle', isTelugu
              ? 'భూపాలపల్లి నియోజకవర్గంలో వ్యవసాయ డ్రోన్ ప్రారంభోత్సవం, మెగా ఉద్యోగ మేళా, సంక్షేమ వాహనాల పంపిణీ మరియు విద్యార్థుల సహపంక్తి భోజనం వంటి ప్రత్యక్ష క్షేత్రస్థాయి వీడియో రికార్డులు.'
              : 'Watch verified on-the-ground video records documenting MLA Sathenna’s developmental interventions, smart agricultural drone initiatives, and welfare drives across Bhupalpalle.')}
          </p>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="video-theatre-grid">
          {/* Column 1: Active Video Player */}
          <div className="video-player-card">
            <div className="video-screen-wrap">
              {videoError ? (
                <div className="video-fallback-card">
                  <span className="fallback-icon">⚠️</span>
                  <p className="fallback-text">
                    {isTelugu
                      ? 'ఈ వీడియోను లోడ్ చేయడంలో సమస్య ఏర్పడింది. దయచేసి మళ్ళీ ప్రయత్నించండి.'
                      : 'Unable to stream this video file. Native fallback active.'}
                  </p>
                  <button
                    type="button"
                    className="btn-pill btn-secondary"
                    onClick={() => {
                      setVideoError(false);
                      if (videoRef.current) videoRef.current.load();
                    }}
                  >
                    {isTelugu ? 'మళ్ళీ లోడ్ చేయండి' : 'Retry Playback'}
                  </button>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  preload="none"
                  poster={resolveMediaUrl(activeVideo.thumbnailUrl)}
                  src={resolveMediaUrl(activeVideo.videoUrl)}
                  onError={() => setVideoError(true)}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="video-player-details">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span className="video-player-category">{activeCategory}</span>
                <span className="video-duration-pill" style={{ position: 'static' }}>
                  ▶ {activeVideo.duration}
                </span>
              </div>
              <h3 className="video-player-title">{activeTitle}</h3>
              <p className="video-player-caption">{activeCaption}</p>
            </div>
          </div>

          {/* Column 2: Animated List Playlist */}
          <div className="video-playlist-card">
            <div className="video-playlist-header">
              <span className="video-playlist-title">
                {isTelugu ? 'అధికారిక వీడియో జాబితా' : 'Constituency Field Records'} ({featuredVideos.length})
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                {isTelugu ? 'మొత్తం 18 రికార్డులు' : '18 Records in Archive'}
              </span>
            </div>

            <AnimatedList
              items={animatedItems}
              activeIndex={activeIndex}
              onItemSelect={handleItemSelect}
              animation="pop"
              theme="dark"
            />
          </div>
        </div>

        {/* Section Footer */}
        <div className="video-theatre-footer">
          <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            <span>📹 {isTelugu ? 'అన్ని వీడియోలు ఒరిజినల్ ఫీల్డ్ రికార్డుల నుండి స్వీకరించబడ్డాయి.' : 'All video records documented directly from constituency service events.'}</span>
          </div>
          <div>
            <Link to="/gallery?type=video" className="btn-pill btn-secondary" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF' }}>
              {isTelugu ? 'వీడియో ఆర్కైవ్ మొత్తం చూడండి' : 'View Full Video Archive'}
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
