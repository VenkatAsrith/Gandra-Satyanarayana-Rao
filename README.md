# Gandra Satyanarayana Rao — Public Profile Website

A production-grade, editorial public-profile website for **Gandra Satyanarayana Rao (Sathenna)**, Member of the Legislative Assembly (MLA) for Bhupalpalle constituency (No. 108), Jayashankar Bhupalpally district, Telangana, representing the Indian National Congress.

---

## 1. Architectural Philosophy & Tone

- **Editorial, Modern & Human**: Built to evoke a high-end public monograph or verified representative portfolio, strictly avoiding campaign slogans, vote appeals, ranking metrics, or promotional hyperbole.
- **Fact-Checked & Verified**: Every datum—from election margins and educational credentials to developmental sanctions and assembly questions—strictly maps to the comprehensive verified research dossier (PRS Legislative Research, Election Commission affidavits, Sakshi, Andhra Prabha, V6 Velugu, The Hans India).
- **Attribution Discipline**: Developmental initiatives consistently use verified representative actions (*announced sanction, laid foundation stone, participated in inauguration, convened review, intervened in assembly*).

---

## 2. Technology Stack

- **Markup**: Semantic HTML5 with ARIA landmark roles and accessibility metadata.
- **Styling**: Pure Vanilla CSS3 with fluid typography (`clamp()`), custom design tokens, 8px layout grid, and CSS Grid asymmetrical compositions. No frameworks (No Tailwind, Bootstrap, etc.).
- **Scripting**: Pure Vanilla JavaScript with IntersectionObserver scroll-reveal animations, responsive drawer navigation with focus trapping, category-filtered gallery, and keyboard-navigable accessible lightbox.

---

## 3. Visual & Color System

- **Primary Background**: White (`#FFFFFF`) & Off-White (`#F7F6F2`, `#FAF9F5`) ~70%
- **Neutrals & Typography**: Black (`#111111`), Charcoal (`#1F2123`), Muted Gray (`#6B6B6B`, `#E5E3DC`) ~20%
- **Accents**: Warm Orange (`#F36B21`) and Deep Green (`#087443`) ~10%
- **Dark Journey Monograph**: A single dark editorial section (`#111111`) for the chronological political journey.

---

## 4. File Structure

```text
/
├── index.html          # Editorial homepage with hero, intro, story grid, dark journey, constituency, public work, featured activity, recent activities
├── about.html          # In-depth verified biography, family background, Kakatiya University education, and political timeline
├── work.html           # Documented public work dossier, funding allocations, project statuses, and legislative assembly questions
├── gallery.html        # Photographic archive with filter pills and keyboard accessible lightbox modal
├── contact.html        # Official constituency office, public directory telephone (9849051228), and representation intake
├── css/
│   └── style.css       # Full design system, tokens, responsive breakpoints, animations
├── js/
│   └── script.js       # Navigation, scroll-reveal, accessible lightbox, structured data architecture
├── images/
│   ├── hero/           # Hero portrait
│   ├── about/          # Verified portraits and leadership coordination photos
│   ├── work/           # Irrigation, housing, temple, landscape assets
│   ├── gallery/        # High-resolution media archive assets
│   └── events/         # Public address and civic event photographs
└── README.md           # Project documentation
```

---

## 5. Verification & Sources Summary

- **Office & Mandate**: 3rd Telangana Legislative Assembly (2023–2028), Bhupalpalle (108). Won with 123,116 votes (54.55%, margin 52,699). *Sources: Election Commission of India, PRS Legislative Research*.
- **Education**: BA (Kakatiya University, Warangal, 1983), ITI Civil Diploma.
- **Public Work**: ₹31 Cr Ghanapur canal modernization (*The Hans India*), ₹12.15 Cr Kotanchu Temple (*V6 Velugu*), ₹3.75 Cr Chityal Bus Station (*Sakshi*), Indiramma housing review (*Sakshi, Hans India*), Singareni coal workers legislative speech (*Andhra Prabha*).
- **Public Directory Contact**: 9849051228 (*Telangana State Member of Legislative Assembly Directory 2023–2028*).

---

## 6. How to Run Locally

Simply open `index.html` in any modern web browser directly (`file:///...`), or serve via any static HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js npx serve
npx serve .
```
