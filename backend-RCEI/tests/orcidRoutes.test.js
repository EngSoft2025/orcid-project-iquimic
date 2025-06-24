import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import orcidRoutes from '../routes/orcidRoutes';
import axios from 'axios';

vi.mock('axios');

const app = express();
app.use(express.json());
app.use('/api', orcidRoutes);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.ORCID_CLIENT_ID = 'id';
  process.env.ORCID_CLIENT_SECRET = 'secret';
  process.env.ORCID_API_BASE_URL = 'https://example.com';
});

describe('GET /api/fundings', () => {
  it('requires orcidId', async () => {
    const res = await request(app).get('/api/fundings');
    expect(res.status).toBe(400);
  });

  it('returns data with valid orcidId', async () => {
    axios.post.mockResolvedValue({ data: { access_token: 't' } });
    axios.get.mockResolvedValue({ data: { foo: 'bar' } });
    const res = await request(app).get('/api/fundings?orcidId=123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ foo: 'bar' });
  });
});
