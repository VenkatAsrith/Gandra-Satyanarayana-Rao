const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Sathenna Public Profile API Test Suite', () => {
  let authToken = '';

  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sathenna_profile';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('1. Health & Core Public Endpoints', () => {
    it('GET /api/v1/health returns status ok', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toContain('Gandra Satyanarayana Rao');
    });

    it('GET /api/v1/site-settings returns valid configuration', async () => {
      const res = await request(app).get('/api/v1/site-settings');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.constituencyNo).toBe(108);
      expect(res.body.data.officialPhone).toBe('9849051228');
    });

    it('GET /api/v1/profile returns verified biographical details', async () => {
      const res = await request(app).get('/api/v1/profile');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.fullName).toBe('Gandra Satyanarayana Rao');
      expect(res.body.data.electoralStats.voteMargin).toBe(52699);
      expect(res.body.data.timeline.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/projects returns published developmental projects', async () => {
      const res = await request(app).get('/api/v1/projects');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      // Ensure internalNotes is not leaked to public
      expect(res.body.data[0].internalNotes).toBeUndefined();
    });

    it('GET /api/v1/activities returns documented assembly/civic events', async () => {
      const res = await request(app).get('/api/v1/activities');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/gallery returns published media assets', async () => {
      const res = await request(app).get('/api/v1/gallery');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/constituency returns demographic data for Bhupalpalle 108', async () => {
      const res = await request(app).get('/api/v1/constituency');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.assemblyNo).toBe(108);
      expect(res.body.data.totalAreaSqKm).toBe(2293);
    });
  });

  describe('2. Public Grievance / Representation Intake', () => {
    it('POST /api/v1/contact rejects empty payloads', async () => {
      const res = await request(app).post('/api/v1/contact').send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/contact records a valid citizen representation', async () => {
      const res = await request(app).post('/api/v1/contact').send({
        name: 'Ramanaiah Rao',
        phone: '9876543210',
        email: 'ramanaiah@example.com',
        mandal: 'Ghanapur (Mulug)',
        village: 'Buddharam',
        representationType: 'grievance',
        subject: 'Canal desilting request for minor ayacut feeder',
        message: 'Requesting administrative review for desilting the feeder distributary before the upcoming agricultural season.'
      });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
    });
  });

  describe('3. Admin Authentication & Protected Authorization', () => {
    it('POST /api/v1/auth/login rejects invalid password', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'admin@gmail.com',
        password: 'IncorrectPassword123!'
      });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/login succeeds with valid administrator credentials', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'admin@gmail.com',
        password: 'admin'
      });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('admin@gmail.com');
      authToken = res.body.token;
    });

    it('GET /api/v1/auth/me returns authenticated administrator profile', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe('admin@gmail.com');
    });

    it('GET /api/v1/admin/dashboard rejects unauthenticated requests', async () => {
      const res = await request(app).get('/api/v1/admin/dashboard');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/admin/dashboard succeeds for authenticated administrator', async () => {
      const res = await request(app)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.stats.publishedProjectsCount).toBeGreaterThan(0);
    });

    it('CRUD workflow: Admin can create, read, update and delete a project', async () => {
      // Create
      const createRes = await request(app)
        .post('/api/v1/projects/admin')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Automated Test Check Dam Project',
          summary: 'Check dam construction across agricultural rivulet in Regonda',
          category: 'irrigation',
          categoryLabel: 'Irrigation',
          mandal: 'Regonda',
          amountValueCrores: 1.5,
          amountFormatted: '₹1.5 Crore',
          status: 'sanctioned',
          isPublished: false
        });
      expect(createRes.status).toBe(201);
      const projectId = createRes.body.data._id;
      expect(projectId).toBeDefined();

      // Update
      const updateRes = await request(app)
        .put(`/api/v1/projects/admin/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'work_in_progress',
          statusNote: 'Excavation begun'
        });
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.status).toBe('work_in_progress');

      // Delete
      const deleteRes = await request(app)
        .delete(`/api/v1/projects/admin/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);
    });
  });

  describe('4. Dynamic Section Builder & Multilingual Endpoints', () => {
    let testSectionId = '';

    it('POST /api/v1/sections/admin creates a section with Telugu translations', async () => {
      const res = await request(app)
        .post('/api/v1/sections/admin')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          key: 'test-farmers-support',
          page: 'home',
          type: 'feature',
          layout: 'split_media',
          title: 'Automated Test Farmers Section',
          subtitle: 'Empowering local farmers across Bhupalpalle',
          badge: 'Test Priority',
          content: 'Detailed initiatives supporting agrarian communities.',
          order: 99,
          isEnabled: true,
          status: 'published',
          translations: {
            te: {
              title: 'రైతు సంక్షేమ ప్రత్యేక విభాగం',
              subtitle: 'భూపాలపల్లి నియోజకవర్గ రైతుల అభివృద్ధి',
              badge: 'రైతాంగ ప్రాధాన్యత'
            }
          }
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.key).toBe('test-farmers-support');
      expect(res.body.data.translations.te.title).toBe('రైతు సంక్షేమ ప్రత్యేక విభాగం');
      testSectionId = res.body.data._id;
    });

    it('GET /api/v1/sections returns published dynamic sections to public visitors', async () => {
      const res = await request(app).get('/api/v1/sections?page=home');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      const found = res.body.data.find((s) => s.key === 'test-farmers-support');
      expect(found).toBeDefined();
      expect(found.translations.te.title).toBe('రైతు సంక్షేమ ప్రత్యేక విభాగం');
    });

    it('PUT /api/v1/sections/admin/:id updates the section', async () => {
      const res = await request(app)
        .put(`/api/v1/sections/admin/${testSectionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          subtitle: 'Updated subtitle description'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.subtitle).toBe('Updated subtitle description');
    });

    it('PATCH /api/v1/sections/admin/:id/toggle toggles section visibility', async () => {
      const res = await request(app)
        .patch(`/api/v1/sections/admin/${testSectionId}/toggle`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isEnabled).toBe(false);
    });

    it('DELETE /api/v1/sections/admin/:id removes the section', async () => {
      const res = await request(app)
        .delete(`/api/v1/sections/admin/${testSectionId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
