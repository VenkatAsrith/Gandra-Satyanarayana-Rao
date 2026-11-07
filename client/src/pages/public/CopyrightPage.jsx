import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

export default function CopyrightPage({ settings }) {
  const { isTelugu } = useLanguage();

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
                  ? 'ఈ వెబ్‌సైట్ భూపాలపల్లి శాసనసభ్యులు శ్రీ గండ్ర సత్యనారాయణ రావు (సత్తన్న) గారి ఆధ్వర్యంలో నియోజకవర్గ ప్రజలకు అభివృద్ధి పనులు, ప్రజా సంక్షేమ పథకాలు, శాసనసభ చర్చలు మరియు అధికారిక ప్రకటనలను అందించడానికి మాత్రమే రూపొందించబడింది. ఇది లాభాపేక్షలేని, ప్రజా సంబంధాల మరియు పౌర అవగాహన వేదిక.'
                  : 'This platform is maintained under the office of Sri Gandra Satyanarayana Rao (Sathanna), Member of the Legislative Assembly for Bhupalpalle (No. 108), Telangana. It is established solely for civic informational awareness, public accountability, and constituent engagement.'}
              </p>
            </section>

            {/* 2. Official Verification & Rights Claim */}
            <section style={{ marginBottom: '2.25rem', padding: '1.5rem', background: '#F8FAFC', borderRadius: '12px', borderLeft: '4px solid var(--saffron, #F36B21)' }}>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '2. అధికారిక రికార్డులు, ధృవీకరణ & క్లెయిమ్ హక్కులు (Official Records & Claims)' : '2. Official Verification, Verified Records & Exclusive Claim Rights'}
              </h2>
              <p>
                {isTelugu
                  ? 'ఈ వెబ్‌సైట్‌లో పేర్కొన్న ప్రతి సమాచారం, శాసనసభ ప్రసంగాలు, నియోజకవర్గ అభివృద్ధి పనుల మంజూరు ఉత్తర్వులు (G.O.s), శంకుస్థాపనలు మరియు సంక్షేమ పంపిణీ వివరాలు అన్నీ కూడా అధికారిక ప్రభుత్వ గెజిట్లు, శాసనసభ రికార్డులు మరియు జిల్లా పరిపాలనా నివేదికల ఆధారంగా ధృవీకరించబడి (Verified) ప్రచురించబడ్డాయి. ఈ అధికారిక రికార్డులు, ప్రకటనలు మరియు ప్రజా ప్రాతినిధ్య సమాచారంపై సంపూర్ణ హక్కు శ్రీ గండ్ర సత్యనారాయణ రావు (సత్తన్న) గారికి మాత్రమే ఉంటుంది. ఈ సమాచారానికి సంబంధించి ఏవైనా సందేహాలు, స్పష్టతలు లేదా ధృవీకరణల కొరకు ప్రజలు, పాత్రికేయులు లేదా పౌరులు నేరుగా శ్రీ గండ్ర సత్యనారాయణ రావు గారిని లేదా వారి క్యాంపు కార్యాలయాన్ని సంప్రదించవచ్చు.'
                  : 'The designation of "Verified" across this website certifies that all published developmental projects, legislative speeches, government sanction orders (G.O.s), budgetary allocations, and welfare distributions are drawn directly from verifiable public records, legislative filings, and district administrative proceedings. Sri Gandra Satyanarayana Rao (Sathanna) holds the exclusive, legitimate representative rights over all official claims, public statements, and archival records presented herein. For any inquiries, verifications, or clarifications regarding official records, constituents, journalists, and civic researchers are invited to approach Sri Gandra Satyanarayana Rao directly or contact his official Camp Office.'}
              </p>
            </section>

            {/* 3. Copyright & Intellectual Property */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '3. కాపీరైట్ & మేధో సంపత్తి (Copyright & Ownership)' : '3. Copyright & Intellectual Property'}
              </h2>
              <p>
                {isTelugu
                  ? 'ఈ వెబ్‌సైట్‌లోని ఛాయాచిత్రాలు, వీడియోలు, రూపకల్పన, లోగోలు మరియు అధికారిక రాతపూర్వక ప్రతులు కాపీరైట్ చట్టాల పరిధిలోకి వస్తాయి. ఎమ్మెల్యే గారి అధికారిక అనుమతి లేకుండా వాణిజ్య ప్రకటనలకు లేదా రాజకీయ దుష్ప్రచారానికి ఈ కంటెంట్‌ను ఉపయోగించడం చట్టరీత్యా నిషేధం.'
                  : 'All visual media, event photographs, press note releases, and site design architectures are protected by applicable intellectual property rights. No part of this site may be duplicated or commercially repurposed without written consent from the Office of the MLA.'}
              </p>
            </section>

            {/* 4. Permitted Public Use */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '4. ప్రజా ప్రయోజనార్థం ఉల్లేఖన (Permitted Public Use)' : '4. Permitted Public Citation & Fair Use'}
              </h2>
              <p>
                {isTelugu
                  ? 'పాత్రికేయులు, పరిశోధకులు మరియు పౌరులు ఈ వెబ్‌సైట్‌లోని అధికారిక సమాచారాన్ని వార్తా ప్రచురణలు, పరిశోధనాత్మక పత్రాలు లేదా ప్రజా చైతన్య కార్యక్రమాలకు స్వేచ్ఛగా కోట్ చేయవచ్చు. దీనికి మూలంగా "ఎమ్మెల్యే గండ్ర సత్యనారాయణ రావు కార్యాలయం, భూపాలపల్లి" అని పేర్కొనడం అభినందనీయం.'
                  : 'Journalists, researchers, and citizens are permitted to reference, quote, and distribute content from this site for news reporting, academic study, and civic discussion, provided that fair attribution is provided ("Source: Office of Gandra Satyanarayana Rao, MLA Bhupalpalle").'}
              </p>
            </section>

            {/* 5. Contact for Permissions & Inquiries */}
            <section>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary, #0F172A)', marginBottom: '0.75rem', fontWeight: 700 }}>
                {isTelugu ? '5. అధికారిక విచారణలు & సంప్రదింపులు (Official Inquiries & Clarifications)' : '5. Inquiries & Direct Approvals'}
              </h2>
              <p>
                {isTelugu
                  ? 'సమాచార పునఃప్రచురణ, అధికారిక ధృవీకరణలు లేదా ఏవైనా సందేహాల కొరకు ఎమ్మెల్యే క్యాంపు కార్యాలయాన్ని నేరుగా సంప్రదించవచ్చు:'
                  : 'For media syndication, record verification, archival queries, or permission regarding public assets, contact the Camp Office directly:'}
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
                <div><strong>{isTelugu ? 'కార్యాలయం:' : 'Office:'}</strong> {isTelugu ? 'ఎమ్మెల్యే క్యాంపు కార్యాలయం, బుద్ధారం & భూపాలపల్లి' : 'MLA Camp Office, H.No: 3-12, Buddharam Village, Ghanapuram Mandal, Jayashankar Bhupalpally'}</div>
                <div><strong>{isTelugu ? 'ఫోన్:' : 'Phone:'}</strong> +91 9849051228</div>
                <div><strong>{isTelugu ? 'ఈమెయిల్:' : 'Email:'}</strong> gandra.satyanarayanarao@gmail.com</div>
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
