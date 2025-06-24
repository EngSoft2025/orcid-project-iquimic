import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchOrcidProfiles } from '../controllers/searchController';
import axios from 'axios';

vi.mock('axios');

function mockResponse() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.ORCID_CLIENT_ID = 'id';
  process.env.ORCID_CLIENT_SECRET = 'secret';
  process.env.ORCID_API_BASE_URL = 'https://example.com';
});

describe('searchOrcidProfiles', () => {
  it('returns 400 when query is missing', async () => {
    const req = { query: {} };
    const res = mockResponse();
    await searchOrcidProfiles(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns results when query is provided', async () => {
    axios.post.mockResolvedValue({ data: { access_token: 'token' } });
    axios.get.mockResolvedValue({ data: { ok: true } });

    const req = { query: { query: 'john' } };
    const res = mockResponse();
    await searchOrcidProfiles(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});
