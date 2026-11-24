import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function HeroSection({ profile, settings }) {
  const { isTelugu, t } = useLanguage();

  const stats = profile?.electoralStats || {
    votesSecured: 123116,
    voteMargin: 52699,
    voteSharePercentage: 54.55,
    tenureYears: '2023–28'
  };

  const portrait = profile?.heroPortraitUrl || '/images/hero/hero-portrait.png';
  const teluguName = profile?.teluguName || 'గండ్ర సత్యనారాయణ రావు (సాతన్న)';
  const constituencyName = settings?.constituencyName || 'Bhupalpalle';
  const constituencyNo = settings?.constituencyNo || 108;

  return (
    <section className="hero-wrapper" aria-label="Official Public Profile Hero">
      <div className="container">
        <div className="hero-editorial-canvas">
          {/* Architectural Watermark */}
          <div className="hero-bg-watermark" aria-hidden="true">
            {isTelugu ? 'ప్రజా నాయకుడు' : 'LEADERSHIP'}
          </div>

          {/* Asymmetrical Two-Column Main Stage */}
          <div className="hero-main-grid">
            {/* Left Content Column */}
            <div className="hero-content-col">
              {/* Responsive Controlled Display Name */}
              {isTelugu ? (
                <h1 className="hero-display-heading hero-telugu-heading">
                  <span className="hero-name-line line-1">గండ్ర</span>
                  <span className="hero-name-line line-2">సత్యనారాయణ</span>
                  <span className="hero-name-line line-3">రావు</span>
                </h1>
              ) : (
                <h1 className="hero-display-heading">
                  <span className="hero-name-line line-1">GANDRA</span>
                  <span className="hero-name-line line-2">SATYANARAYANA</span>
                  <span className="hero-name-line line-3">RAO</span>
                </h1>
              )}

              {/* Italic Editorial Introduction */}
              <p className="hero-bio-lead">
                {isTelugu
                  ? 'ప్రజా సేవ, నియోజకవర్గ సమగ్ర అభివృద్ధి మరియు భూపాలపల్లి ప్రజల సంక్షేమమే పరమావధి.'
                  : 'A commitment to public service, constituency development and the welfare of the people of Bhupalpalle.'}
              </p>

              {/* Role Title & Factual Summary */}
              <div className="hero-role-group">
                <div className="hero-role-text-wrap">
                  <div className="hero-role-subline">
                    {isTelugu
                      ? 'భూపాలపల్లి అసెంబ్లీ నియోజకవర్గం నెం. 108 · తెలంగాణ శాసనసభ'
                      : `${constituencyName} Assembly Constituency No. ${constituencyNo} · Telangana Legislature`}
                  </div>
                  <p className="hero-role-summary">
                    {isTelugu
                      ? `రైతాంగ సాగునీటి భద్రత, గ్రామీణ మౌలిక వసతులు, విద్యాభివృద్ధి మరియు సింగరేణి కార్మికుల సంక్షేమానికి కట్టుబడిన ప్రజాప్రతినిధి. 2023 ఎన్నికల్లో ${stats.voteMargin ? stats.voteMargin.toLocaleString('en-IN') : '52,699'} ఓట్ల చారిత్రాత్మక మెజారిటీతో ప్రజాతీర్పు పొందిన నాయకుడు.`
                      : `A public representative focused on agricultural water access, rural infrastructure, education, welfare and constituency development. Elected in 2023 on an Indian National Congress mandate with a historic ${stats.voteMargin ? stats.voteMargin.toLocaleString() : '52,699'} victory margin.`}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Working Editorial Routes */}
              <div className="hero-cta-group">
                <Link to="/about" className="btn-pill btn-primary">
                  {isTelugu ? 'జీవిత ప్రస్థానం' : 'Read Biography'} →
                </Link>

                <Link to="/work" className="btn-pill btn-secondary">
                  {isTelugu ? 'అభివృద్ధి పనులు' : 'Development Works'}
                </Link>

                <Link to="/constituency" className="btn-pill btn-outline">
                  {isTelugu ? 'నియోజకవర్గ మండలాలు' : 'Constituency (108)'}
                </Link>
              </div>

              {/* Compact Electoral Credentials Strip */}
              <div className="hero-credentials-strip">
                <div className="hero-cred-card">
                  <span className="hero-cred-val">
                    {stats.voteMargin ? stats.voteMargin.toLocaleString('en-IN') : '52,699'}
                  </span>
                  <span className="hero-cred-lbl">{t('hero.voteMarginLabel', isTelugu ? 'మెజారిటీ ఓట్లు' : 'Victory Margin')}</span>
                </div>

                <div className="hero-cred-divider" aria-hidden="true"></div>

                <div className="hero-cred-card">
                  <span className="hero-cred-val">{stats.tenureYears || '2023–28'}</span>
                  <span className="hero-cred-lbl">{isTelugu ? 'శాసనసభ కాలపరిమితి' : 'Legislative Tenure'}</span>
                </div>

                <div className="hero-cred-divider" aria-hidden="true"></div>

                <div className="hero-cred-card">
                  <span className="hero-cred-val">{stats.voteSharePercentage || 54.55}%</span>
                  <span className="hero-cred-lbl">{t('hero.voteShareLabel', isTelugu ? 'ఓట్ల శాతం' : 'Vote Share')}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Portrait & Inset Badge) */}
            <div className="hero-visual-col">
              <div className="hero-portrait-card">
                <div className="hero-portrait-frame">
                  <img
                    src={portrait}
                    alt="Gandra Satyanarayana Rao, Member of Legislative Assembly for Bhupalpalle"
                    className="hero-portrait-image"
                    loading="eager"
                    onError={(e) => {
                      e.target.src = '/images/hero/hero-portrait.png';
                    }}
                  />
                </div>

                {/* Natural Editorial Caption Tag */}
                <div className="hero-portrait-tag">
                  <div className="hero-tag-icon-circle">
                    <img src="/images/party-symbol.png" alt="INC Emblem" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                  </div>
                  <div className="hero-tag-text-block">
                    <span className="hero-tag-primary">
                      {isTelugu ? 'శ్రీ గండ్ర సత్యనారాయణ రావు (సత్తన్న)' : 'Sri Gandra Satyanarayana Rao (Sathanna)'}
                    </span>
                    <span className="hero-tag-meta">
                      {isTelugu ? `ఎమ్మెల్యే · భూపాలపల్లి (${constituencyNo}) · 3వ తెలంగాణ శాసనసభ` : `MLA · ${constituencyName} (${constituencyNo}) · 3rd Assembly`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
