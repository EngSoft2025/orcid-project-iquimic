const TOKEN_KEY = 'orcid_token';

export async function getOrcidToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

const BASE_URL = 'https://pub.orcid.org/v3.0';

async function fetchOrcid(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function searchResearchers(query: string) {
  const token = await getOrcidToken();
  const headers: HeadersInit = { Accept: 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(
    `${BASE_URL}/expanded-search/?q=${encodeURIComponent(query)}`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`Failed to search researchers: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function searchProjects(query: string) {
  const token = await getOrcidToken();
  const headers: HeadersInit = { Accept: 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(
    `${BASE_URL}/expanded-search/?q=${encodeURIComponent(query)}&defType=dismax&search_field=funding`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`Failed to search projects: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getWorks(orcid: string) {
  return fetchOrcid(`/${orcid}/works`);
}

export async function getActivities(orcid: string) {
  return fetchOrcid(`/${orcid}/activities`);
}

export async function getFunding(orcid: string) {
  return fetchOrcid(`/${orcid}/funding`);
}

export async function getPeerReviews(orcid: string) {
  return fetchOrcid(`/${orcid}/peer-reviews`);
}

export const DEFAULT_ORCID = '0000-0003-3905-0546';
