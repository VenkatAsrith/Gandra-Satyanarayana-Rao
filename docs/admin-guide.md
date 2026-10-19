# Administrator Guide — Sathenna CMS

## 1. Accessing the Portal

- **URL**: `http://localhost:5173/admin/login` (or `/admin` when deployed)
- **Initial Credentials**:
  - Email: `admin@sathenna.in`
  - Password: `Sathenna@Admin2026!`

To provision or reset the administrator password from the command line:
```bash
npm run admin:setup -- "Constituency Administrator" "admin@sathenna.in" "YourNewSecurePassword123!"
```

---

## 2. Content Management Modules

### 2.1 Site & Brand Settings (`/admin/settings`)
- **Official Phone**: Managed public directory telephone (`9849051228`).
- **Office Location**: Camp Office address (H.No: 3-12, Buddharam Village, Ghanapuram Mandal).
- **Branding**: Telugu moniker, Congress affiliation, legislative term.

### 2.2 Biography & Public Record (`/admin/profile`)
- **Biographical Narrative**: Edit summary, lead title, and family background.
- **Academic Qualifications**: Kakatiya University BA 1983 and ITI Civil Diploma.
- **Electoral Stats**: ECI vote share (54.55%), votes secured (123,116), victory margin (52,699).
- **Timeline Editor**: Add, reorder, or edit milestone entries for the Dark Monograph timeline.

### 2.3 Public Works & Projects (`/admin/projects`)
- **New Project Form**:
  - *Title*: Project headline.
  - *Sanction Amount*: Enter formatted string (e.g., `₹31 Crore`) and numerical value in Crores.
  - *Status*: `Sanctioned`, `Tenders Initiated`, `Work in Progress`, `Completed`, or `Status Not Confirmed`.
  - *Representative Action*: Verified action (e.g. *Announced sanction, Laid foundation stone, Reviewed DPR*).
  - *Internal Notes*: Confidential tracking notes visible only to logged-in administrators.
  - *Publish Toggle*: Unchecking hides the project from public visitors.

### 2.4 Activities & Legislative Speeches (`/admin/activities`)
- Manage floor interventions, questions raised in Assembly (e.g., Singareni coal miners, cold storage subsidies), and civic commemorations.
- Check **"Featured Assembly Intervention Banner"** to display an activity in the homepage spotlight banner.

### 2.5 Media Archive & Uploads (`/admin/gallery`)
- Upload JPEG, PNG, WEBP, or AVIF images up to 10MB.
- Provide descriptive **Accessibility Alt Text** for screen reader compliance.
- Categorize by `Public Events`, `Official Portraits`, `Constituency Coordination`, or `Public Works`.
- Deleting an asset removes both the database record and the asset from Cloudinary / storage.

### 2.6 Citizen Submissions (`/admin/submissions`)
- View grievances and representations submitted through the public intake form.
- Filter by status (`New`, `Under Review`, `Action Taken`, `Resolved`, `Archived`).
- Add internal administrative notes (department forwarding details, endorsement dates).
