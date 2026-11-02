import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export default function CopyrightPage({ settings }) {
  const { isTelugu, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isTelugu
      ? 'కాపీరైట్ & సమాచార నిరాకరణ | గండ్ర సత్యనారాయణ రావు'
      : 'Copyright & Information Notice | Gandra Satyanarayana Rao';
  }, [isTelugu]);

  return (
    <div className="page-wrapper" style={{ background: 'var(--canvas, #F7F6F2)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />

      <main id="main-content" style={{ flexGrow: 1, paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Header Banner */}
          <div className="page-header-content" style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
            <div className="tag-label">
              {isTelugu ? 'చట్టబద్ధమైన సమాచారం' : 'Legal & Public Disclaimer'}
            </div>
            <h1 className="page-header-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBlock: '0.75rem' }}>
              {isTelugu ? 'కాపీరైట్ & సమాచార నిరాకరణ' : 'Copyright & Information Notice'}
            </h1>
            <p className="page-header-subtitle" style={{ maxWidth: '720px' }}>
              {isTelugu
                ? 'ఈ అధికారిక వెబ్‌సైట్ ప్రజా ప్రయోజనార్థం, శాసనసభ కార్యకలాపాల పారదర్శకత మరియు పౌరులకు సమాచారం అందించే లక్ష్యంతో నిర్వహించబడుతోంది.'
                : 'This digital platform is published in the public interest to provide citizens, media, and researchers with transparent legislative records and constituency updates.'}
            </p>
          </div>

          {/* Editorial Card Container */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg, 16px)',
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(0, 0, 0, 0.07)',
              lineHeight: 1.8,
              color: 'var(--text-secondary, #475569)'
            }}
          >
            {/* 1. Informational Purpose */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '1. ప్రజా సమాచార లక్ష్యం (Informational Purpose)' : '1. Purpose & Public Informational Scope'}
              </h2>
              <p>
                {isTelugu
                  ? 'ఈ వెబ్‌సైట్ భూపాలపల్లి శాసనసభ్యులు శ్రీ గండ్ర సత్యనారాయణ రావు (సత్తెన్న) గారి ఆధ్వర్యంలో నియోజకవర్గ ప్రజలకు అభివృద్ధి పనులు, ప్రజా సంక్షేమ పథకాలు, శాసనసభ చర్చలు మరియు అధికారిక ప్రకటనలను అందించడానికి మాత్రమే రూపొందించబడింది. ఇది లాభాపేక్షలేని, ప్రజా సంబంధాల మరియు పౌర అవగాహన వేదిక.'
                  : 'This platform is maintained under the office of Sri Gandra Satyanarayana Rao (Sathenna), Member of the Legislative Assembly for Bhupalpalle (No. 108), Telangana. It is established solely for civic informational awareness, public accountability, and constituent engagement.'}
              </p>
            </section>

            {/* 2. Copyright & Intellectual Property */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '2. కాపీరైట్ & మేధో సంపత్తి (Copyright & Ownership)' : '2. Copyright & Intellectual Property'}
              </h2>
              <p>
                {isTelugu
                  ? 'ఈ వెబ్‌సైట్‌లోని అధికారిక ఛాయాచిత్రాలు, ప్రసంగాలు, పత్రికా ప్రకటనలు మరియు వీడియో దృశ్యాలన్నీ శాసనసభ్యుల కార్యాలయానికి లేదా సంబంధిత మూలాలకు చెందినవి. ప్రజా ప్రయోజనార్థం లేదా మీడియా ప్రచురణల కోసం సరైన క్రెడిట్‌తో వీటిని ఉపయోగించుకోవచ్చు.'
                  : 'Unless otherwise stated, all original materials published on this website—including official photographs, field video recordings, press releases, and legislative texts—are the intellectual property of the Legislative Office of Gandra Satyanarayana Rao.'}
              </p>
            </section>

            {/* 3. Fair Use & Media Guidelines */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '3. మీడియా & ప్రజా వినియోగ మార్గదర్శకాలు (Fair Use & Attribution)' : '3. Fair Use & Editorial Attribution'}
              </h2>
              <p>
                {isTelugu
                  ? 'జర్నలిస్టులు, పరిశోధకులు మరియు పౌరులు ఈ వెబ్‌సైట్‌లోని సమాచారాన్ని, గణాంకాలను వార్తా ప్రచురణలు, పరిశోధనాత్మక పత్రాలు లేదా ప్రజా చైతన్య కార్యక్రమాలకు స్వేచ్ఛగా కోట్ చేయవచ్చు. దీనికి మూలంగా "ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు కార్యాలయం, భూపాలపల్లి" అని పేర్కొనడం అభినందనీయం.'
                  : 'Journalists, researchers, and citizens are permitted to reference, quote, and distribute content from this site for news reporting, academic study, and civic discussion, provided that fair attribution is provided ("Source: Office of Gandra Satyanarayana Rao, MLA Bhupalpalle").'}
              </p>
            </section>

            {/* 4. Accuracy & Limitation of Liability */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '4. సమాచార ఖచ్చితత్వం (Accuracy of Information)' : '4. Accuracy & Legislative Context'}
              </h2>
              <p>
                {isTelugu
                  ? 'ప్రజా ప్రయోజనాల దృష్ట్యా అన్ని అభివృద్ధి గణాంకాలు, నిధుల వివరాలు మరియు నివేదికలు ప్రామాణికంగా ప్రచురించడానికి అన్ని జాగ్రత్తలు తీసుకోబడ్డాయి. అధికారిక ప్రభుత్వ గెజిట్లు లేదా శాసనసభ రికార్డులలో మార్పులు సంభవించినప్పుడు సమాచారం సమయానుకూలంగా నవీకరించబడుతుంది.'
                  : 'While every effort is made to maintain complete and updated information regarding sanctioned developmental outlays, Assembly questions, and welfare distributions, legislative and government notifications are subject to standard state administrative procedures.'}
              </p>
            </section>

            {/* 5. Contact for Permissions */}
            <section>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '5. అధికారిక విచారణలు & అనుమతులు (Official Inquiries)' : '5. Inquiries & Permitted Reproduction'}
              </h2>
              <p>
                {isTelugu
                  ? 'సమాచార పునఃప్రచురణ లేదా అధికారిక ధృవీకరణల కొరకు ఎమ్మెల్యే క్యాంపు కార్యాలయాన్ని నేరుగా సంప్రదించవచ్చు:'
                  : 'For media syndication, archival queries, or permission regarding public assets, contact the Camp Office:'}
              </p>
              <div
                style={{
                  background: 'var(--canvas, #F7F6F2)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-md, 8px)',
                  marginTop: '0.75rem',
                  fontSize: '0.95rem'
                }}
              >
                <div><strong>{isTelugu ? 'కార్యాలయం:' : 'Office:'}</strong> {isTelugu ? 'ఎమ్మెల్యే క్యాంపు కార్యాలయం, బుద్ధారం & భూపాలపల్లి' : 'MLA Camp Office, Buddharam & Bhupalpalle'}</div>
                <div><strong>{isTelugu ? 'ఫోన్:' : 'Phone:'}</strong> +91 9849051228</div>
                <div><strong>{isTelugu ? 'ఈమెయిల్:' : 'Email:'}</strong> contact@gandrasathenna.com</div>
              </div>
            </section>

            {/* Navigation back */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/" className="btn-pill btn-primary">
                {isTelugu ? 'హోమ్‌పేజీకి తిరిగి వెళ్లండి' : 'Return to Home'}
              </Link>
              <Link to="/contact" className="btn-pill btn-secondary">
                {isTelugu ? 'సంప్రదించండి' : 'Contact Office'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
