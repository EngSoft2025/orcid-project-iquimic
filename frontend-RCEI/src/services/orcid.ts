const BASE_URL = 'https://pub.orcid.org/v3.0';

async function fetchOrcid(path: string) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }
  return response.json();
}

export async function searchResearchers(query: string) {
  return fetchOrcid(`/expanded-search/?q=${encodeURIComponent(query)}`);
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
